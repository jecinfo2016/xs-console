<template>
  <div class="examine">
    <p class="texts">任务执行日志</p>
    <p @click="goBack">返回</p>
    <div style="resize:none; width: 100%;height: 80%;overflow: auto;word-break: break-all;background:#fff;padding:5px;border:1px solid #000" v-html="triggerMsg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      triggerMsg:null
    };
  },
  mounted() {
    this.triggerMsg=localStorage.getItem('triggerMsg')
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({ path: "/app/apply/taskexecute" });
    },
  },
};
</script>

<style lang="scss">
.examine {
  width: 100%;
  height: 100%;
  position: relative;
  p {
    margin: 0;
    font-size: 20px;
    padding: 20px 0;
    color: blue;
  }
  .texts{
      color: #000;
      margin: 0;
    font-size: 23px;
    padding: 10px 0;
    font-weight: 700;
  }
}
.foot {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>