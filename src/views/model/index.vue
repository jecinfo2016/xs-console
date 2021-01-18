<template>
  <div>
    <div class="display-flex mt20">
      <el-button class="ml20" type="primary">查询</el-button>
      <el-button class="ml20" type="success" @click="addeditDialog(1)">新增</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
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
        <el-table-column align="center" label="模型编号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="模型名称">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="模型类型">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属应用">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建人">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新人">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleClick(scope.row)"
            >
              <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
            </el-popconfirm>
            <el-popconfirm
              :title="scope.row.status"
              @onConfirm="handleClick(scope.row)"
            >
              <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row)">预览</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="模型名称">
          <el-input v-model="addeditInfo.name" />
        </el-form-item>
        <el-form-item label="模型类型">
          <el-input v-model="addeditInfo.name" />
        </el-form-item>
        <el-form-item label="所属应用">
          <el-input v-model="addeditInfo.name" />
        </el-form-item>
        <el-upload
          ref="inp"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          accept=".inp"
          :limit="1"
          :before-upload="beforeupload"
          :on-exceed="onexceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">导入inp格式文件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
        phonenumber: ''
      },
      dialogVisible: false,
      listLoading: true,
      fileList: [],
      resultInfo: {
        head: ['title', 'author', 'pageviews', 'status', 'display_time', 'pageviews', 'pageviews', 'status'],
        dataList: [],
        count: 0
      },
      addeditInfo: {
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    beforeupload(file) {
      //   if()
      console.log(file)
    },
    onexceed(files, fileList) {
      this.$set(fileList[0], 'raw', files[0])
      this.$set(fileList[0], 'name', files[0].name)
      this.$refs['inp'].clearFiles() // 清除文件
      this.$refs['inp'].handleStart(files[0]) // 选择文件后的赋值方法
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.resultInfo.dataList = response.data.items
        this.resultInfo.count = response.data.items.length || 0
        this.listLoading = false
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

    },
    addeditDialog(flag, item) {
      this.dialogVisible = true
    }
  }
}
</script>
