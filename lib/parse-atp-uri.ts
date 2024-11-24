import type { QueryParams } from "@atproto/api/dist/client/types/com/atproto/repo/getRecord";

const prefix = "at://";

export function parseAtpUri(uri: string): QueryParams {
  if (!uri.startsWith(prefix)) throw new Error("Failed to parse AT URI");
  const [repo, collection, rkey] = uri.slice(prefix.length).split("/");
  return { repo, collection, rkey };
}
