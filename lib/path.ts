import { genPoints, genPath } from "./helpers/path";
import { defineComponent, h } from "vue";

export default defineComponent({
  props: ["smooth", "data", "boundary", "radius", "id", "max", "min"],

  setup(props) {
    return () => {
      const { data, smooth, boundary, radius, id, max, min } = props;
      const points = genPoints(data, boundary, { max, min });
      const d = genPath(points, smooth ? radius : 0);

      return h("path", {
        d,
        fill: "none",
        stroke: `url(#${id})`,
      });
    };
  },
});
