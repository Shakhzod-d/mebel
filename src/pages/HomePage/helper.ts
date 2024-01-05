import { TFunction } from "i18next";

export const sortingOptions = (t: TFunction<"translation">) => [
  { value: "price", title: t("body.ascendingOrder") },
  { value: "-price", title: t("body.descendingOrder") },
];
