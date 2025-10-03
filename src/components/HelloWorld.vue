<script setup lang="ts">
import { ref } from "vue";
import Trend from "../../lib/Trend.vue";

defineProps<{ msg: string }>();

const data1 = ref([0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]);
setTimeout(() => {
  data1.value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0].reverse();
}, 2000);
</script>

<template>
  <trend
    :data="data1"
    gradientDirection="right"
    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
    :padding="8"
    :radius="8"
    :stroke-width="1"
    stroke-linecap="butt"
    auto-draw
    smooth
  >
  </trend>
  <trend
    :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
    gradientDirection="right"
    :gradient="['#FF0000']"
    :padding="8"
    :radius="8"
    :stroke-width="1"
    stroke-linecap="butt"
    auto-draw
    smooth
  >
  </trend>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
