<template>
  <div>
    <el-collapse v-model="activeNames" class="collapse" accordion @change="change">
      <template v-for="item in list">
        <content-collapse-item
          :id="item.id"
          :key="item.id"
          :title="item.name"
        >
          <template slot="btns">
            <el-button icon="el-icon-edit-outline" type="text" @click.stop="editGroup(item.id, item.name)">编辑</el-button>
            <el-button icon="el-icon-circle-plus-outline" type="text" @click.stop="createClient(item.id)">增加</el-button>
            <el-button icon="el-icon-delete" type="text" @click.stop="deleteGroup(item.id, item.name)">删除</el-button>
          </template>
          <template slot="content">
            <div
              v-if="item.clientList.length === 0"
              class="no-data"
            >
              <img src="../../../assets/no-data.png" alt="">
              <div class="title">暂无数据</div>
            </div>
            <private-table v-else :list="item.clientList" @editClient="editClient" />
          </template>
        </content-collapse-item>
      </template>
    </el-collapse>
    <dialog-create-client
      :visible.sync="dialog.createClient.visible"
      :group-id="dialog.createClient.groupId"
    />
    <dialog-edit-group
      :group-id="dialog.editGroup.groupId"
      :visible.sync="dialog.editGroup.visible"
      :group-name="dialog.editGroup.groupName"
    />
    <dialog-edit-client
      :client-id="dialog.editClient.clientId"
      :visible.sync="dialog.editClient.visible"
      :client-name="dialog.editClient.clientName"
      :client-secret-str="dialog.editClient.clientSecretStr"
      :web-server-redirect-uri="dialog.editClient.webServerRedirectUri"
    />
  </div>
</template>

<script>
import bus from '@/utils/bus.js'
import ContentCollapseItem from '@/components/Content/collapseItem'
import PrivateTable from './table'
import { groupList, clientList, deleteGroup } from '@/api/app'
import DialogCreateClient from './dialog/createClient'
import DialogEditGroup from './dialog/editGroup'
import DialogEditClient from './dialog/editClient'
export default {
  components: { ContentCollapseItem, PrivateTable, DialogCreateClient, DialogEditGroup, DialogEditClient },
  data() {
    return {
      activeNames: '',
      list: [],
      page: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      dialog: {
        createClient: {
          visible: false,
          groupId: null
        },
        editGroup: {
          visible: false,
          groupId: null,
          groupName: null
        },
        editClient: {
          visible: false,
          clientId: null,
          clientName: null,
          clientSecretStr: null,
          webServerRedirectUri: null
        }
      }
    }
  },
  created() {
    this.getGroupList()
    bus.$on('refreshGroup', this.getGroupList)
    bus.$on('refreshClient', this.getClientList)
  },
  beforeDestroy() {
    bus.$off('refreshGroup')
    bus.$off('refreshClient')
  },
  methods: {
    getGroupList() {
      const params = {
        page: this.page.currentPage,
        limit: this.page.size
      }
      groupList(params)
        .then(res => {
          this.page.total = res.count
          res.data.map(item => {
            if (this.activeNames !== '') {
              const { clientList } = this.list.find(_item => _item.id === this.activeNames)
              item.clientList = clientList
            } else {
              item.clientList = []
            }
          })
          this.list = res.data
        })
    },
    editGroup(groupId, groupName) {
      this.dialog.editGroup.visible = true
      this.dialog.editGroup.groupId = groupId
      this.dialog.editGroup.groupName = groupName
    },
    deleteGroup(groupId, groupName) {
      this.$confirm(`确认删除应用组：${groupName}？`, '提示', {
        type: 'warning'
      })
        .then(_ => {
          deleteGroup(groupId)
            .then(res => {
              this.$message.success('删除成功')
              this.getGroupList()
            })
        })
        .catch(_ => {})
    },
    getClientList() {
      const groupId = this.activeNames
      const params = {
        page: 1,
        limit: 100,
        groupId
      }
      clientList(params)
        .then(res => {
          console.log(res)
          this.list.map(item => {
            if (item.id === groupId) {
              item.clientList = res.data
            }
          })
        })
    },
    createClient(groupId) {
      this.dialog.createClient.visible = true
      this.dialog.createClient.groupId = groupId
    },
    editClient({ id, clientId, clientSecretStr, webServerRedirectUri }) {
      this.dialog.editClient.visible = true
      this.dialog.editClient.clientId = id
      this.dialog.editClient.clientName = clientId
      this.dialog.editClient.clientSecretStr = clientSecretStr
      this.dialog.editClient.webServerRedirectUri = webServerRedirectUri
    },
    refreshClientList(groupId) {
      this.getClientList(groupId)
    },
    change(groupId) {
      if (groupId !== '') {
        this.getClientList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  border-bottom: 0;
}
.no-data {
  text-align: center;
  padding: 16px 0;
  img {
    width: 120px;
  }
  .title {
    font-weight: bold;
  }
}
</style>
