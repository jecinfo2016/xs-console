<template>
  <div class="equipment">
    <p>任务执行情况</p>
    <div class="inputso">
      <div class="so">
        <el-form :inline="true" style="margin-bottom: -18px;">
          <el-form-item label prop="deviceName">
            <el-select v-model="search.value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="search.deviceName" placeholder="请输入关键字"></el-input> -->
          </el-form-item>
          <el-date-picker
            v-model="search.time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-form-item>
            <el-button type="default" @click="handleFilter" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right"></el-form-item>
        </el-form>
      </div>
      <!-- <div style="float: right;padding:10px 0;">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </div>-->
    </div>

    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.executorHandler }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务调度时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.triggerTime | timefilters}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务完成时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.handleTime | timefilters }}</span>
        </template>
      </el-table-column>
      <el-table-column label="耗时" align="center">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.triggerTime +'/'+ scope.row.handleTime | timeDifference }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行状态" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.triggerCode | triggerCode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="examine(scope.row)">查看日志</el-button>
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
        :total="recordsFiltered"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import { pageList, stop } from "@/api/taskexecute";
import axios from "axios";
export default {
  data() {
    return {
      options: [
        {
          id: 0,
          value: -1,
          label: "全部",
        },
        {
          id: 1,
          value: 1,
          label: "成功",
        },
        {
          id: 2,

          value: 2,
          label: "失败",
        },
        {
          id: 3,

          value: 3,
          label: "进行中",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      currentPage: 1, //  初始页
      recordsFiltered: null,
      pagesize: 10, //    每页的数据
      list: [],
      search: {
        value: null,
        devceTypeId: null,
        dmaId: null,
        deviceSn: null,
        deviceName: null,
        clientId: localStorage.getItem("clientId"),
        time: null,
      },
    };
  },
  filters: {
    timefilters(val) {
      if (val == null || val == "") {
        return "暂无时间";
      } else {
        let d = new Date(val); //val 为表格内取到的后台时间
        let month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        let times =
          d.getFullYear() +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          min +
          ":" +
          sec;
        return times;
      }
    },
    triggerCode(val) {
      if (val == 200) {
        return "成功";
      } else if (val == 500) {
        return "失败";
      } else {
        return "进行中";
      }
    },
    timeDifference(val) {
      let time = val.split("/");
      let a = new Date(time[0]).getTime();
      let b = new Date(time[1]).getTime();
      if (time[1] == 'null') {
        return "-";
      } else {
        let time = val.split("/");
        let a = new Date(time[0]).getTime();
        let b = new Date(time[1]).getTime();
        let c = b - a;
        var leave1 = c % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return hours + ":" + minutes + ":" + seconds;
      }
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    examine(val) {
      localStorage.setItem('triggerMsg',val.triggerMsg)
      // console.log(val.triggerMsg)
      this.$router.push({ path: "/app/apply/journal" });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); // 每页下拉显示数据
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
      console.log(this.currentPage); // 点击第几页
    },
    // 查询
    handleFilter() {
      let time = null;
      if (this.search.time != null) {
        var date = new Date(this.search.time[0]);
        var dates = new Date(this.search.time[1]);
        var YY = date.getFullYear() + "-";
        var MM =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
          ":";
        var mm =
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
        var ss =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        var YYY = dates.getFullYear() + "-";
        var MMM =
          (dates.getMonth() + 1 < 10
            ? "0" + (dates.getMonth() + 1)
            : dates.getMonth() + 1) + "-";
        var DDD =
          dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate();
        var hhh =
          (dates.getHours() < 10 ? "0" + dates.getHours() : dates.getHours()) +
          ":";
        var mmm =
          (dates.getMinutes() < 10
            ? "0" + dates.getMinutes()
            : dates.getMinutes()) + ":";
        var sss =
          dates.getSeconds() < 10
            ? "0" + dates.getSeconds()
            : dates.getSeconds();
        time =
          YY +
          MM +
          DD +
          " " +
          hh +
          mm +
          ss +
          " - " +
          YYY +
          MMM +
          DDD +
          " " +
          hhh +
          mmm +
          sss;
      }

      let obj = {
        filterTime: time,
        logStatus: this.search.value,
        jobId: 2,
      };
      axios({
        url: "https://saas.jecinfo.com/gateway/api-device/DeviceLog/pageList",
        method: "get",
        params: obj,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res, "----");
          this.list = res.data.data;
          this.recordsFiltered = res.data.recordsFiltered;
        }
      });
    },
    // 获取列表数据
    getList() {
      let obj = {
        jobId: 2,
        logStatus: -1,
        length: this.pagesize,
        start: this.currentPage,
      };
      axios({
        url: "https://saas.jecinfo.com/gateway/api-device/DeviceLog/pageList",
        method: "get",
        params: obj,
      }).then((res) => {
          console.log(res);

        if (res.status === 200) {
          this.list = res.data.data;
          this.recordsFiltered = res.data.recordsFiltered;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.equipment {
  width: 100%;
  height: 100%;
  position: relative;
  p {
    margin: 0;
    font-size: 23px;
    padding: 10px 0;
    font-weight: 700;
  }
}
.foot {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.dialog-footer {
  margin-top: 20px;
}
.inputso {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  .so {
    height: 100%;
    display: flex;
    align-items: center;
    input {
      margin: 0 10px;
    }
  }
}
</style>