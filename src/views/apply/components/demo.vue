<template>
  <div class="d3box">
    <div id="a"></div>
  </div>
</template>

<script>
import dat from "@/assets/dat.js";

export default {
  name: "demo",

  data() {
    return {
      aa: dat.data,
    };
  },

  mounted() {
    this.d3draw();
  },

  methods: {
    d3draw() {
      var height = 450,
        width = height / 1.138,
        top_margin = ~~(width / 13),
        amplitude = width / 350;

      console.log("%ctop_margin", "font-size:22px;color:red", top_margin);

      console.log("%c${10}", "font-size:22px;color:red", "${10}");

      var svg = d3

        .select("#a")

        .append("svg")

        .attr("width", 760)

        .attr("height", height + top_margin + 10 + 10)

        .append("g")

        .attr("transform", `translate(${760 / 2 - width / 2},${10})`);

      /*    var data = dat.data; */

      var data = this.aa;

      /* console.log("%cdata", "font-size:22px;color:red", data); */

      const x = d3.scale
        .linear()

        .domain([0, data[0].length - 1])

        .range([0, width]);

      const y = d3.scale
        .linear()

        .domain([0, data.length - 1])

        .range([top_margin, height]);

      var line = d3.svg

        .line()

        .x((d, i) => x(i))

        .y((d) => -d * amplitude);

      /* 画主图部分开始 */

      svg

        .append("g")

        .selectAll(".wave")

        .data(data)

        .enter()

        .append("path")

        .attr("transform", (d, i) => `translate(0,${y(i)})`)

        .attr("class", "wave")

        .attr("d", line);

      /* 画主图部分结束 */
    },
  },
};
</script>

<style lang='scss'>
#a {
  svg {
    /*   background-color: rgb(230, 224, 224); */

    .wave {
      fill: white;

      stroke: #444;

      stroke-width: 1;
    }

    .wave:hover {
      fill: rgb(207, 38, 38);

      stroke: rgb(207, 38, 38);

      stroke-width: 1;
    }
  }
}
</style>


