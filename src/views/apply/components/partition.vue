<template>
  <div class="partition">
    <p>分区管理</p>
    <div style="float: right;padding:10px 0;">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div>
    <!-- <el-table :data="list" style="width: 100%">
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DMA分区名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="online(scope.row)">在线编辑</el-button>
          <el-button type="text" size="small" @click="deletes(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="amend(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        v-for="(item,index) in tableList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="mini"
            v-if="!scope.row.date"
          >编辑</el-button>
          <el-button
            @click="downloadImg(scope.row)"
            type="text"
            style="color: red;"
            size="small"
            v-if="scope.row.id!==1"
          >删除</el-button>
          <el-button
            @click="moveUpdata(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.id!==1"
          >上移</el-button>
          <el-button
            @click="moveDowndata(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.id!==1"
          >下移</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDmaTree, move, deleteDmaInfoById } from "@/api/partition";
export default {
  data() {
    return {
      tableList: [
        {
          label: "DMA分区名称",
          prop: "name",
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    //获取数据
    getlist() {
      getDmaTree().then((res) => {
        console.log(res.datas);
        this.list = res.datas;
      });
    },
    handleAdd() {
      this.$router.push({ path: "/app/add" });
    },
    handleClick(val) {
      console.log(val);
    },
    //删除
    downloadImg(val) {
      let obj = {
        id: val.id
      };
      deleteDmaInfoById(val.id).then((res) => {
        console.log(res);
        if(res.resp_code === 0){
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          this.getlist();
        }
      });
    },
    //上移数据
    moveUpdata(val) {
      let obj = {
        id: val.id,
        up: 0,
      };
      move(obj).then((res) => {
        if (res.resp_code === 0) {
          this.$notify({
            title: "成功",
            message: "上移成功",
            type: "success",
            duration: 2000,
          });
          this.getlist();
        }
      });
    },
    //下移数据
    moveDowndata(val) {
      let obj = {
        id: val.id,
        up: 1,
      };
      move(obj).then((res) => {
        console.log(res);
        if (res.resp_code === 0) {
          this.$notify({
            title: "成功",
            message: "下移成功",
            type: "success",
            duration: 2000,
          });
          this.getlist();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.partition {
  width: 100%;
  height: 100%;
  p {
    margin: 0;
    font-size: 23px;
    padding: 10px 0;
    font-weight: 700;
  }
}
</style>