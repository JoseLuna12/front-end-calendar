import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: new Date(),
    currentMonthName: String,
    currentDay: String,
    currentDate: Number,
    startDay: Number,
    startCalendar: false
  },
  mutations: {
    SET_CURRENT_MONTH_NAME (state, payload){
      state.currentMonthName = payload;
    },
    SET_CURRENT_DAY (state, payload){
      state.currentDay = state.days[payload];
    },
    SET_START_DAY (state, payload){
      state.startDay = payload;
    },
    SET_CURRENT_DATE (state, payload){
      state.currentDate = payload;
    }
  },
  actions: {
    setMonth ({commit}, payload){
      commit('SET_CURRENT_MONTH_NAME', payload);
    },
    setDay ({commit}, payload){
      commit('SET_CURRENT_DAY', payload);
    },
    setStartDay ({commit}, payload){
      commit('SET_START_DAY', payload);
    },
    setCurrDate ({commit}, payload){
      commit('SET_CURRENT_DATE', payload);
    }
  },
  modules: {}
});
