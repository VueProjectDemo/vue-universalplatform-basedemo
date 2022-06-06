/*
 * @Author:  
 * @Date: 2022-05-23 18:00:26
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 18:33:56
 * @FilePath: /vue-universalplatform/src/store/modules/tab.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
// 使用Cookie是为了防止页面刷新后 Vuex中数据丢失
import Cookie from 'js-cookie'
// 动态添加路由
// import router from "@/router";

export const tabModule = {
  state: () => ({
    // 控制侧边栏菜单的展开与隐藏
    isCollapse: false,
    // 面包屑导航数据
    tabsList: [
      {
        icon: "s-home",
        label: "首页",
        name: "home",
        path: "/",
        url: "Home/Home"
      }
    ],
    //当前选择的菜单
    currentMenu: null,
    menu: []
  }),
  mutations: {
    collapseChanged(state) {
      state.isCollapse = !state.isCollapse
    },
    // 操作Main顶部 导航面包屑
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const resultIndex = state.tabsList.findIndex(item => item.name === val.name)
        if (resultIndex === -1) {
          state.tabsList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    closeMenu(state, val) {
      const resultIndex = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(resultIndex, 1)
    },
    // 动态添加路由
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return;
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(subItem => {
            subItem.component = () => import(`@/views/${subItem.url}`)
            return subItem
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          menuArr.push(item)
        }
      });
      
      /**
       * 路由的动态添加
       * 添加一条新的路由记录到路由。
       * 如果路由有一个 name，并且已经有一个与之名字相同的路由，它会先删除之前的路由。
       * addRoute(route: RouteConfig): () => void
       * 还可用于为现有路由添加子路由规则
       * ddRoute(parentName: string, route: RouteConfig): () => void
       * 
       * 在项目实践中，往往需要用户登录后由后端返回用户的权限，来动态配置路由,
       * vue-router提供了两个方法router.addRoutes(),router.addRoute()可以进行动态路由配置，
       * 这里需要注意的是vue-router的options属性存放的是路由配置的信息，并不是响应式的，
       * 在动态添加路由规则后，router.options.routes属性不会改变，
       * 如果需要更新router.options.routes，则需要手动更改
       */
      menuArr.forEach(item => {
        router.addRoute('main', item)
      })
    }
  }
}