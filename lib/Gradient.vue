<script setup lang="ts">
import { toRefs } from "vue";

const props = withDefaults(defineProps<{
    gradient?: string[];
    gradientDirection?: "top" | "bottom" | "left" | "right";
    id?: string;
}>(), {
    gradient: () => ["#000"],
    gradientDirection: "top",
    id: () => `vue3-trend-gradient-${crypto.randomUUID()}`,
});

const { gradient, gradientDirection, id } = toRefs(props);
</script>

<template>
  <defs>
    <linearGradient
      :id="id"
      :x1="+(gradientDirection === 'left')"
      :y1="+(gradientDirection === 'top')"
      :x2="+(gradientDirection === 'right')"
      :y2="+(gradientDirection === 'bottom')"
    >
      <stop
        v-for="(color, index) in gradient.slice().reverse()"
        :key="index"
        :offset="index / (gradient.length - 1 || 1)"
        :stop-color="color"
      />
    </linearGradient>
  </defs>
</template>