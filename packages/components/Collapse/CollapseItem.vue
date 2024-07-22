<script lang="ts" setup>
import type { CollapseItemProps } from "./types";
import { inject, computed } from "vue";
import { COLLAPSE_CTX_KEY } from "./constant";
import MdIcon from "../Icon/Icon.vue";

defineOptions({
  name: "MdCollapseItem",
});

const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));

function handleClick() {
  if (props.disabled) return;
  ctx?.handleItemClick(props.name);
}
</script>

<template>
  <div
    class="md-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="md-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="md-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <md-icon icon="angle-right" class="header-angle"></md-icon>
    </div>

    <!-- <transition nam="slide" v-on="transitionEvents"> -->
    <div class="md-collapse-item__wrapper" v-show="isActive">
      <div class="md-collapse-item__content" :id="`item-content-${name}`">
        <slot></slot>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
