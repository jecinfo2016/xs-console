<template>
  <div class="equipment">
    <div class="inputso">
      <div class="so">
        <!-- <el-form :inline="true" size="mini" style="margin-bottom: -18px;">
          <el-form-item label="" prop="deviceName">
            <el-input v-model="search.deviceName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="handleFilter" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right"></el-form-item>
        </el-form>-->
      </div>
      <div style="float: right;padding:10px 0;">
        <el-button type="primary" @click="handleAdd">添加水利模型</el-button>
      </div>
    </div>

    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属小区">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dma_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="水利模型文件">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.epnaet_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基准点1坐标">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.node1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基准点1经纬度">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gaude1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基准点2坐标">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.node2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基准点2经纬度">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gaude2 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                align="center"
                style="color:#409eff"
                @click.native="apparatus(scope.row)"
              >节点设备关联</el-dropdown-item>
              <el-dropdown-item
                align="center"
                style="color:#409eff"
                @click.native="ampshow(scope.row)"
              >地图显示</el-dropdown-item>
              <el-dropdown-item
                align="center"
                style="color:#409eff"
                @click.native="amend(scope.row)"
              >修改</el-dropdown-item>
              <el-dropdown-item
                align="center"
                style="color:red"
                @click.native="deletes(scope.row)"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增/编辑设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="150px">
        <el-form-item label="设备所属分区" prop="parentId">
          <el-cascader
            v-model="form.parentId"
            :options="options"
            :props="{ checkStrictly: true, value:'id', label:'name', emitPath:false,leaf:'leaf' }"
            style="width:400px;"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="模型文件">
          <el-upload
            ref="uploadExcel"
            action="https://saas.jecinfo.com/gateway/api-developer/epnaet-water/uploadEnactFile"
            :headers="myHeaders"
            :limit="limitNum"
            :auto-upload="false"
            accept=".inp"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
          >
            <el-button size="small" plain>选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="经纬度1" prop="gaude1">
          <el-input v-model="form.gaude1"></el-input>
        </el-form-item>
        <el-form-item label="经纬度2" prop="gaude2">
          <el-input v-model="form.gaude2"></el-input>
        </el-form-item>
        <!-- <svg width="500" height="270">
          <g style="transform: translate(0, 10px)">
            <path :d="line" />
          </g>
        </svg> -->
        <el-form-item label="节点坐标1">
          <div></div>
          <!-- <el-input v-model="form.node1"></el-input> -->
        </el-form-item>
        <el-form-item label="节点坐标2">
          <!-- <el-input v-model="form.node2"></el-input> -->
          <div></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="submit('form')" v-if="bool" icon="el-icon-check">确 定</el-button>
        <el-button type="primary" @click="upda('form')" v-else icon="el-icon-check">修改</el-button>
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
  findWaterModelInfo,
  uploadEnactFile,
  translateEnactInfo,
  deleteBasciWaterInfo,
  findGuidesInfo,
} from "@/api/hydraulic";
import { getDmaTree } from "@/api/partition";
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [2173.08, 6948.72, 5942.31, 7064.1, 8211.54],
      line: "",
      options: [],
      alertDialog: false,
      myHeaders: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      limitNum: 1,
      fileList: [],
      value: "",
      dialogFormVisible: false,
      currentPage: 1, //  初始页
      pagesize: 10, //    每页的数据
      list: [],
      bool: true,
      form: {
        deviceId: null,
        dmaId: null,
        installAddress: null,
        clientId: localStorage.getItem("clientId"),
        gaude1: null,
        gaude2: null,
      },
      rules: {
        parentId: [
          { required: true, message: "请选择设备分区", trigger: "blur" },
        ],
        installAddress: [
          { required: true, message: "请输入设备安装地点", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        gaude1: [{ required: true, message: "请输入经纬度1", trigger: "blur" }],
        gaude2: [{ required: true, message: "请输入经纬度2", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getList();
    getDmaTree().then((res) => {
      if (res.resp_code === 0) {
        this.options = res.datas;
      }
    });
    this.calculatePath();
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, (d) => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y((d) => scale.y(d));
      this.line = path(this.data);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let size = file.size / 1024 / 1024;
      if (size > 10) {
        this.$notify.warning({
          title: "警告",
          message: `文件大小不得超过10M`,
        });
      }

      // http://61.164.218.155:39200/api-developer/epnaet-water/uploadEnactFile
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.$refs.uploadExcel.submit();
    },
    // 文件超出个数限制时的钩子

    exceedFile(files, fileList) {
      this.$notify.warning({
        title: "警告",
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`,
      });
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.form.installAddress = file.response.datas;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`,
      });
    },
    // 文件上传失败时的钩子
    handleError() {
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`,
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    // 节点设备关联
    apparatus(val) {
      console.log(val);
      localStorage.setItem("modelId", val.id);
      this.$router.push({ path: "/app/apply/apparatus" });
    },
    // 地图显示
    ampshow(val) {
      this.$router.push({ path: "/app/apply/ampshow" });
      let obj = {
        modelId: val.id,
      };
      localStorage.setItem("modelId", val.id);
      findGuidesInfo(obj).then((res) => {
        console.log(res);
      });
    },
    // 查询
    handleFilter() {},
    // 获取列表数据
    getList() {
      let obj = {
        clientId: localStorage.getItem("clientId"),
      };
      findWaterModelInfo(obj).then((res) => {
        console.log(res);
        if (res.resp_code === 0) {
          this.list = res.datas;
        }
      });
    },
    // 添加弹框打开
    handleAdd() {
      this.bool = true;
      this.dialogFormVisible = true;
      this.form.parentId = null;
      this.form.gaude1 = null;
      this.form.gaude2 = null;
    },
    // 确定添加
    submit(formName) {
      let obj = {
        clientId: localStorage.getItem("clientId"),
        dmaId: this.form.parentId,
        epnaetAddress: this.form.installAddress,
        node1: "-516.67,7122.22",
        node2: "6950.00,6811.11",
        gaude1: "122.092898,37.519529",
        gaude2: "122.136328,37.523613",
      };
      translateEnactInfo(JSON.stringify(obj)).then((res) => {
        if (res.resp_code === 0) {
          this.getList();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    // 删除
    deletes(val) {
      let obj = {
        fileAddress: val.epnaet_address,
        modelId: val.id,
      };
      deleteBasciWaterInfo(obj).then((res) => {
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
    // 修改弹框打开
    amend(val) {
      this.dialogFormVisible = true;
      this.bool = false;
      console.log(val);
      this.form.parentId = val.dma_id;
      this.form.gaude1 = val.gaude1;
      this.form.gaude2 = val.gaude2;
    },
    // 确定修改
    upda(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          console.log(valid);
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
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
  stroke-width: 3px;
}

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
.side {
  color: #42b983;
  border-right: 2px solid #42b983;
  margin-right: 1px;
  margin: 20px 1px 0 20px;
  cursor: pointer;
}
</style>