<template>
  <div class="examine">
    <p @click="goBack">返回</p>
    <div id="box" style="width:100%;height:300px"></div>
    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="统计时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_sn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="字段名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数值">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dma_name }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { DeviceTaskList } from "@/api/datatask";

export default {
  data() {
    return {
      list: [],
      currentPage: 1, //  初始页
      pagesize: 10, //    每页的数据
    };
  },
  mounted() {
    this.getlist();
    this.drawLine();
  },
  methods: {
    //获取数据
    getlist() {
      let obj = {
        taskid: localStorage.getItem("jobInfoId"),
      };
      DeviceTaskList(obj).then((res) => {
        console.log(res);
        this.list = res.datas.data;
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例，所以只能在mounted中调用
      let myChart = this.$echarts.init(document.getElementById("box"));
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "all", "paid"],
          source: [
            {
              product: "Matcha Latte",
              "all": 43.3,
              "paid": 85.8,
              "2017": 93.7,
            },
            { product: "Milk Tea", "all": 83.1, "paid": 73.4, "2017": 55.1 },
            {
              product: "Cheese Cocoa",
              "all": 86.4,
              "paid": 65.2,
              "2017": 82.5,
            },
            {
              product: "Walnut Brownie",
              "all": 72.4,
              "paid": 53.9,
              "2017": 39.1,
            },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };

      // let option = {
      //   color: ["#3398DB",'#000'],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true,
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: ["JG", "ZC", "ND", "LS", "GQ"],
      //       axisTick: {
      //         alignWithLabel: true,
      //       },
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //     },
      //   ],
      //   series: [
      //     {
      //       name: "直接访问",
      //       type: "bar",
      //       barWidth: "20%",
      //       data: [7, 6.9, 9.5, 14.5, 18.4],
      //     },
      //     {
      //       name: "直接访问",
      //       type: "bar",
      //       barWidth: "20%",
      //       data: [3.9, 4.2, 5.7, 8.5, 11.9],
      //     }
      //   ],
      // };
      myChart.setOption(option);
    },
    // 返回
    goBack() {
      this.$router.push({ path: "/app/apply/datatask" });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); // 每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); // 点击第几页
    },
  },
};
</script>

<style lang="scss">
.examine {
  width: 100%;
  height: 100%;
  position: relative;
  p {
    margin: 0;
    font-size: 20px;
    padding: 20px 0;
    color: blue;
  }
}
.foot {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>