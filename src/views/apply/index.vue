<template>
  <el-container>
    <el-header>{{clientName}}应用</el-header>
    <div :v-model="name"></div>
    <el-container>
      <el-aside width="200px">
        <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Bus from "@/utils/bus.js";

export default {
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      data: null,
      message: "123",
      clientName: null,
      name: "",
      data: [
        {
          label: "分区管理",
          path: "/app/apply/partition",
        },
        {
          label: "设备管理",
          path: "/app/apply/equipment",
        },
        {
          label: "数据任务管理",
          path: "/app/apply/datatask",
        },
        {
          label: "任务执行情况",
          path: "/app/apply/taskexecute",
        },
        {
          label: "水利模型",
          path: "/app/apply/hydraulic",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  beforeDestroy() {
    // Bus.$off("msg");
  },
  created() {
    this.clientName = localStorage.getItem("clientName");
    let self = this;
    Bus.$on("getDetails", (e) => {
      // self.message = e;
      console.log(e.clientId, "------");
      this.name = e.clientId;
      localStorage.setItem("name", e.clientId);
    });
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data.path);
      // this.$router.push({
      //   name:'detail',
      //   params:{id: data.path}
      // });
      this.$router.push({ path: data.path });
    },
    aaaa() {
      console.log(this.message);
    },
    gotoDetail(id) {},
  },
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-tree {
  height: 100%;
}
.el-tree-node__label {
  font-size: 18px;
}
.el-tree-node__content {
  padding: 25px 0;
}
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  line-height: 60px;
  background: #333;
}

.el-aside {
  color: #333;
  text-align: center;
  padding-top: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-top: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
