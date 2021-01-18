<template>
  <div id="amap-container">
    <div class="back">
      <el-button type="text" @click="back()">《 返回</el-button>
    </div>
    <el-form label-position="right" label-width="180px" :model="form" :rules="rules" ref="form">
      <el-form-item label="选择上级节点" prop="parentId">
        <el-cascader
          v-model="form.parentId"
          :options="options"
          :props="{ checkStrictly: true, value:'id', label:'name', emitPath:false,leaf:'leaf' }"
          style="width:400px;"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="DMA小区名称" prop="name">
        <el-input v-model="form.name" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="绘制DMA范围" prop="nodes">
        <input type="hidden" v-model="form.nodes" />
        <div class="map-container">
          <div id="custom-amap" />
          <div class="toolbar">
            <span class="brush" @click="drawPolygon()">画笔</span>
            <span class="cancel" @click="cancel()">撤销</span>
          </div>
          <div class="searchbar">
            <el-input id="tipinput" v-model="searchValue"></el-input>
            <el-button type="primary" @click="searchAddress();">搜索</el-button>
          </div>
        </div>
        <p>点击画笔开始绘制分区，双击鼠标结束绘制</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDmaTree, addsave } from "@/api/partition";
import loginVue from "../../../../../开发者平台/xs-bigdata/src/layout/Dialog/login.vue";

export default {
  name: "AMap",
  props: {
    defaultValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      options: [],
      areaList: [],
      form: {
        areaId: "",
        centerLnglat: "",
        name: "",
      },
      rules: {
        parentId: [{ required: true, message: "请选择上级节点" }],
        name: [
          { required: true, message: "请输入DMA小区名称", trigger: "blur" },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      AMap: null,
      mouseTool: null,
      placeSearch: null,
      searchValue: "",
    };
  },
  watch: {
    defaultValue() {
      this.searchValue = this.defaultValue;
    },
  },
  mounted() {
    // 初始化地图页面
    this.mapInit();
    this.getDmaList();
  },
  beforeDestroy() {
    // 销毁地图
    this.AMap.destroy();
  },
  methods: {
    getDmaList() {
      getDmaTree().then((res) => {
        if (res.resp_code === 0) {
          this.options = res.datas;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.form.parentId = null;
      this.form.name = null;
      this.$refs[formName].resetFields();
    },
    // 提交
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.nodes = JSON.stringify(this.form.nodes);
          addsave(this.form).then((res) => {
            console.log(res);
            if (res.resp_code === 0) {
              this.$message.success("保存成功");
              this.$router.push("/app/apply/partition");
            } else {
              console.log("保存失败!!");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 初始化地图页面
    mapInit() {
      const self = this;
      this.AMap = new AMap.Map("custom-amap", {
        resizeEnable: true,
        // mapStyle: "amap://styles/35b1e7844239e05823ef4e6ac7d596c6", //设置地图的显示样式
        center: [120.781002, 30.76322], //嘉兴市
        zoom: 13.5,
      });
      AMap.service(["AMap.PlaceSearch"], function () {
        //构造地点查询类
        self.placeSearch = new AMap.PlaceSearch({
          // pageSize: 5, // 单页显示结果条数
          // pageIndex: 1, // 页码
          city: "嘉兴市",
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: self.AMap, // 展现结果的地图实例
          // panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          renderStyle: "default",
        });
      });
      // 添加列表点选监听事件
      // AMap.event.addListener(self.placeSearch, "selectChanged", self.selectAddress);
    },
    drawPolygon() {
      const self = this;
      this.mouseTool = new AMap.MouseTool(this.AMap);
      this.mouseTool.polygon({
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.2,
        fillColor: "#1791fc",
        fillOpacity: 0.4,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [30,10],
      });

      this.mouseTool.on("draw", function (event) {
        const arr = event.obj.getPath(),
          pathArr = [];
        for (let i = 0; i < arr.length; i++) {
          pathArr.push(arr[i].lng + "," + arr[i].lat);
        }
        self.form.nodes = pathArr;
      });
    },
    searchAddress() {
      //关键字查询
      this.placeSearch.search(this.searchValue);
    },
    selectAddress(e) {
      //这里获得点选地点的经纬度
      let location = e.selected.data.location;
      console.log(loginVue);
      // Do Something
    },
    cancel() {
      this.AMap.clearMap();
    },
    back() {
      this.$router.push("/app/apply/partition");
    },
  },
};
</script>

<style lang="scss">
#amap-container {
  .el-input__clear {
    line-height: 34px;
    // top: 20px;
  }
  .back {
    margin-bottom: 10px;
  }
  #custom-amap {
    height: 450px;
    width: 100%;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
  .input-with {
    // position: fixed;
    // top: 40px;
    z-index: 1;
    width: 580px;
  }
  .address {
    color: #373737;
  }
}
.amap-sug-result {
  z-index: 99999;
}
.dma-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.panel {
  flex-grow: 1;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 6px 1px #acacac;
}
.back {
  margin-bottom: 10px;
}
.map-container {
  width: 800px;
  height: 450px;
  position: relative;
  .searchbar {
    position: absolute;
    top: 10px;
    right: 10px;
    .el-input {
      width: 220px;
      margin-right: 10px;
    }
  }
  .toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px 0px;
    box-shadow: 0px 0px 10px #cdcdcd;
    span {
      padding: 28px 10px 0px;
      line-height: 16px;
      display: inline-block;
      cursor: pointer;
    }
    .brush {
      background: url("~@/assets/images/pancel.png") no-repeat;
      background-position: center top;
      color: #009cff;
    }
    .cancel {
      background: url("~@/assets/images/cancel.png") no-repeat;
      background-position: center top;
      color: #c0c7cc;
    }
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 80px;
    right: 10px;
    width: 280px;
  }
}
</style>