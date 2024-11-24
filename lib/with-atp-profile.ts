import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

import { withAtpAgent } from "~/lib/with-atp-agent";

export async function withAtpProfile(
  actor: string,
  next?: NextFetchRequestConfig,
): Promise<ProfileViewDetailed> {
  return withAtpAgent(async (atpAgent) => {
    const response = await atpAgent.getProfile({ actor });
    if (!response.success) throw new Error("Failed to get profile");
    return response.data;
  }, next);
}
