<template>
  <div class="dialog-container">
    <div class="dialog-content" :style="{ width: width }">
      <div v-show="title" class="title">{{ title }}</div>
      <div class="close" @click="close">
        <i class="el-icon-circle-close" />
      </div>
      <div class="content">
        <slot name="content" />
      </div>
    </div>
    <div class="mask" @click="close" />
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: '800px'
    }
  },
  methods: {
    close() {
      console.log(1)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">

.dialog-container {
  .dialog-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    min-height: 200px;
    z-index: 11;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .title {
      font-size: 18px;
      font-weight: bold;
      line-height: 48px;
      height: 48px;
      text-align: center;
    }
    .close {
      color: #666;
      position: absolute;
      top: 8px;
      right: 16px;
      cursor: pointer;
      font-size: 28px;
      z-index: 100;
    }
  }
  .mask {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
}
</style>
