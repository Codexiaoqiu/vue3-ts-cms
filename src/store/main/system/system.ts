import { Module } from 'vuex'
import type { ISystemState } from './types'
import { IRootState } from '@/store/types'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      queryInfo: {},
      categoryCount: 0,
      categoryList: []
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeCategoryList(state, menuList: any[]) {
      state.categoryList = menuList
    },
    changeCategoryCount(state, menuCount: number) {
      state.categoryCount = menuCount
    },
    changeQueryInfo(state, queryInfo) {
      state.queryInfo = queryInfo
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取page url

      // 1. 可以用 switch 映射
      // 2. 可以用 map 对象
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 发送请求
      commit('changeQueryInfo', payload.queryInfo)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      console.log(pageResult)
      // 将数据存储到state中
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}List`,
        list
      )
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Count`,
        totalCount
      )
    },
    // 删除页面信息
    async deletePageDataAction(context, payload: any) {
      // 获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用删除接口
      await deletePageData(pageUrl)
      // 重新调用请求页面的接口 更新页面数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: context.state.queryInfo
      })
    },
    // 新建用户
    async createPageDataAction(context, payload: any) {
      // 发送请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 请求数据 刷新页面
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: context.state.queryInfo
      })
    },
    // 修改页面信息
    async editPageDataAction(context, payload: any) {
      // 发送修改信息请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 请求数据 刷新页面
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: context.state.queryInfo
      })
    }
  }
}
export default systemModule
