"use client";

import { t } from "i18next";

export function valueFormatter(value: number): string {
  return t("asCount", { count: value });
}
