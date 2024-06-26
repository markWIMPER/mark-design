import type { App, Plugin } from "vue";

import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstall<Plugin>(component: Plugin[]) {
  const installer = (app: app) => each(component, (c) => app.use(c));
  return installer;
}

export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin);
  };
  return component as SFCWithInstall<T>; // 返回类型为 SFCWithInstall<T>
};
