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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: () => import('@/views/personalInfo/index')
  },
  {
    path: '/patientInfo',
    name: 'patientInfo',
    component: () => import('@/views/patientInfo/index')
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/applyPatientList',
    name: 'table',
    meta: { title: '患者列表', icon: 'table' },
    children: [
      {
        path: '/applyPatientList',
        name: 'applyPatientList',
        component: () => import('@/views/applyPatientList/index'),
        meta: { title: '申请患者列表', icon: 'table' }
      },
      {
        path: '/bindPatientList',
        name: 'bindPatientList',
        component: () => import('@/views/bindPatientList/index'),
        meta: { title: '绑定患者列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/applyDocCertification',
    component: Layout,
    children: [
      {
        path: '/applyDocCertification',
        name: 'applyDocCertification',
        component: () => import('@/views/applyDocCertification/index'),
        meta: { title: '申请医师资格', icon: 'form' }
      }
    ]
  },
  {
    path: '/askingRoom',
    component: Layout,
    children: [
      {
        path: '/askingRoom',
        name: 'askingRoom',
        component: () => import('@/views/askingRoom/index'),
        meta: { title: '问诊室', icon: 'chatWithPatient' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    name: 'article',
    meta: { title: '文章', icon: 'publishArticle' },
    children: [
      {
        path: '/publishArticle',
        name: 'publishArticle',
        component: () => import('@/views/publishArticle/index'),
        meta: { title: '文章发布', icon: 'publishArticle' }
      },
      {
        path: '/myArticle',
        name: 'myArticle',
        component: () => import('@/views/myArticle/index'),
        meta: { title: '我的文章', icon: 'publishArticle' }
      }
    ]
  },

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
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
