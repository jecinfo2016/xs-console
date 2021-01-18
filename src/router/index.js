import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/user',
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/user/index'),
  //       meta: { title: '用户管理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/app',
    children: [
      {
        path: 'app',
        name: 'App',
        component: () => import('@/views/app/index'),
        meta: { title: '应用管理', icon: 'form' },
      },
      {
        path: '/app/apply',
        name: 'apply',
        redirect: '/app/apply/partition',
        component: () => import('@/views/apply/index'),
        children: [
          {
            path: '/app/apply/partition',
            name: 'partition',
            component: () => import('@/views/apply/components/partition'),
          },
          {
            path: '/app/apply/equipment',
            name: 'equipment',
            component: () => import('@/views/apply/components/equipment'),
          },
          {
            path: '/app/apply/datatask',
            name: 'datatask',
            component: () => import('@/views/apply/components/datatask'),
          },
          {
            path: '/app/apply/taskexecute',
            name: 'taskexecute',
            component: () => import('@/views/apply/components/taskexecute'),
          },
          {
            path: '/app/apply/hydraulic',
            name: 'hydraulic',
            component: () => import('@/views/apply/components/hydraulic'),
          },
          {
            path: '/app/apply/examine',
            name: 'examine',
            component: () => import('@/views/apply/components/examine'),
          },
          {
            path: '/app/apply/journal',
            name: 'journal',
            component: () => import('@/views/apply/components/journal'),
          },
          {
            path: '/app/apply/apparatus',
            name: 'apparatus',
            component: () => import('@/views/apply/components/apparatus'),
          },
          {
            path: '/app/apply/ampshow',
            name: 'ampshow',
            component: () => import('@/views/apply/components/ampshow'),
          },
        ]
      },
      {
        path: '/app/add',
        name: 'add',
        component: () => import('@/views/apply/components/add'),
      },
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/apply',
  //   children: [
  //     {
  //       path: 'apply',
  //       name: 'Apply',
  //       component: () => import('@/views/apply/ibdex'),
  //       meta: { title: '信息', icon: 'form' }
  //     }
  //   ]
  // }
  // {
  //   path: '/apply',
  //   name: 'apply',
  //   component: () => import('@/views/apply/index'),
  // },
  // {
  //   path: '/model',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Model',
  //       component: () => import('@/views/model/index'),
  //       meta: { title: '模型管理', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/device',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Device',
  //       component: () => import('@/views/device/index'),
  //       meta: { title: '设备管理', icon: 'form' }
  //     }
  //   ]
  // }
]

export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
