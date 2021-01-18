<template>
  <div class="p20">
    <private-tools /><!-- 创建应用组 -->
    <private-collapse /><!-- 应用组列表 -->
    <dialog-create-group
      :visible.sync="visible.createGroup"
    /><!-- 应用列表 -->
  </div>
</template>

<script>
import bus from '@/utils/bus.js'
import PrivateTools from './components/tools'
import PrivateCollapse from './components/collapse'
import DialogCreateGroup from './components/dialog/createGroup'

export default {
  components: { PrivateTools, PrivateCollapse, DialogCreateGroup },
  data() {
    return {
      visible: {
        createGroup: false
      }
    }
  },
  created() {
    bus.$on('createGroup', () => { this.visible.createGroup = true })
  },
  beforeDestroy() {
    bus.$off('createGroup')
  }
}
</script>

<style>

</style>
