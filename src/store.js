import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    totalSearches: 0,
    exampleProp: [
      { id: 1, title: 'Indiana Jones', score: 8 },
      { id: 2, title: 'The goonies', score: 6 },
      { id: 3, title: 'Harry Potter', score: 7 },
      { id: 4, title: 'Star Wars', score: 5 },
      { id: 5, title: 'Lord of the rings', score: 9 }
    ],
    filterScore: 0
  },

  mutations: {
    addSearch (state, data = {}) {
      state.totalSearches += data.value || 1
    },
    changeFilterScore (state, data = {}) {
      state.filterScore = data.value || 0
    }
  },

  getters: {
    getTotalSearches (state) {
      return state.totalSearches
    },
    getExampleProp (state) {
      return state.exampleProp
    },
    getFilterScore (state) {
      return state.filterScore
    },
    getFilterMovies (state) {
      return state.exampleProp.filter(data => data.score >= state.filterScore)
    }
  },

  actions: {
    addSearchAsync (context, data = {}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const value = Math.round(Math.random() * 100)
          const response = {
            statusCode: value < 50 ? 200 : 400,
            value
          }
          value < 50 ? resolve(response) : reject(response)
        }, 3000)
      })
    }
  }
})

export default store
