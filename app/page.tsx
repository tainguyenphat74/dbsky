import type { ReactNode } from "react";

import { Button, Container, List, ListItem, Text, Title } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { t } from "i18next";

import { T } from "~/lib/t";

export default function Page(): ReactNode {
  return (
    <Container component="main" my="xl" size="sm">
      <Title fw={900} fz={{ base: 42, xs: 62 }} lh={{ base: 1.2, xs: 1.1 }}>
        <T i18nKey="hero.title">
          <Text inherit span variant="gradient" />
        </T>
      </Title>
      <List
        c="dimmed"
        fz={{ base: 18, xs: 24 }}
        mb={{ base: "xs", xs: "md" }}
        mt={{ base: "lg", xs: "xl" }}
      >
        <T i18nKey="hero.highlights">
          <ListItem />
        </T>
      </List>
      <Button
        component="a"
        href="https://github.com/phuctm97/dbsky"
        leftSection={<IconBrandGithub />}
        mt={{ base: "lg", xs: "xl" }}
        rel="noopener noreferrer"
        size="xl"
        target="_blank"
        variant="default"
      >
        {t("github")}
      </Button>
    </Container>
  );
}
