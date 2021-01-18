<template>
  <el-collapse-item :name="id" class="item mb20">
    <template slot="title">
      <div class="header clearfix">
        <div class="left fl">
          <i class="el-icon-menu" />
          <span class="title ml20">
            {{ title }}
          </span>
          <span class="create-time ml20">
            {{ createTime }}
            <i v-show="createTime">创建</i>
          </span>
        </div>
        <div class="right fr">
          <slot name="btns" />
        </div>
      </div>
    </template>
    <slot name="content" />
  </el-collapse-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    createTime: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  flex: 1;
  margin-right: 40px;
}
.el-icon-menu {
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #409EFF;
}
.title {
  font-weight: bold;
  font-size: 16px;
}
.create-time {
  color: #777;
}
.item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  & >>> .el-collapse-item__header {
    height: 66px;
    padding: 0 20px;
  }
  & >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
