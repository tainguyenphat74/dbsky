import type { ReactNode } from "react";

import type { ProfileProps } from "~/lib/profile-props";

import { Container, rem, Stack, Title } from "@mantine/core";
import { IconFriends } from "@tabler/icons-react";
import { t } from "i18next";

import { Followers } from "./_followers";
import { Profile } from "./_profile";

export const dynamic = "error";

export const dynamicParams = true;

export const revalidate = 3600;

export const maxDuration = 60;

export default function Page(props: ProfileProps): ReactNode {
  return (
    <Container my="xl" w="100%">
      <Stack align="center" component="main" gap={64}>
        <Stack align="center" gap="lg">
          <Profile {...props} />
        </Stack>
        <Stack align="center" gap="lg" w="100%">
          <Title lineClamp={1} order={2} size="h4" ta="center">
            <IconFriends
              stroke={1.5}
              style={{
                width: rem(24),
                height: rem(24),
                marginRight: rem(8),
                marginBottom: rem(-4),
              }}
            />
            {t("profile:followers")}
          </Title>
          <Followers {...props} />
        </Stack>
      </Stack>
    </Container>
  );
}
