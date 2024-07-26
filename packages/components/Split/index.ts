import SplitPane from "./SplitPane.vue";
import SplitItem from "./SplitItem.vue";
import { withInstall } from "@mark-design/utils";

export const MdSplitItem = withInstall(SplitItem);
export const MdSplit = withInstall(SplitPane);

export * from "./types";
