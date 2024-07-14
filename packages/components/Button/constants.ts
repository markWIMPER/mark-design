// 定义一些常量
import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";

// 唯一标识符，用于在vue中注入和获取ButtonGroupContext
export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> =
  Symbol("buttonGroupContext");
