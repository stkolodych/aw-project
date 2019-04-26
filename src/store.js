import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyCTUXOH1wkBgdSyW_YU1sK7ubPJZBEaPME";

export default new Vuex.Store({
    state: {
      email: "",
      token: "",
      refresh: ""
    },
    getters: {
      
    },
    mutations: {
     auth(state, authData) {
       state.email = authData.email;
       state.token = authData.idToken;
       state.refresh = authData.refreshToken;
     }
    },
    actions: {
      signup({ commit }, payload){
        
        Vue.http.post(`${FbAuth}/signupNewUser?key=${FbApiKey}`, {
          ...payload,
          returnSecureTocen: true
        })
        .then(response => response.json())
        .then( authData => {
          commit("auth", authData);
          localStorage.setItem("token", authData.idToken);
          localStorage.setItem("refresh", authData.refreshToken);
          console.log(authData);
        })
        .catch( error => {
          console.log(error);
        });

      }
    }
  })