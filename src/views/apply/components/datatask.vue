<template>
  <div class="datatask">
    <p>数据任务管理</p>
    <div class="inputso">
      <div class="so">
        <el-form :inline="true" style="margin-bottom: -18px;">
          <el-form-item label prop="deviceName">
            <el-input v-model="search.deviceName" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="handleFilter" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right"></el-form-item>
        </el-form>
      </div>
      <div style="float: right;padding:10px 0;">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.task_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.task_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CRON">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cron_str }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="统计字段">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tag_content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编码" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.equipment_sns }}</span>
        </template>
      </el-table-column>
      <el-table-column label="聚合方式">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.aggregator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="聚合周期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.downsample_time}}</span>
          <span>{{ scope.row.downsample_unit | downsampleUunit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="统计开始时间" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.start_time | startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            :key="scope.row.id"
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.flag"
            @change="statusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="examine(scope.row)">查看数据</el-button>
          <el-button type="text" size="small" @click="amend(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deletes(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增/编辑设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="150px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="taskDesc">
          <el-input v-model="form.taskDesc"></el-input>
        </el-form-item>
        <el-form-item label="CRON" prop="cronStr">
          <el-popover v-model="form.cronStr">
            <el-input
              slot="reference"
              @click="cronPopover=true"
              v-model="cron"
              placeholder="请输入定时策略"
              style="width: 40% ;"
            ></el-input>
            <cron @change="changeCron" @click="cronPopover=false" i18n="cn"></cron>
          </el-popover>
        </el-form-item>

        <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" filterable allow-create placeholder="请选择设备">
            <el-option
              v-for="item in deviceType"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计字段" prop="equipmentTag">
          <el-select v-model="form.equipmentTag" filterable allow-create placeholder="请选择统计字段">
            <el-option
              v-for="item in equipmentTag"
              :key="item.tagIndex"
              :label="item.tagContent"
              :value="item.tagIndex"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编码">
          <el-select
            v-model="form.equipmentSns"
            multiple
            filterable
            allow-create
            placeholder="请选择设备编码"
          >
            <el-option
              v-for="item in equipmentSns"
              :key="item.deviceSn"
              :label="item.deviceSn"
              :value="item.deviceSn"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="聚合方式" prop="aggregator">
          <el-select v-model="form.aggregator" filterable allow-create placeholder="请选择聚合方式">
            <el-option v-for="item in aggregator" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="聚合周期" prop="downsampleTime">
          <el-input v-model.number="form.downsampleTime"></el-input>
        </el-form-item>
        <el-form-item label="聚合单位">
          <el-select v-model="form.downsampleUnit" placeholder="请选择聚合单位">
            <el-option
              v-for="item in downsampleUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计开始时间" prop="startTime">
          <div class="block">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="submit('form')" v-if="bool" icon="el-icon-check">确 定</el-button>
        <el-button type="primary" @click="upda('form')" v-else icon="el-icon-check">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryDeviceTaskList,
  getEquipmentTsdbTypes,
  getEquipmentTsdbTags,
  getDeviceInfoList,
  getAggregators,
  addDeviceTask,
  deleteTaskInfo,
  updateTaskInfo,
  updateTaskFlag,
} from "@/api/datatask";
import axios from "axios";
import { cron } from "vue-cron";
export default {
  components: { cron },
  data() {
    return {
      cronPopover: false,
      cron: "",
      clientId: localStorage.getItem("clientId"),
      list: [],
      deviceType: [],
      equipmentTag: [],
      equipmentSns: [],
      aggregator: [],
      startTime: "",
      bool: true,
      downsampleUnit: [
        {
          value: "m",
          label: "分钟",
        },
        {
          value: "h",
          label: "小时",
        },
        {
          value: "d",
          label: "天",
        },
      ],
      dialogFormVisible: false,
      search: {
        deviceName: null,
      },
      form: {
        taskName: null,
        taskDesc: null,
        cronStr: null,
        deviceType: null,
        equipmentTag: null,
        equipmentSns: null,
        aggregator: null,
        downsampleTime: null,
        downsampleUnit: null,
        startTime: null,
        clientId: localStorage.getItem("clientId"),
      },
      value3: null,
      rules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        taskDesc: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
        ],
        cronStr: [{ required: true, message: "请输入CRON", trigger: "blur" }],
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "blur" },
        ],
        equipmentTag: [
          { required: true, message: "请选择统计字段", trigger: "blur" },
        ],
        aggregator: [
          { required: true, message: "请选择聚合方式", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        downsampleTime: [{ type: "number", message: "聚合周期必须为数字" }],
      },
    };
  },
  filters: {
    downsampleUunit(val) {
      if (val == "m") {
        return "分钟";
      } else if (val == "d") {
        return "天";
      } else if (val == "h") {
        return "小时";
      }
    },
    startTime(str) {
      var n = parseInt(str) * 1000;
      var D = new Date(n);
      var year = D.getFullYear(); //四位数年份

      var month = D.getMonth() + 1; //月份(0-11),0为一月份
      month = month < 10 ? "0" + month : month;

      var day = D.getDate(); //月的某一天(1-31)
      day = day < 10 ? "0" + day : day;

      var hours = D.getHours(); //小时(0-23)
      hours = hours < 10 ? "0" + hours : hours;

      var minutes = D.getMinutes(); //分钟(0-59)
      minutes = minutes < 10 ? "0" + minutes : minutes;

      var seconds = D.getSeconds(); //秒(0-59)
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // var week = D.getDay();//周几(0-6),0为周日
      // var weekArr = ['周日','周一','周二','周三','周四','周五','周六'];

      var now_time =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return now_time;
    },
  },
  mounted() {
    this.getlist();
    getEquipmentTsdbTypes().then((res) => {
      if (res.resp_code === 0) {
        this.deviceType = res.datas;
      }
    });
    getAggregators().then((res) => {
      console.log(res);
      if (res.resp_code === 0) {
        this.aggregator = res.datas;
      }
    });
  },
  watch: {
    "form.deviceType"(val) {
      console.log(val, " qw");
      let tag = { deviceType: val };
      getEquipmentTsdbTags(tag).then((res) => {
        if (res.resp_code === 0) {
          this.equipmentTag = res.datas;
        }
      });
      getDeviceInfoList(tag).then((res) => {
        if (res.resp_code === 0) {
          this.equipmentSns = res.datas;
        }
      });
    },
  },
  methods: {
    changeCron(val) {
      this.cron = val;
    },
    // 状态修改
    statusChange(data) {
      if (data.flag == true) {
        let obj = {
          flag: 1,
          taskId: data.id,
        };
        updateTaskFlag(obj).then((res) => {
          console.log(res);
        });
        console.log(obj, "------");
      } else {
        let obj = {
          flag: 0,
          taskId: data.id,
        };
        updateTaskFlag(obj).then((res) => {
          console.log(res);
        });
        console.log(obj, "------");
      }
      console.log(data, "------");
    },
    getlist() {
      let obj = {
        clientId: localStorage.getItem("clientId"),
      };
      queryDeviceTaskList(obj).then((res) => {
        // console.log(res, "------");
        if (res.resp_code === 0) {
          let datas = res.datas;
          this.list = datas;
        }
      });
    },
    // 查看数据
    examine(val) {
      localStorage.setItem("jobInfoId", val.job_info_id);
      this.$router.push({ path: "/app/apply/examine" });
    },
    // 打开修改模态框
    amend(val) {
      this.dialogFormVisible = true;
      this.bool = false;
      this.form.taskName = val.task_name;
      this.form.taskDesc = val.task_desc;
      this.cron = val.cron_str;
      this.form.deviceType = val.device_type_name;
      this.form.equipmentTag = val.equipment_tag;
      this.form.equipmentSns = val.equipment_sns.split("|");
      this.form.aggregator = val.aggregator;
      this.form.downsampleTime = val.downsample_time;
      this.form.downsampleUnit = val.downsample_unit;
      this.form.startTime = Date(parseInt(val.start_time) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
      this.jobInfoId = val.job_info_id;
      this.ID = val.id;
    },
    upda(formName) {
      let obj = {
        taskName: this.form.taskName,
        taskDesc: this.form.taskDesc,
        cronStr: this.cron,
        deviceType: this.form.deviceType,
        equipmentTag: this.form.equipmentTag,
        equipmentSns: this.form.equipmentSns.join("|"),
        aggregator: this.form.aggregator,
        downsampleTime: this.form.downsampleTime,
        downsampleUnit: this.form.downsampleUnit,
        startTime: this.form.startTime.getTime(),
        clientId: localStorage.getItem("clientId"),
        jobInfoId: this.jobInfoId,
        id: this.ID,
      };
      // console.log(this.form);
      updateTaskInfo(JSON.stringify(obj)).then((res) => {
        console.log(res);
      });
      // const set = this.$refs;
      // set[formName].validate((valid) => {
      //   if (valid) {

      //   } else {
      //     return false;
      //   }
      // });
    },
    // 关闭模态框
    onCancel() {
      this.dialogFormVisible = false;
      this.bool = true;
    },
    // 查询
    handleFilter() {
      let obj = {
        clientId: localStorage.getItem("clientId"),
        aggregator: this.search.deviceName,
      };
      queryDeviceTaskList(obj).then((res) => {
        if (res.resp_code === 0) {
          this.list = res.datas;
          console.log(res.datas, "-----");
        }
      });
    },
    // 添加
    handleAdd() {
      this.dialogFormVisible = true;
      this.bool = true;
    },
    // 删除
    deletes(val) {
      console.log(val);
      let obj = {
        id: val.id,
        jobInfoId: val.job_info_id,
      };
      deleteTaskInfo(obj).then((res) => {
        console.log(res);
        this.getlist();
      });
    },
    // 添加
    submit(formName) {
      let obj = {
        taskName: this.form.taskName,
        taskDesc: this.form.taskDesc,
        cronStr: this.cron,
        deviceType: this.form.deviceType,
        equipmentTag: this.form.equipmentTag,
        equipmentSns: this.form.equipmentSns.join("|"),
        aggregator: this.form.aggregator,
        downsampleTime: this.form.downsampleTime,
        downsampleUnit: this.form.downsampleUnit,
        startTime: this.form.startTime.getTime(),
        clientId: localStorage.getItem("clientId"),
      };
      console.log(obj);
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          addDeviceTask(JSON.stringify(obj)).then((res) => {
            if (res.resp_code === 0) {
              this.dialogFormVisible = false;
              this.getlist();
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.datatask {
  width: 100%;
  height: 100%;
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