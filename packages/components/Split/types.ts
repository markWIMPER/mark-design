export type SplitMode = "horizontal" | "vertical";

export interface ISplitProps {
  direction: "horizontal" | "vertical";
}

export interface ISplitItemProps {
  min?: number | string;
  max?: number | string;
  width?: number | string;
  height?: number | string;
}

export interface ISplitItemEmits {
  (e: "on-change", value: { height: number; width: number }): void;
}

export interface SplitDataItem {
  initialValue: number | string;
  index: number;
  getInstance(): number;
  setInstance(value: number): void;
}

export interface ISplistData {
  items: Array<SplitDataItem>;
  clientWidth: number;
  clientHeight: number;
  readyToAllocationWidth: number;
  readyToAllocationHeight: number;
  readyToAllocationItemLength: number;
  moveIndex: number;
  currentChange: null;
}

export interface ISplitItemData {
  index: number;
  currentWidth: number;
  currentHeight: number;
  currentChange: number;
  isFullScreen: boolean;
}

export interface SplitUltraContext {
  items: SplitDataItem[];
  direction: "horizontal" | "vertical";
  clientWidth: number;
  clientHeight: number;
  registryItem(item: SplitDataItem): void;
  initItem(): void;
  getLeft(index: number): number;
  getTop(index: number): number;
  handleItemClick(): void;
}
