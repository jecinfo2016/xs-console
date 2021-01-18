<template>
  <div class="equipment">
    <div class="inputso">
      <div class="so"></div>
      <div style="float: right;padding:10px 0;">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <el-button type="text" @click="back()">《 返回</el-button>
    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属小区">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dmaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点编码">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.deviceSn }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="color:red" @click="deletes(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="水利模型添加设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="150px">
        <el-form-item label="节点编码">
          <div>{{bain}}</div>
        </el-form-item>
        <el-form-item label="选择设备" prop="deviceId">
          <el-select
            v-model="form.deviceId"
            :filter-method="dataFilter"
            filterable
            allow-create
            placeholder="请选择设备"
          >
            <el-option
              v-for="item in device"
              :key="item.id"
              :label="item.name+'('+item.deviceSn+')'"
              :value="item.deviceSn"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="submit('form')" icon="el-icon-check">确 定</el-button>
      </div>
    </el-dialog>
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
import { listByModelId, save, deleteById } from "@/api/apparatus";
import { queryDeviceInfoList } from "@/api/equipment";
import { getDmaTree } from "@/api/partition";
import axios from "axios";
export default {
  data() {
    return {
      device: [],
      value: "",
      dialogFormVisible: false,
      currentPage: 1, //  初始页
      pagesize: 10, //    每页的数据
      list: [],
      bain: localStorage.getItem("modelId"),
      form: {
        deviceId: null,
        dmaId: null,
        installAddress: null,
        clientId: 1,
      },
      rules: {
        deviceId: [{ required: true, message: "请选择设备", trigger: "blur" }],
        installAddress: [
          { required: true, message: "请输入设备安装地点", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    queryDeviceInfoList().then((res) => {
      if (res.resp_code === 0) {
        this.device = res.datas;
      }
    });
  },
  methods: {
    dataFilter(val) {
      let reg = /^[u4E00-u9FA5]+$/;
      if (!reg.test(val)) {
        let obj = {
          clientId: 1,
          deviceName: val,
        };
        queryDeviceInfoList(obj).then((res) => {
          if (res.resp_code === 0) {
            this.device = res.datas;
          }
        });
      } else {
        let obj = {
          clientId: 1,
          deviceSn: val,
        };
        queryDeviceInfoList(obj).then((res) => {
          if (res.resp_code === 0) {
            this.device = res.datas;
          }
        });
      }
    },
    // 返回
    back() {
      this.$router.push("/app/apply/hydraulic");
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
    // 获取列表数据
    getList() {
      let obj = {
        modelId: localStorage.getItem("modelId"),
      };
      listByModelId(obj).then((res) => {
        console.log(res);
        if (res.resp_code === 0) {
          this.list = res.datas;
        }
      });
    },
    // 添加弹框打开
    handleAdd() {
      this.dialogFormVisible = true;
      this.form.deviceId = null;
    },
    // 确定添加
    submit(formName) {
      console.log(this.form);
      let obj = {
        modelId: this.bain,
        nodeId: this.bain,
        deviceSn: this.form.deviceId,
      };
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          save(obj).then((res) => {
            if (res.resp_code === 0) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "保存成功",
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
    // 删除
    deletes(val) {
      let obj = {
        id: val.id,
      };
      deleteById(obj).then((res) => {
        if (res.resp_code === 0) {
          this.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    // 弹框关闭
    onCancel() {
      this.dialogFormVisible = false;
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