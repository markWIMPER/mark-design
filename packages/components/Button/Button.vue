<script lang="ts" setup>
import { ref, withDefaults, inject } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import MdIcon from "../Icon/Icon.vue";
import { computed } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";

/**
 * Button.vue
 * Button.test.tsx
 * types/ts
 * styel.css
 * constants.ts
 */

defineOptions({
  name: "MdButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
});

const emits = defineEmits<ButtonEmits>();
const slots = defineSlots();
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);

const _ref = ref<HTMLButtonElement>();
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");

const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
);

const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0",
}));

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  {
    // leading: true,
    trailing: false,
  }
);

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    class="md-button"
    :class="{
      [`md-button--${type}`]: type,
      [`md-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :autofocus="autofocus"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <md-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        ></md-icon>
      </slot>
    </template>

    <md-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />

    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
