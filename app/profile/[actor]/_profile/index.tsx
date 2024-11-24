import type { JSX, ReactNode } from "react";

import type { ProfileProps } from "~/lib/profile-props";

import { Anchor, Avatar, Group, Stack, Text, Title } from "@mantine/core";
import { t } from "i18next";
import { Suspense } from "react";

import { withAtpProfile } from "~/lib/with-atp-profile";

import { Fallback } from "./fallback";

interface StatProps {
  label: string;
  value: number;
}

function Stat({ label, value }: StatProps): ReactNode {
  return (
    <Stack align="center" gap="xs">
      <Text fz="h2" lh={1} lineClamp={1} ta="center">
        {t("asCount", { count: value })}
      </Text>
      <Text c="dimmed" lh={1} lineClamp={1} ta="center">
        {label}
      </Text>
    </Stack>
  );
}

async function UI({ params }: ProfileProps): Promise<JSX.Element> {
  const { actor } = await params;
  const profile = await withAtpProfile(actor);
  profile.followersCount ??= 0;
  profile.followsCount ??= 0;
  profile.postsCount ??= 0;
  return (
    <>
      <Avatar
        alt={profile.displayName}
        color="initials"
        name={profile.displayName}
        size="xl"
        src={profile.avatar}
      />
      <Stack align="center" gap="xs">
        <Title lh={1} lineClamp={1} size="h3">
          {profile.displayName}
        </Title>
        <Anchor
          c="dimmed"
          href={`https://bsky.app/profile/${profile.handle}`}
          lh={1}
          lineClamp={1}
          rel="noopener noreferrer"
          target="_blank"
        >
          {profile.handle}
        </Anchor>
      </Stack>
      <Group mt="xs">
        <Stat
          label={t("follower", { count: profile.followersCount })}
          value={profile.followersCount}
        />
        <Stat
          label={t("follow", { count: profile.followsCount })}
          value={profile.followsCount}
        />
        <Stat
          label={t("post", { count: profile.postsCount })}
          value={profile.postsCount}
        />
      </Group>
    </>
  );
}

export function Profile(props: ProfileProps): ReactNode {
  return (
    <Suspense fallback={<Fallback />}>
      <UI {...props} />
    </Suspense>
  );
}
