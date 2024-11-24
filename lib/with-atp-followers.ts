import type {
  ProfileView,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import type { Relationship } from "@atproto/api/dist/client/types/app/bsky/graph/defs";

import { isRelationship } from "@atproto/api/dist/client/types/app/bsky/graph/defs";

import { parseAtpUri } from "~/lib/parse-atp-uri";
import { withAtpAgent } from "~/lib/with-atp-agent";

interface FollowedByDetail {
  uri: string;
  createdAt: Date;
  profile: ProfileView;
}

interface Follow {
  $type: "app.bsky.graph.follow";
  createdAt: string;
  subject: string;
}

const batchSize = 30;

export async function withAtpFollowers(
  profile: ProfileViewDetailed,
  next?: NextFetchRequestConfig,
): Promise<FollowedByDetail[]> {
  return withAtpAgent(async (atpAgent) => {
    let cursor: string | undefined;
    const followers: ProfileView[] = [];
    do {
      const response = await atpAgent.getFollowers({
        actor: profile.handle,
        cursor,
      });
      if (!response.success) {
        cursor = undefined;
        throw new Error("Failed to get followers");
      }
      cursor = response.data.cursor;
      followers.push(...response.data.followers);
    } while (cursor);
    const followersMap = new Map<string, ProfileView>(
      followers.map((follower) => [follower.did, follower]),
    );
    const relationships: Relationship[] = [];
    for (let index = 0; index < followers.length; index += batchSize) {
      const response = await atpAgent.app.bsky.graph.getRelationships({
        actor: profile.did,
        others: followers.slice(index, index + batchSize).map(({ did }) => did),
      });
      if (!response.success) throw new Error("Failed to get relationships");
      relationships.push(
        ...response.data.relationships.filter((relationship) =>
          isRelationship(relationship),
        ),
      );
    }
    const followedByParams = relationships
      .map(({ followedBy }) => followedBy)
      .filter((followedBy) => typeof followedBy === "string")
      .map((atpUri) => parseAtpUri(atpUri));
    const followedByDetails: FollowedByDetail[] = [];
    for (const param of followedByParams) {
      const profile = followersMap.get(param.repo);
      if (!profile) throw new Error("Failed to get follow profile");
      const response = await atpAgent.com.atproto.repo.getRecord(param);
      if (!response.success) throw new Error("Failed to get follow record");
      const follow = response.data.value as Follow;
      followedByDetails.push({
        uri: response.data.uri,
        createdAt: new Date(follow.createdAt),
        profile,
      });
    }
    return followedByDetails;
  }, next);
}
