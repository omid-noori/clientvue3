import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState({storage: window.sessionStorage})],
  state: {
    isAuthenticated: false,
    User: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, data) {
      state.User = data;
    },
    setProfilePic(state, data) {
      state.User.profilePic = data;
    },
    setContacts(state, data) {
      state.User = Object.assign(state.User, data);
    },
  },
  getters: {
    getAuthState(state) {
      return state.isAuthenticated;
    },
  },
  actions: {},
  modules: {},
});
