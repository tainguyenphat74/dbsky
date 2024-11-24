import type { ReactNode } from "react";

import {
  Anchor,
  Avatar,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { t } from "i18next";

function Stat(): ReactNode {
  return (
    <Stack align="center" gap="xs">
      <Skeleton>
        <Text fz="h2" lh={1} lineClamp={1} ta="center">
          0
        </Text>
      </Skeleton>
      <Skeleton>
        <Text c="dimmed" lh={1} lineClamp={1} ta="center">
          {t("metric", { count: 1 })}
        </Text>
      </Skeleton>
    </Stack>
  );
}

export function Fallback(): ReactNode {
  return (
    <>
      <Skeleton circle height="auto" width="auto">
        <Avatar
          alt={t("profile:name")}
          color="initials"
          name={t("profile:name")}
          size="xl"
        />
      </Skeleton>
      <Stack align="center" gap="xs">
        <Skeleton>
          <Title lh={1} lineClamp={1} size="h3">
            {t("profile:name")}
          </Title>
        </Skeleton>
        <Skeleton>
          <Anchor
            c="dimmed"
            href="https://bsky.app"
            lh={1}
            lineClamp={1}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("profile:handle")}
          </Anchor>
        </Skeleton>
      </Stack>
      <Group mt="xs">
        <Stat />
        <Stat />
        <Stat />
      </Group>
    </>
  );
}
