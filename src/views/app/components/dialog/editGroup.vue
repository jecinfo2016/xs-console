<template>
  <transition name="el-fade-in">
    <content-dialog
      v-if="visible"
      :visible.sync="visible"
      title="修改应用组"
      width="500px"
      @close="close"
    >
      <template v-slot:content>
        <div class="form">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="应用组名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item style="text-align: right; margin-bottom: 2px;">
              <el-button type="primary" :loading="loading" @click="onSubmit">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </content-dialog>
  </transition>
</template>

<script>
import bus from '@/utils/bus.js'
import ContentDialog from '@/components/Content/dialog'
import { editGroup } from '@/api/app'
export default {
  components: { ContentDialog },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    groupId: {
      type: Number,
      required: false,
      default: null
    },
    groupName: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      form: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible(val) {
      val && this.open()
    }
  },
  methods: {
    open() {
      this.form.id = this.groupId
      this.form.name = this.groupName
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.upload()
        } else {
          return false
        }
      })
    },
    upload() {
      const params = {
        id: this.form.id,
        name: this.form.name
      }
      this.loading = true
      editGroup(params)
        .then(res => {
          this.loading = false
          this.$message.success('修改成功')
          bus.$emit('refreshGroup')
          this.close()
        })
        .catch(e => {
          this.loading = false
        })
    },
    close() {
      this.$emit('update:visible', false)
      Object.assign(this.$data.form, this.$options.data().form)
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 20px;
}
</style>
