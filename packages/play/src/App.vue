<script setup lang="ts">
import { MdSplit, MdSplitItem } from "mark-design";
import "mark-design/dist/index.css";
</script>

<template>
  <md-split direction="horizontal" class="w-full h-full">
    <md-split-item>3663</md-split-item>
    <md-split-item>3663</md-split-item>
    <md-split-item>3663</md-split-item>
  </md-split>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>
