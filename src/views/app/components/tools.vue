<template>
  <div class="pb20 clearfix">
    <el-button class="fr" type="primary" @click="createGroup">创建应用组</el-button>
  </div>
</template>

<script>
import bus from '@/utils/bus.js'

export default {
  data() {
    return {

    }
  },
  methods: {
    createGroup() {
      bus.$emit('createGroup')
    }
  }
}
</script>
