import { TFunction } from "i18next";

export const navItems = (t: TFunction<"translation">) => [
  { path: "/", label: t("navbar.home") },
  { path: "/favorites", label: t("navbar.favorites") },
  { path: "/cart", label: t("navbar.cart") },
  { path: "/contact", label: t("navbar.contact") },
  { path: "/new", label: t("navbar.createNewMebel") },
];
