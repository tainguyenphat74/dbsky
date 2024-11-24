import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import type { PropsWithChildren, ReactNode } from "react";

import {
  Anchor,
  Box,
  Center,
  ColorSchemeScript,
  Container,
  createTheme,
  Group,
  MantineProvider,
  rem,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconDatabaseSmile } from "@tabler/icons-react";
import { t } from "i18next";
import { Provider } from "jotai";
import { Geist, Geist_Mono } from "next/font/google";

import { defaultColorScheme } from "~/lib/default-color-scheme";
import { direction } from "~/lib/direction";
import { language } from "~/lib/language";
import { T } from "~/lib/t";

import { ColorSchemeControl } from "./color-scheme-control";
import { I18nextProvider } from "./i18next-provider";
import styles from "./layout.module.css";

const geist = Geist({ subsets: ["latin"] });

const geistMono = Geist_Mono({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
});

const h = 56;

export const metadata = {
  title: t("site.title"),
  description: t("site.description"),
  openGraph: {
    siteName: t("site.title"),
    type: "website",
    locale: language.replace("-", "_"),
  },
};

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <html suppressHydrationWarning dir={direction} lang={language}>
      <head>
        <ColorSchemeScript defaultColorScheme={defaultColorScheme} />
      </head>
      <body>
        <I18nextProvider>
          <MantineProvider
            defaultColorScheme={defaultColorScheme}
            theme={theme}
          >
            <Provider>
              <Box
                bg="var(--mantine-color-body)"
                pos="sticky"
                style={{ zIndex: 1 }}
                top={0}
              >
                <Container>
                  <Group
                    className={styles.header}
                    component="header"
                    h={h}
                    justify="space-between"
                  >
                    <Group gap="xs">
                      <ThemeIcon variant="gradient">
                        <IconDatabaseSmile
                          stroke={1.5}
                          style={{ width: rem(20), height: rem(20) }}
                        />
                      </ThemeIcon>
                      <Text fw={900} variant="gradient">
                        {t("site.title")}
                      </Text>
                    </Group>
                    <ColorSchemeControl />
                  </Group>
                </Container>
              </Box>
              <Center mih={`calc(100dvh - ${rem(h * 2)})`}>{children}</Center>
              <Center h={h}>
                <Container component="footer">
                  <Text c="dimmed" size="sm" ta="center">
                    <T i18nKey="site.madeBy">
                      <Anchor
                        href="https://bsky.app/profile/phuctm97.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        variant="gradient"
                      />
                    </T>
                  </Text>
                </Container>
              </Center>
            </Provider>
          </MantineProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
