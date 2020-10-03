export default {
    state() {
      return{
        GlobalEvents: [],
        errorMsg: ''
      }
    },
    mutations: {
      ADD_EVENT_GLOBAL(state, payload) {
        if(payload.description.length > 300){
          state.errorMsg = 'Description must be under 300 letters';
          throw new Error('Description must be under 300 letters');          
        }
          state.GlobalEvents.push(payload);
      }
    },
    actions: {
      addEventGlobal({ commit }, payload) {
        commit('ADD_EVENT_GLOBAL', payload);
      }
    },
  };
  