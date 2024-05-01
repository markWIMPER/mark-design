import { makeInstall } from "@mark-design/utils";
import components from "./components";
import "@mark-design/theme/index.css";

const installer = makeInstall(components);

export * from "@mark-design/components";
export default installer;
