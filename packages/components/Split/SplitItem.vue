<script lang="ts" setup>
import {
  ref,
  inject,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
} from "vue";
import { isString } from "lodash-es";
import { SPLIT_ULTRA_CTX_KEY } from "./constant";
import type { ISplitItemData, ISplitItemEmits, ISplitItemProps } from "./types";

const splitItemRef = ref<HTMLElement>();

const ctx = inject(SPLIT_ULTRA_CTX_KEY, void 0);

const mode = computed(() => {
  if (ctx?.direction == "vertical") {
    return "currentHeight";
  } else {
    return "currentWidth";
  }
});

const emits = defineEmits<ISplitItemEmits>();

const props = withDefaults(defineProps<ISplitItemProps>(), {
  min: 0,
  // max: 0,
  width: 0,
  height: 0,
});

const splitItemData = reactive<ISplitItemData>({
  index: -1,
  currentWidth: 0,
  currentHeight: 0,
  currentChange: 0,
  isFullScreen: false,
});

const cWidth = computed(
  () => splitItemData.currentWidth + splitItemData.currentChange
);

const cHeight = computed(
  () => splitItemData.currentHeight + splitItemData.currentChange
);

const minSize = computed(() => {
  let min = props.min;
  if (isString(min)) {
    min = Number(min);
  }

  if (min < 1) {
    if (ctx?.direction == "horizontal") {
      min = ctx?.splitData.clientWidth * min;
    }
    if (ctx?.direction == "vertical") {
      min = ctx?.splitData.clientHeight * min;
    }
  }
  return min;
});

// 当前元素距离最左侧的距离
const left = computed(() => ctx?.getLeft(splitItemData.index));

// 当前元素距离顶部的距离
const top = computed(() => ctx?.getTop(splitItemData.index));

// 分割线
const getStyle = computed(() => {
  if (ctx?.direction == "horizontal") {
    return {
      left: `${left.value}px`,
      top: 0,
      bottom: 0,
      width: `${cWidth.value}px`,
    };
  }
  if (ctx?.direction == "vertical") {
    return {
      top: `${top.value}px`,
      left: 0,
      right: 0,
      height: `${cHeight.value}px`,
    };
  }
});

watch(
  () => props.height,
  () => {
    ctx?.initItem();
  }
);

watch(
  () => props.width,
  () => {
    ctx?.initItem();
  }
);

const setInstance = (value: number) => {
  splitItemData[mode.value] = value;
};

const setChange = (value: number) => {
  splitItemData.currentChange = value;
};

const getInstance = () => splitItemData[mode.value];

onMounted(async () => {
  await nextTick();
  splitItemData.index = ctx?.splitData.items.length || 0;

  ctx?.registryItem({
    initialValue: ctx?.direction === "horizontal" ? props.width : props.height,
    index: splitItemData.index,
    setInstance,
    getInstance,
    setChange,
    minSize,
    cWidth,
    cHeight,
  });
});
</script>

<template>
  <div :style="getStyle" class="split-item" ref="splitItemRef">
    <slot />
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
