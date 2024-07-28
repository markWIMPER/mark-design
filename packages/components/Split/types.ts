import type { ComputedRef } from "vue";

export type SplitMode = "horizontal" | "vertical";

export interface ISplitProps {
  direction: "horizontal" | "vertical";
}

export interface ISplitItemProps {
  min?: number | string;
  // max?: number | string;
  width?: number | string;
  height?: number | string;
}

export interface ISplitItemEmits {
  (e: "on-change", value: { height: number; width: number }): void;
}

export interface SplitDataItem {
  index: number;
  initialValue: number | string;
  getInstance(): number;
  setInstance(value: number): void;
  setChange(value: number): void;
  minSize: number | ComputedRef<number>;
  cWidth: number | ComputedRef<number>;
  cHeight: number | ComputedRef<number>;
}

export interface ISplistData {
  items: SplitDataItem[];
  clientWidth: number;
  clientHeight: number;
  readyToAllocation: number;
  readyToAllocationItemLength: number;
  moveIndex: number;
  currentChange: number;
  isDragging: boolean;
}

export interface ISplitItemData {
  index: number;
  currentWidth: number;
  currentHeight: number;
  currentChange: number;
  isFullScreen: boolean;
}

export interface SplitUltraContext {
  splitData: ISplistData;
  direction: "horizontal" | "vertical";
  registryItem(item: SplitDataItem): void;
  initItem(): void;
  getCurrentInstance(index: number): number;
  getLeft(index: number): number;
  getTop(index: number): number;
}
