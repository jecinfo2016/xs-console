import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    const realname = store.getters.realname
    if (!realname) {
      await store.dispatch('user/getInfo')
      const accessRoutes = await store.dispatch('permission/generateRoutes', [])
      router.addRoutes(accessRoutes)
    }
    next()
  } else {
    window.location.href = process.env.VUE_APP_HOME_URL
    
  }
})
