import { defineComponent, h } from "vue";

export default defineComponent({
  props: ["gradient", "gradientDirection", "id"],

  setup(props) {
    return () => {
      const { gradient, gradientDirection, id } = props;
      const len = gradient.length - 1 || 1;
      const stops = gradient
        .slice()
        .reverse()
        .map((color: string, index: number) =>
          h("stop", {
            offset: index / len,
            "stop-color": color,
          })
        );

      return h("defs", [
        h(
          "linearGradient",
          {
            id,
            /*
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
                */
            x1: +(gradientDirection === "left"),
            y1: +(gradientDirection === "top"),
            x2: +(gradientDirection === "right"),
            y2: +(gradientDirection === "bottom"),
          },
          stops
        ),
      ]);
    };
  },
});
