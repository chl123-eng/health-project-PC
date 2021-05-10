import { login, register, getInfo, bindingInformation } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { resolve, reject } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login(userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username, password: password }).then(response => {
        const data = response
        console.log(data);

        // commit('SET_TOKEN', data)
        sessionStorage.setItem('jwtToken', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }
        sessionStorage.setItem('doctorInfo', JSON.stringify(data))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(userInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  bindingInformation({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      bindingInformation(userInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

