import markInstall from "./makeInstaller";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import "@mark-design/theme/index.css";

library.add(fas);
const installer = markInstall(components);

export * from "../components";
export default installer;
