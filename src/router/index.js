import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../pages/index.vue'
import detailList from '../pages/detailList.vue'
import detail from '../pages/detail.vue'

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    name: 'home',
    path: '/',
    meta: {
      title: '国家政策'
    },
    component: index
  }, {
    name: 'index',
    path: '/index',
    meta: {
      title: '国家政策'
    },
    component: index
  }, {
    name: 'detailList',
    path: '/detailList',
    meta: {
      title: '加载中'
    },
    component: detailList
  }, {
    name: 'detail',
    path: '/detail',
    meta: {
      title: '加载中'
    },
    component: detail
  }]
})
