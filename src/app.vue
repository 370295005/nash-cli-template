<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script setup></script>
<style lang="stylus">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
