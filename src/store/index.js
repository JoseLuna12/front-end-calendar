import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: new Date(),
    currentMonthName: String,
    currentDay: String,
    currentDate: Number,
    startDay: Number,
    GlobalEvents: Array
  },
  mutations: {
    SET_CURRENT_MONTH_NAME(state, payload) {
      state.currentMonthName = payload;
    },
    SET_CURRENT_DAY(state, payload) {
      state.currentDay = state.days[payload];
    },
    SET_START_DAY(state, payload) {
      state.startDay = payload;
    },
    SET_CURRENT_DATE(state, payload) {
      state.currentDate = payload;
    },
    SET_GLOBALEVENTS(state, payload) {
      state.GlobalEvents = payload;
    },
    ADD_EVENT_GLOBAL(state, payload) {
      let evLast = state.GlobalEvents[payload.index];
        evLast.push(payload.event)
        evLast.sort(function (a, b) {
          return a.time.localeCompare(b.time);
        });
        state.GlobalEvents[payload.index] = evLast;
    },
    UPDATE_FORECAST_EVENT(state, payload){
      let index =  state.GlobalEvents[payload.index].map(function(e) { return e.id; }).indexOf(payload.id);
      state.GlobalEvents[payload.index][index].forecast = payload.forecast;
    }
  },
  actions: {
    setMonth({ commit }, payload) {
      commit('SET_CURRENT_MONTH_NAME', payload);
    },
    setDay({ commit }, payload) {
      commit('SET_CURRENT_DAY', payload);
    },
    setStartDay({ commit }, payload) {
      commit('SET_START_DAY', payload);
    },
    setCurrDate({ commit }, payload) {
      commit('SET_CURRENT_DATE', payload);
    },
    SetEventsArray({ commit }, payload) {
      commit('SET_GLOBALEVENTS', payload);
    },
    addEventGlobal({ commit }, payload) {
      commit('ADD_EVENT_GLOBAL', payload);
    },
    updateForecastInEvent({commit}, payload){
      commit('UPDATE_FORECAST_EVENT', payload);
    }
  },
  modules: {},
  getters: {
    GetEventByDay: (state) => (index) => {
      return state.GlobalEvents[index]
    },
    DaysCount: (state) => {
      return state.GlobalEvents.length
    },
    DaysArray: (state, getters) => {
      let arr = new Array(getters.DaysCount)
      for(var i = 0; i < arr.length; i++){
        arr[i] = i+1;
      }
      return arr
    },

  }
});
