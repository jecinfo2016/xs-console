<template>
  <transition name="el-fade-in">
    <content-dialog
      v-if="visible"
      :visible.sync="visible"
      title="修改应用"
      width="500px"
      @close="close"
    >
      <template v-slot:content>
        <div class="form">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="应用名称">
              <el-input v-model="form.name" disabled />
            </el-form-item>
            <el-form-item label="应用密钥" prop="clientSecretStr">
              <el-input v-model="form.clientSecretStr" />
            </el-form-item>
            <el-form-item label="回调地址">
              <el-input v-model="form.webServerRedirectUri" disabled />
            </el-form-item>
            <el-form-item style="text-align: right; margin-bottom: 2px;">
              <el-button type="primary" :loading="loading" @click="onSubmit">保存</el-button>
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
import { editClient } from '@/api/app'
export default {
  components: { ContentDialog },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    clientId: {
      type: Number,
      required: false,
      default: null
    },
    clientName: {
      type: String,
      required: false,
      default: null
    },
    clientSecretStr: {
      type: String,
      required: false,
      default: null
    },
    webServerRedirectUri: {
      type: String,
      required: false,
      default: null
    }
  },
  created () {
      console.log(this.visible,'123')

  },
  data() {
    return {
      loading: false,
      form: {
        id: '',
        name: '',
        clientSecretStr: '',
        webServerRedirectUri: ''
      },
      rules: {
        clientSecretStr: [
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
      this.form.id = this.clientId
      this.form.name = this.clientName
      this.form.clientSecretStr = this.clientSecretStr
      this.form.webServerRedirectUri = this.webServerRedirectUri
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
        clientSecretStr: this.form.clientSecretStr
      }

      this.loading = true
      editClient(params)
        .then(res => {
          this.loading = false
          this.$message.success('修改成功')
          bus.$emit('refreshClient')
          this.close()
        })
        .catch(e => {
          this.loading = false
        })
      console.log(this.form,'123')

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
