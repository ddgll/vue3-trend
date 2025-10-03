<script setup lang="ts">
import Path from "./Path.vue";
import Gradient from "./Gradient.vue";
import { watch, nextTick, computed, toRefs } from "vue";

const props = withDefaults(defineProps<{
    data: Array<number>;
    autoDraw?: boolean;
    autoDrawDuration?: number;
    autoDrawEasing?: string;
    gradient?: string[];
    gradientDirection?: "top" | "bottom" | "left" | "right";
    max?: number;
    min?: number;
    height?: number;
    width?: number;
    padding?: number;
    radius?: number;
    smooth?: boolean;
}>(), {
  autoDraw: false,
  autoDrawDuration: 2000,
  autoDrawEasing: "ease",
  gradient: () => ["#000"],
  gradientDirection: "top",
  max: -Infinity,
  min: Infinity,
  padding: 8,
  radius: 10,
});

const {
  data,
  autoDraw,
  autoDrawDuration,
  autoDrawEasing,
  gradient,
  gradientDirection,
  max,
  min,
  height,
  width,
  padding,
  radius,
  smooth,
} = toRefs(props);

const id = `vue3-trend-${crypto.randomUUID()}`;
let lastLength = 0;

const boundary = computed(() => {
  const viewWidth = width.value || 300;
  const viewHeight = height.value || 75;
  return {
    minX: padding.value,
    minY: padding.value,
    maxX: viewWidth - padding.value,
    maxY: viewHeight - padding.value,
  };
});

watch(
  () => data.value,
  () => {
    nextTick(() => {
      if (!autoDraw.value) return;
      const pathEl: SVGPathElement | null = document.querySelector(
        `path#${id}`
      );
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      pathEl.style.transition = "none";
      pathEl.style.strokeDasharray = length + " " + length;
      pathEl.style.strokeDashoffset =
        "" + Math.abs(length - (lastLength || 0));
      pathEl.getBoundingClientRect();
      pathEl.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${autoDrawEasing.value}`;
      pathEl.style.strokeDashoffset = "0";
      lastLength = length;
    });
  },
  { immediate: true }
);
</script>

<template>
  <svg
    v-if="data && data.length >= 2"
    :width="width || '100%'"
    :height="height || '25%'"
    :viewBox="`0 0 ${width || 300} ${height || 75}`"
  >
    <Gradient :id="id" :gradient="gradient" :gradientDirection="gradientDirection" />
    <Path
      :data="data"
      :boundary="boundary"
      :smooth="smooth"
      :radius="radius"
      :max="max"
      :min="min"
      :id="id"
    />
  </svg>
</template>