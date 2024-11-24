import type { JSX, ReactNode } from "react";

import type { ProfileProps } from "~/lib/profile-props";

import { AreaChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";
import { t } from "i18next";
import { Suspense } from "react";

import { MountingOverlay } from "~/lib/mounting-overlay";
import { withAtpFollowers } from "~/lib/with-atp-followers";
import { withAtpProfile } from "~/lib/with-atp-profile";

import { valueFormatter } from "./value-formatter";

const h = 320;

async function UI({ params }: ProfileProps): Promise<JSX.Element> {
  const { actor } = await params;
  const profile = await withAtpProfile(actor);
  const followers = await withAtpFollowers(profile);
  const map = new Map<
    number,
    { newFollowers: number; totalFollowers: number }
  >();
  for (const follower of followers) {
    const date = new Date(follower.createdAt);
    date.setHours(0, 0, 0, 0);
    const time = date.getTime();
    const value = map.get(time);
    if (value) value.newFollowers++;
    else map.set(time, { newFollowers: 1, totalFollowers: 0 });
  }
  const data = [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([time, { newFollowers, totalFollowers }]) => ({
      date: t("asDate", {
        date: new Date(time),
        month: "short",
        day: "numeric",
      }),
      newFollowers,
      totalFollowers,
    }));
  let currentTotalFollowers = 0;
  for (const item of data) {
    currentTotalFollowers += item.newFollowers;
    item.totalFollowers = currentTotalFollowers;
  }
  const counts = data.map(
    ({ newFollowers, totalFollowers }) => newFollowers + totalFollowers,
  );
  return (
    <AreaChart
      data={data}
      dataKey="date"
      h={h}
      series={[
        {
          name: "totalFollowers",
          label: t("profile:totalFollowers"),
          color: "blue",
        },
        {
          name: "newFollowers",
          label: t("profile:newFollowers"),
          color: "green",
        },
      ]}
      type="stacked"
      valueFormatter={valueFormatter}
      yAxisProps={{
        domain: [Math.min(...counts), Math.max(...counts)],
      }}
    />
  );
}

export function Followers(props: ProfileProps): ReactNode {
  return (
    <Suspense fallback={<Skeleton h={h} />}>
      <MountingOverlay
        boxProps={{ w: "100%" }}
        overlayProps={{ color: "var(--mantine-color-body)" }}
        transitionProps={{ duration: 250 }}
      >
        <UI {...props} />
      </MountingOverlay>
    </Suspense>
  );
}
