import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>; // 返回类型为 SFCWithInstall<T>
};
