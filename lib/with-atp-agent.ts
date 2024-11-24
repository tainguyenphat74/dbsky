import { AtpAgent } from "@atproto/api";
import fetchRetry from "fetch-retry";
import { notFound } from "next/navigation";
import { z } from "zod";

import { revalidate } from "~/lib/revalidate";

const atpFetch = fetchRetry(fetch, {
  retries: Number.MAX_SAFE_INTEGER,
  retryOn: [429, 503],
  retryDelay: (attempt) => Math.pow(2, attempt) * 100,
});

const AtpError = z.object({ status: z.number() });

export async function withAtpAgent<T>(
  handler: (atpAgent: AtpAgent) => Promise<T>,
  next?: NextFetchRequestConfig,
): Promise<T> {
  try {
    const atpAgent = new AtpAgent({
      service: "https://public.api.bsky.app",
      fetch: (input, init) =>
        atpFetch(input, { ...init, next: next ?? { revalidate } }),
    });
    const result = await handler(atpAgent);
    return result;
  } catch (error) {
    const safeParse = AtpError.safeParse(error);
    if (!safeParse.success || safeParse.data.status >= 500) throw error;
    notFound();
  }
}
