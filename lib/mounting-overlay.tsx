"use client";

import type { BoxProps, LoadingOverlayProps } from "@mantine/core";
import type { ReactNode } from "react";

import { Box, LoadingOverlay } from "@mantine/core";
import { useMounted } from "@mantine/hooks";

export interface MountingOverlayProps
  extends Omit<LoadingOverlayProps, "visible"> {
  boxProps?: Omit<BoxProps, "children">;
}

export function MountingOverlay({
  children,
  boxProps,
  ...props
}: MountingOverlayProps): ReactNode {
  const mounted = useMounted();
  return (
    <Box pos="relative" {...boxProps}>
      {children}
      <LoadingOverlay visible={!mounted} {...props} />
    </Box>
  );
}
