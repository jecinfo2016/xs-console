<template>
  <div ref="table" class="table">
    <el-table
      :data="list"
      style="width: 100%"
      :height="isPagination ? height : null"
      :header-cell-style="{ 'background-color': '#f6f6f6', 'padding': '16px 0' }"
      @row-click="getDetails"
    >
      <slot name="table-column" />
    </el-table>
    <div v-show="isPagination" class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="size"
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import Bus from "@/utils/bus.js";

export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: false,
      default: 0
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    size: {
      type: Number,
      required: false,
      default: 20
    },
    offsetBottom: {
      type: Number,
      required: false,
      default: 120
    },
    isPagination: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      height: 100
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeightCalc()
      window.onresize = this.tableHeightCalc()
    })
  },
  methods: {
    getDetails (row) {
      console.log(row)
      localStorage.setItem('clientId',row.id)
      localStorage.setItem('clientName',row.clientId)
      Bus.$emit('getDetails',row)
    },
    tableHeightCalc() {
      this.height = window.innerHeight - this.$refs.table.offsetTop - this.offsetBottom
    },
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  padding-top: 15px;
  text-align: center;
}
.table /deep/ .el-table::before {
    display: none;
}
</style>
