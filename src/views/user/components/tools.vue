<template>
  <div class="pb20">
    <el-input v-model="value" class="search-input" clearable />
    <el-button class="ml10" type="primary" @click="search">查询</el-button>
  </div>
</template>

<script>
import bus from '@/utils/bus.js'

export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    search() {
      bus.$emit('search', { value: this.value })
    }
  }
}
</script>
