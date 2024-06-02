import { makeInstall } from "@mark-design/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import "@mark-design/theme/index.css";

library.add(fas);
const installer = makeInstall(components);

export * from "@mark-design/components";
export default installer;
