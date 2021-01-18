<template>
  <content-table :list="list" :is-pagination="false">
    <template v-slot:table-column>
      <el-table></el-table>
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="clientId" label="应用名称" align="center" width="260" />
      <el-table-column prop="clientSecretStr" label="应用密钥" align="center" width="260" />
      <el-table-column prop="webServerRedirectUri" label="回调地址" align="center" width="150" />
      <el-table-column
        prop="authorizedGrantTypes"
        label="oauth授权方式"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="status" label="状态" align="center" width="80">
        <template slot-scope="{ row }">
          <el-tag v-if="row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{ row }">
          <el-button type="text" @click="editClient(row)">编辑</el-button>
          <el-button type="text" @click="deleteClient(row)">删除</el-button>
          <el-button type="text" @click="getDetails(row)">查看</el-button>
          <el-button v-show="!row.status" type="text" @click="statusClient(row, true)">启用</el-button>
          <el-button v-show="row.status" type="text" @click="statusClient(row, false)">禁用</el-button>
        </template>
      </el-table-column>
    </template>
  </content-table>
</template>

<script>
import bus from "@/utils/bus.js";
import ContentTable from "@/components/Content/table";
import { deleteClient, editClient } from "@/api/app";

export default {
  components: { ContentTable },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //     getDetails(row){
    //       // console.log(row,'123') //此时就能拿到整行的信息\
    //       bus.$emit('getDetails')
    // 　　},
    editClient(data) {
      this.$emit("editClient", data);
      console.log(data);
    },
    getDetails() {
      this.$router.push({ path: "/app/apply" });
    },
    deleteClient({ id, clientId }) {
      this.$confirm(`确认删除应用：${clientId}？`, "提示", {
        type: "warning",
      })
        .then((_) => {
          deleteClient(id).then((res) => {
            this.$message.success("删除成功");
            bus.$emit("refreshClient");
          });
        })
        .catch((_) => {});
    },
    statusClient({ id, clientSecretStr }, status) {
      const params = { id, clientSecretStr, status };
      editClient(params).then((res) => {
        const message = status ? "应用启动成功" : "应用禁用成功";
        this.$message.success(message);
        bus.$emit("refreshClient");
      });
    },
  },
};
</script>
