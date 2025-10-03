<script setup lang="ts">
import { genPoints, genPath } from "./helpers/path";
import { computed, toRefs } from "vue";
import { PointBounds } from "./index.d";

const props = withDefaults(defineProps<{
    data: number[];
    boundary: PointBounds;
    smooth?: boolean;
    radius?: number;
    id?: string;
    max?: number;
    min?: number;
}>(), {
    smooth: false,
    radius: 10,
    max: -Infinity,
    min: Infinity,
});

const { data, smooth, boundary, radius, id, max, min } = toRefs(props);

const d = computed(() => {
  const points = genPoints(data.value, boundary.value, {
    max: max.value,
    min: min.value,
  });
  return genPath(points, smooth.value ? radius.value : 0);
});
</script>

<template>
  <path :id="id" :d="d" fill="none" :stroke="`url(#${id})`" />
</template>