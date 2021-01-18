<template>
  <div class="equipment">
    <p>设备管理</p>
    <div class="inputso">
      <div class="so">
        <el-form :inline="true" size="mini" style="margin-bottom: -18px">
          <el-form-item label="设备类型" prop="devceTypeId">
            <el-select
              v-model="search.devceTypeId"
              placeholder="请选择设备类型"
            >
              <el-option label="全部" :value="null" />
              <el-option
                v-for="item in typeData"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属分区" prop="parentId">
            <el-cascader
              v-model="search.dmaId"
              :options="options"
              :props="{
                checkStrictly: true,
                value: 'id',
                label: 'name',
                emitPath: false,
                leaf: 'leaf',
              }"
              style="width: 400px"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="设备编码" prop="deviceSn">
            <el-input v-model="search.deviceSn"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="search.deviceName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="default"
              @click="handleFilter"
              icon="el-icon-search"
              >搜 索</el-button
            >
          </el-form-item>
          <el-form-item style="float: right"></el-form-item>
        </el-form>
      </div>
      <div style="float: right; padding: 10px 0">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </div>
    </div>

    <el-table
      :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编码">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.device_sn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.device_type_name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分区">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dma_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备上报参数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tags }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装地址">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.install_address }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="amend(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="deletes(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增/编辑设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="150px">
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
              :label="item.name + '(' + item.deviceSn + ')'"
              :value="item.id + '/' + item.deviceSn"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备安装地点" prop="installAddress">
          <el-input v-model="form.installAddress"></el-input>
        </el-form-item>
        <el-form-item label="设备所属分区" prop="parentId">
          <el-cascader
            v-model="form.dmaId"
            :options="options"
            :props="{
              checkStrictly: true,
              value: 'id',
              label: 'name',
              emitPath: false,
              leaf: 'leaf',
            }"
            style="width: 400px"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">取 消</el-button>
        <el-button
          type="primary"
          @click="submit('form')"
          v-if="bool"
          icon="el-icon-check"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="upda('form')"
          v-else
          icon="el-icon-check"
          >修改</el-button
        >
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
import {
  queryDevDeviceInfo,
  queryDeviceInfoList,
  deleteDeviceRelationInfo,
  addDevDeviceInfo,
  queryDeviceTypeInfo,
  updateDeviceRelationInfo,
} from "@/api/equipment";
import { getDmaTree } from "@/api/partition";

import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      currentPage: 1, //  初始页
      pagesize: 10, //    每页的数据
      list: [],
      bool: true,
      typeData: [],
      options: [],
      listQuery: {},
      clientId: localStorage.getItem("clientId"),
      search: {
        devceTypeId: null,
        dmaId: null,
        deviceSn: null,
        deviceName: null,
        clientId: localStorage.getItem("clientId"),
      },
      device: [], //设备类型
      form: {
        deviceId: null,
        dmaId: null,
        installAddress: null,
        clientId: localStorage.getItem("clientId"),
        appId: localStorage.getItem("clientName"),
        deviceSn: null,
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
    // 获取添加设备
    queryDeviceInfoList().then((res) => {
      if (res.resp_code === 0) {
        this.device = res.datas;
      }
    });
    // 获取搜索设备类型
    queryDeviceTypeInfo().then((res) => {
      if (res.resp_code === 0) {
        this.typeData = res.datas;
      }
    });
    getDmaTree().then((res) => {
      if (res.resp_code === 0) {
        this.options = res.datas;
      }
      console.log(res.datas);
    });
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); // 每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); // 点击第几页
    },
    dataFilter(val) {
      let reg = /^[u4E00-u9FA5]+$/;
      if (!reg.test(val)) {
        let obj = {
          clientId: localStorage.getItem("clientId"),
          deviceName: val,
        };
        queryDeviceInfoList(obj).then((res) => {
          if (res.resp_code === 0) {
            this.device = res.datas;
          }
        });
      } else {
        let obj = {
          clientId: localStorage.getItem("clientId"),
          deviceSn: val,
        };
        queryDeviceInfoList(obj).then((res) => {
          if (res.resp_code === 0) {
            this.device = res.datas;
          }
        });
      }
    },
    // 查询
    handleFilter() {
      queryDevDeviceInfo(this.search).then((res) => {
        if (res.resp_code === 0) {
          this.list = res.datas.data;
        }
        console.log(res);
      });
    },
    // 获取列表数据
    getList() {
      let obj = {
        clientId: localStorage.getItem("clientId"),
      };
      queryDevDeviceInfo(obj).then((res) => {
        if (res.resp_code === 0) {
          this.list = res.datas.data;
        }
        console.log(res);
      });
    },
    // 添加弹框打开
    handleAdd() {
      this.bool = true;
      this.form.deviceId = null;
      this.form.dmaId = null;
      this.form.installAddress = null;
      this.dialogFormVisible = true;
    },
    // 确定添加
    submit(formName) {
      let obj = {
        appId:this.form.appId,
        deviceId: this.form.deviceId.split("/")[0],
        deviceSn: this.form.deviceId.split("/")[1],
        installAddress: this.form.installAddress,
        dmaId: this.form.dmaId,
        clientId: this.form.clientId,
      };
      // console.log(this.form,'------');
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          addDevDeviceInfo(obj).then((res) => {
            if (res.resp_code === 0) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$notify.error({
                title: "失败",
                message: "添加失败",
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
        relationId: val.id,
        appId:this.form.appId,
        deviceSn:val.device_sn
      };
      deleteDeviceRelationInfo(obj).then((res) => {
        if (res.resp_code === 0) {
          this.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: "删除失败",
          });
        }
      });
    },
    // 修改弹框打开
    amend(val) {
      console.log(val);
      this.idd = val.id;
      this.form.deviceId = val.device_name + "(" + val.device_sn + ")";
      this.form.dmaId = val.dmaId;
      this.form.installAddress = val.install_address;
      this.dialogFormVisible = true;
      this.bool = false;
    },                                                                                                                                                                                                                  
    // 确定修改
    upda(formName) {
      let obj = {
        id: this.idd,
        installAddress: this.form.installAddress,
        dmaId: this.form.dmaId,
      };
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          updateDeviceRelationInfo(obj).then((res) => {
            if (res.resp_code === 0) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$notify.error({
                title: "失败",
                message: "修改失败",
              });
            }
          });
        } else {
          return false;
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