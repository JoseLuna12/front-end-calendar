export default {
    state() {
      return{
        GlobalEvents: []
      }
    },
    mutations: {
      ADD_EVENT_GLOBAL(state, payload) {
          state.GlobalEvents.push(payload);
      },
      UPDATE_FORECAST_EVENT(state, payload){
        let index =  state.GlobalEvents[payload.index].map(function(e) { return e.id; }).indexOf(payload.id);
        state.GlobalEvents[payload.index][index].forecast = payload.forecast;
      }
    },
    actions: {
      addEventGlobal({ commit }, payload) {
        commit('ADD_EVENT_GLOBAL', payload);
      },
      updateForecastInEvent({commit}, payload){
        commit('UPDATE_FORECAST_EVENT', payload);
      },
    },
  };
  