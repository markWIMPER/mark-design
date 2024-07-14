<script lang="ts" setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import type { IconProps } from "./type";

defineOptions({
  name: "MdIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<template>
  <i
    class="md-icon"
    :class="[`md-icon-${props.type}`]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style>
@import "./style.css";
</style>
