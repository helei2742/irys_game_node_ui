<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string,
    size: string
  }>(), {
    name: 'alt',
    size: '12'
  })

const iconStyle = computed(() => {
  const iconUrl = new URL(`../assets/icons/${props.name}.svg`, import.meta.url).href
  return {
    width: props.size + 'px',
    height: props.size + 'px',
    backgroundColor: 'currentColor',
    maskImage: `url(${iconUrl})`,
    WebkitMaskImage: `url(${iconUrl})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
  }
})

</script>

<template>
  <i class="custom-icon" :style="iconStyle"></i>
</template>

<style scoped>
.custom-icon {
  display: inline-block;
  margin: 0 5px;
}
.el-button  .custom-icon {
  margin: 0 !important;
}
</style>
