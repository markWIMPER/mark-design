import type { Component, Ref } from "vue";

export type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "text";
export type NativeType = "button" | "submit" | "reset";
export type ButtonSize = "large" | "default" | "small";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  // 添加其他属性
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  /* 节流模式 */
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonEmits {
  (e: "click", value: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
