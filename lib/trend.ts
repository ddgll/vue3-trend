import Path from "./path";
import Gradient from "./gradient";
import { defineComponent, h, watch, nextTick } from "vue";

export default defineComponent({
  name: "Trend",

  props: {
    data: {
      type: Array,
      required: true,
    },
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000,
    },
    autoDrawEasing: {
      type: String,
      default: "ease",
    },
    gradient: {
      type: Array,
      default: () => ["#000"],
    },
    gradientDirection: {
      type: String,
      default: "top",
    },
    max: {
      type: Number,
      default: -Infinity,
    },
    min: {
      type: Number,
      default: Infinity,
    },
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8,
    },
    radius: {
      type: Number,
      default: 10,
    },
    smooth: Boolean,
  },

  setup(props) {
    const id = `vue3-trend-${crypto.randomUUID()}`;

    let lastLength: number = 0;

    watch(
      () => props.data,
      () => {
        nextTick(() => {
          if (!props.autoDraw) return;
          const pathEl: SVGPathElement | null = document.querySelector(
            `path#${id}`
          );
          if (!pathEl) return;
          // const pathEl = path.value.path.$el;
          const length = pathEl.getTotalLength();
          pathEl.style.transition = "none";
          pathEl.style.strokeDasharray = length + " " + length;
          pathEl.style.strokeDashoffset =
            "" + Math.abs(length - (lastLength || 0));
          pathEl.getBoundingClientRect();
          pathEl.style.transition = `stroke-dashoffset ${props.autoDrawDuration}ms ${props.autoDrawEasing}`;
          pathEl.style.strokeDashoffset = "0";
          lastLength = length;
        });
      },
      { immediate: true }
    );

    return () => {
      if (!props.data || props.data.length < 2) return;
      const { width, height, padding } = props;
      const viewWidth = width || 300;
      const viewHeight = height || 75;
      const boundary = {
        minX: padding,
        minY: padding,
        maxX: viewWidth - padding,
        maxY: viewHeight - padding,
      };
      return h(
        "svg",
        {
          width: width || "100%",
          height: height || "25%",
          viewBox: `0 0 ${viewWidth} ${viewHeight}`,
        },
        [
          h(Gradient, { ...props, id, boundary }),
          h(Path, {
            ...props,
            boundary,
            id,
          }),
        ]
      );
    };
  },
});
