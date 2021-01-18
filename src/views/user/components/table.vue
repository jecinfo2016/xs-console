<template>
  <content-table
    :list="list"
    :current-page="page.currentPage"
    :total="page.total"
    @currentChange="currentChange"
  >
    <template v-slot:table-column>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      />
      <el-table-column
        prop="number"
        label="用户编号"
        align="center"
        width="100"
      />
      <el-table-column
        prop="account"
        label="注册账号"
        align="center"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="手机号码"
        align="center"
        width="130"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="联系人姓名"
        align="center"
        width="120"
      />
      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="app"
        label="下属应用"
        align="center"
        width="80"
      />
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="80"
      >
        <template slot-scope="{ row }">
          <el-tag v-show="row.status === 0" type="success">启用</el-tag>
          <el-tag v-show="row.status === 1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="{ row }">
          <el-button type="text">重置密码</el-button>
          <el-button v-show="row.status === 1" type="text">启用</el-button>
          <el-button v-show="row.status === 0" type="text">禁用</el-button>
        </template>
      </el-table-column>
    </template>
  </content-table>
</template>

<script>
import bus from '@/utils/bus.js'
import ContentTable from '@/components/Content/table'
import { getList } from '@/api/User/index'

export default {
  components: { ContentTable },
  data() {
    return {
      list: [],
      page: {
        currentPage: 1,
        total: 0
      }
    }
  },
  created() {
    this.getData()
    this.onSearch()
  },
  beforeDestroy() {
    bus.$off('search')
  },
  methods: {
    getData() {
      getList().then(res => {
        this.list = res.data
        this.page.total = res.count
      })
    },
    currentChange(page) {
      this.page.currentPage = page
    },
    onSearch() {
      bus.$on('search', res => {
        console.log(res)
      })
    }
  }
}
</script>
