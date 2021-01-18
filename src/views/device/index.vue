<template>
  <div>
    <div class="display-flex mt20">
      <el-button class="ml20" type="primary">查询</el-button>
      <el-button class="ml20" type="success">新增</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="searchInfo.listLoading"
        :data="resultInfo.dataList"
        border
        height="calc(100vh - 200px)"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备编号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备名称">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备类型">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="生产厂商">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="生产日期">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商联系人">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商联系电话">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备位置">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="安装图片">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备维护人">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="维护人电话">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属应用">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备型号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备序列号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备状态">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供电方式">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电量预警">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建用户">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column><el-table-column align="center" label="更新人">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
            <el-popconfirm
              :title="scope.row.status"
              @onConfirm="handleClick(scope.row)"
            >
              <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="block mt15">
        <el-pagination
          :current-page="searchInfo.pageIndex"
          :page-sizes="[10, 20, 30, 40,50]"
          :page-size="searchInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resultInfo.count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  data() {
    return {
      searchInfo: {
        pageIndex: 1,
        pageSize: 10,
        name: '',
        phonenumber: '',
        listLoading: true
      },
      resultInfo: {
        head: ['title', 'author', 'pageviews', 'status', 'display_time', 'pageviews', 'pageviews', 'status'],
        dataList: [],
        count: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.searchInfo.listLoading = true
      getList().then(response => {
        this.resultInfo.dataList = response.data.items
        this.resultInfo.count = response.data.items.length || 0
        this.searchInfo.listLoading = false
      })
    },
    handleClick(val) {
      console.log(val)
    },
    // 跳转页数
    handleCurrentChange(val) {
      console.log(val)
    },
    // 修改每页条数
    handleSizeChange() {

    }
  }
}
</script>
