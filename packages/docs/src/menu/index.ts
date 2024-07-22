import { guide, guideItem } from "./guide";
import { components, ComponentItems } from "./components";

export const sidebar = {
  "/src/pages/guide/": guideItem,
  "src/pages/components/": ComponentItems,
};
export const nav = [...guide, ...components];
