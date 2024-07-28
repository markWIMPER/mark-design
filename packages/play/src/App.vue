<script setup lang="ts">
import { MdSplit, MdSplitItem } from "mark-design";
import "mark-design/dist/index.css";
</script>

<template>
  <div class="container">
    <md-split direction="horizontal">
      <md-split-item width="300" min="0.2">
        <div class="card"></div>
      </md-split-item>
      <md-split-item min="0.2">
        <div class="card"></div>
      </md-split-item>
      <md-split-item>
        <div class="card"></div>
      </md-split-item>
      <md-split-item>
        <div class="card"></div>
      </md-split-item>
    </md-split>
  </div>
</template>

<style scoped>
.container {
  height: 500px;
  width: 100%;
  background: skyblue;
}

.card {
  width: 100%;
  height: 100%;
}
</style>
