import { getInfo, logout } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'

const state = {
  id: '',
  realname: ''
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_REALNAME: (state, realname) => {
    state.realname = realname
  }
}

const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          const { id, realname } = res.datas
          commit('SET_ID', id)
          commit('SET_REALNAME', realname)
          resolve()
        }).catch(e => {
          reject(e)
        })
    })
  },
  logout({ commit }) {
    logout({ access_token: getToken() })
      .then(() => {
        removeToken()
        commit('SET_ID', '')
        commit('SET_REALNAME', '')
        window.location.href = process.env.VUE_APP_HOME_URL
      })
  },
  resetToken({ commit }) {
    removeToken()
    commit('SET_ID', '')
    commit('SET_REALNAME', '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
