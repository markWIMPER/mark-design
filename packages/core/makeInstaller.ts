import type { App, Plugin } from "vue";
import { each } from "lodash-es";

export default function makeInstaller(components: Plugin[]) {
  const install = (app: App /* options?: ConfigProviderProps */) => {
    // if (get(app, INSTALLED_KEY)) return;
    // set(app, INSTALLED_KEY, true);

    each(components, (c) => {
      app.use(c);
    });

    // if (options) provideGlobalConfig(options, app, true);
  };

  return install;
}
[];
