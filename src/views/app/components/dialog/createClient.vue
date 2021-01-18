<template>
  <transition name="el-fade-in">
    <content-dialog
      v-if="visible"
      :visible.sync="visible"
      title="新建应用"
      width="500px"
      @close="close"
    >
      <template v-slot:content>
        <div class="form">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="应用标识" prop="clientId">
              <el-input v-model="form.clientId" />
            </el-form-item>
            <el-form-item label="应用名称" prop="clientName">
              <el-input v-model="form.clientName" />
            </el-form-item>
            <el-form-item label="回调地址" prop="webServerRedirectUri">
              <el-input v-model="form.webServerRedirectUri" />
            </el-form-item>
            <el-form-item style="text-align: right; margin-bottom: 2px;">
              <el-button type="primary" :loading="loading" @click="onSubmit">新建</el-button>
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
import { createClient } from '@/api/app'
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
    }
  },
  data() {
    return {
      loading: false,
      form: {
        clientId: '',
        clientName: '',
        webServerRedirectUri: ''
      },
      rules: {
        clientId: [
          { required: true, message: '请输入', trigger: 'change' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const reg = /^[a-zA-Z0-9]+$/
              if (!reg.test(value)) {
                callback(new Error('只能包含英文和数字'))
              } else {
                callback()
              }
            }
          }
        ],
        clientName: [
          { required: true, message: '请输入', trigger: 'change' },
          { min: 0, max: 5, message: '长度在 0 到 20 个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const reg = /^[\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('只能包含中文'))
              } else {
                callback()
              }
            }
          }
        ],
        webServerRedirectUri: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
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
      const groupId = this.groupId
      const params = {
        clientId: this.form.clientId,
        clientName: this.form.clientName,
        webServerRedirectUri: this.form.webServerRedirectUri
      }
      this.loading = true
      createClient(groupId, params)
        .then(res => {
          this.loading = false
          this.$message.success('增加成功')
          bus.$emit('refreshClient')
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
