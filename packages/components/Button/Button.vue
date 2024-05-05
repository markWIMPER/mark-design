<script lang="ts" setup>
import { ref, withDefaults } from "vue";
import type { ButtonProps } from "./types";

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
  nativeType: "button",
  tag: "button",
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();
</script>

<template>
  <component
    :is="props.tag"
    ref="_ref"
    class="md-button"
    :type="props.tag === 'button' ? nativeType : void 0"
    :disabled="props.disabled || loading ? true : void 0"
    :class="{
      [`md-button--${type}`]: type,
      [`md-button--${size}`]: size,
      'is-plain': plain,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.md-button {
  background: tomato;
}
</style>
