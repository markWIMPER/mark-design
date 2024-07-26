<template>
  <div class="split-container" ref="splitContainerRef">
    <slot></slot>
    <!-- 拖动条  -->
    <div
      v-for="index in itemLength"
      :key="index"
      :style="getDashStyle(index)"
      class="split-dash"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, provide, onMounted } from "vue";
import { isString } from "lodash-es";
import { SPLIT_ULTRA_CTX_KEY } from "./constant";
import type { ISplistData, SplitDataItem, ISplitProps } from "./types";

const props = defineProps<ISplitProps>();

const splitData = reactive<ISplistData>({
  items: [],
  clientHeight: 0,
  clientWidth: 0,
  readyToAllocationWidth: 0,
  readyToAllocationHeight: 0,
  readyToAllocationItemLength: 0,
  moveIndex: -1,
  currentChange: null,
});

const splitContainerRef = ref<HTMLElement>();

const itemLength = computed(() => splitData.items.length);

const firstItem = computed(() =>
  splitData.moveIndex
    ? splitData.items.find(
        (item, index) => index == (splitData.moveIndex as number) - 1
      )
    : null
);

const secondItem = computed(() =>
  splitData.moveIndex
    ? splitData.items.find((item, index) => index == splitData.moveIndex)
    : null
);

const getDashStyle = (index: number) => {
  const base = 4;
  if (props.direction == "horizontal") {
    return {
      left: `${getLeft(index) - base / 2}px`,
      top: 0,
      bottom: 0,
      width: `${base}px`,
    };
  }
  if (props.direction == "vertical") {
    return {
      top: `${getTop(index) - base / 2}px`,
      left: 0,
      right: 0,
      height: `${base}px`,
    };
  }
};

const handleItemClick = () => {};

const getLeft = (index) => {
  let width = 0;
  splitData.items.forEach((ele) => {
    if (ele.index < index) {
      width += ele.getCurrentWidth();
    }
  });
  return width;
};

const getTop = (index) => {
  let height = 0;
  splitData.items.forEach((ele) => {
    if (ele.index < index) height += ele.getCurrentHeight();
    console.log("ele", ele.getCurrentHeight());
  });
  return height;
};

const initItem = () => {
  // 初始化宽高
  if (!splitData.clientWidth && !splitData.clientHeight) {
    splitData.clientWidth = splitContainerRef.value?.clientWidth || 0;
    splitData.clientHeight = splitContainerRef.value?.clientHeight || 0;
  }
  splitData.readyToAllocationItemLength = 0;
  if (props.direction == "horizontal") {
    //如果item设置了width，则根据width计算出来它的currentWidth
    splitData.readyToAllocationWidth = splitData.clientWidth;
    splitData.items.forEach((ele) => {
      if (ele.width) {
        let currentWidth = ele.getCurrentWidth();
        if (isString(currentWidth)) {
          currentWidth = Number(currentWidth);
        }
        // 传入的时比例
        if (currentWidth < 1) {
          currentWidth = splitData.clientWidth * currentWidth;
        }
        // ele.currentWidth = currentWidth;
        ele.setCurrentWidth(currentWidth);
        splitData.readyToAllocationWidth -= ele.getCurrentWidth();
      } else {
        //若没有，平均：总宽度减去已经设置过宽度的
        splitData.readyToAllocationItemLength += 1;
      }
    });

    splitData.items.forEach((ele) => {
      if (!ele.width) {
        ele.setCurrentWidth(
          splitData.readyToAllocationWidth /
            splitData.readyToAllocationItemLength
        );
      }
    });
  }
  if (props.direction == "vertical") {
    //
    splitData.readyToAllocationHeight = splitData.clientHeight;
    splitData.items.forEach((ele) => {
      if (ele.height) {
        let currentHegiht = ele.getCurrentHeight();
        if (isString(currentHegiht)) {
          currentHegiht = Number(currentHegiht);
        }
        if (currentHegiht < 1) {
          currentHegiht = splitData.clientHeight * currentHegiht;
        }
        ele.setCurrentHeight(currentHegiht);
        splitData.readyToAllocationHeight -= ele.getCurrentHeight();
      } else {
        //若没有，平均：总宽度减去已经设置过宽度的
        splitData.readyToAllocationItemLength += 1;
      }
    });
    splitData.items.forEach((ele) => {
      if (!ele.height) {
        ele.setCurrentHeight(
          splitData.readyToAllocationHeight /
            splitData.readyToAllocationItemLength
        );
      }
    });
  }
};

const resize = () => {
  splitData.clientWidth = splitContainerRef.value?.clientWidth || 0;
  splitData.clientHeight == splitContainerRef.value?.clientHeight || 0;
  initItem();
};

const registryItem = (item: SplitDataItem) => {
  splitData.items.push(item);
  if (splitData.items.length == splitContainerRef.value?.children?.length) {
    initItem();
  }
};

provide(SPLIT_ULTRA_CTX_KEY, {
  items: splitData.items,
  direction: props.direction,
  clientHeight: splitData.clientHeight,
  clientWidth: splitData.clientWidth,
  registryItem,
  initItem,
  getLeft,
  getTop,
  handleItemClick,
});

onMounted(() => {
  // console.log(splitContainerRef.value?.children?.length);
});
</script>

<style scoped>
@import "./style.css";
</style>
