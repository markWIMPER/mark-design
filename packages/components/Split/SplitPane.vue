<template>
  <div
    class="split-pane"
    :class="{
      [`split-pane-${$props.direction}`]: props.direction,
      dragging: splitData.isDragging,
    }"
    ref="splitPaneRef"
  >
    <slot></slot>
    <!-- 拖动条  -->
    <template v-for="i in itemLength" :key="i">
      <div
        :style="getDashStyle(i)"
        class="split-dash"
        @mousedown.stop="handleDown(i, $event)"
      ></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, provide, onMounted, onUnmounted } from "vue";
import { isString } from "lodash-es";
import { useMouseEvent } from "./useMouseEvent";
import { SPLIT_ULTRA_CTX_KEY } from "./constant";
import type { ISplistData, SplitDataItem, ISplitProps } from "./types";

const splitPaneRef = ref<HTMLElement>();
const props = defineProps<ISplitProps>();
const splitData = reactive<ISplistData>({
  items: [],
  clientHeight: 0,
  clientWidth: 0,
  readyToAllocation: 0,
  readyToAllocationItemLength: 0,
  moveIndex: -1,
  currentChange: 0,
  isDragging: false,
});

const itemLength = computed(() =>
  splitData.items.length ? splitData.items.length - 1 : 0
);

const mode = computed(() => {
  if (props.direction == "horizontal") {
    return "clientWidth";
  }
  if (props.direction == "vertical") {
    return "clientHeight";
  }
  return "clientWidth";
});

const getCurrentInstance = (index: number) => {
  let currentInstance = 0;
  splitData.items.forEach((ele) => {
    if (ele.index < index) {
      currentInstance += ele.getInstance();
    }
  });
  return currentInstance;
};

const getLeft = (index: number) => {
  let width = 0;
  splitData.items.forEach((element) => {
    if (element.index < index) {
      width += element.cWidth;
    }
  });
  return width;
};

const getTop = (index: number) => {
  let height = 0;
  splitData.items.forEach((element) => {
    if (element.index < index) {
      height += element.cHeight;
    }
  });
  return height;
};

const getDashStyle = (index: number) => {
  const base = 4;
  if (props.direction == "horizontal") {
    return {
      left: `${getLeft(index) - base / 2}px`,
      top: "0",
      bottom: "0",
      width:
        splitData.isDragging && splitData.moveIndex === index
          ? `${base}px`
          : "1px",
      opacity:
        splitData.isDragging && splitData.moveIndex === index ? "0.8" : "0.5",
    };
  }
  if (props.direction == "vertical") {
    return {
      top: `${getTop(index) - base / 2}px`,
      left: "0",
      right: "0",
      height:
        splitData.isDragging && splitData.moveIndex === index
          ? `${base}px`
          : "1px",
      opacity:
        splitData.isDragging && splitData.moveIndex === index ? "0.8" : "0.5",
    };
  }
};

const initItem = () => {
  // 初始化宽高
  if (!splitData.clientWidth && !splitData.clientHeight) {
    splitData.clientWidth = splitPaneRef.value?.clientWidth || 0;
    splitData.clientHeight = splitPaneRef.value?.clientHeight || 0;
  }
  splitData.readyToAllocationItemLength = 0;

  //如果item设置了width/height，则根据width/height计算出来它的current
  splitData.readyToAllocation = splitData[mode.value];
  splitData.items.forEach((ele) => {
    if (ele.initialValue) {
      let current = ele.initialValue;
      if (isString(current)) {
        current = Number(current);
      }
      // 传入的时比例
      if (current < 1) {
        current = splitData[mode.value] * current;
      }
      ele.setInstance(current);
      splitData.readyToAllocation -= ele.getInstance();
    } else {
      //若没有，平均：总宽度减去已经设置过宽度的
      splitData.readyToAllocationItemLength += 1;
    }
  });

  splitData.items.forEach((ele) => {
    if (!ele.initialValue) {
      ele.setInstance(
        splitData.readyToAllocation / splitData.readyToAllocationItemLength
      );
    }
  });
};

const resize = () => {
  splitData.clientWidth = splitPaneRef.value?.clientWidth || 0;
  splitData.clientHeight == splitPaneRef.value?.clientHeight || 0;
  initItem();
};

const registryItem = (item: SplitDataItem) => {
  splitData.items.push(item);
  if (splitData.items.length == splitPaneRef.value?.children?.length) {
    initItem();
  }
};

const { handleDown } = useMouseEvent(splitData, props.direction);

provide(SPLIT_ULTRA_CTX_KEY, {
  splitData,
  direction: props.direction,
  registryItem,
  initItem,
  getCurrentInstance,
  getLeft,
  getTop,
});

onMounted(() => {
  // resize();
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});
</script>

<style>
@import "./style.css";
</style>
