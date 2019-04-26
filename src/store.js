import Vue from 'vue'
import Vuex from 'vuex'

import router from './routes'

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
      isAuth(state) {
        if(state.token) {
          return true;
        };

        return false;
      }
    },
    mutations: {
     auth(state, authData) {
       state.email = authData.email;
       state.token = authData.idToken;
       state.refresh = authData.refreshToken;
     },
     logout(state) {
      state.email = "";
      state.token = "";
      state.refresh = "";

      localStorage.removeItem("token");
      localStorage.removeItem("refresh");

      router.push('/')
     }
    },
    actions: {
      signin({ commit }, payload){
        
        Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
          ...payload,
          returnSecureToken: true
        })
        .then(response => response.json())
        .then( authData => {
          commit("auth", authData);
          localStorage.setItem("token", authData.idToken);
          localStorage.setItem("refresh", authData.refreshToken);
          // console.log(authData);
        })
        .catch( error => {
          console.log(error);
        });
      },
      signup({ commit }, payload){
        
        Vue.http.post(`${FbAuth}/signupNewUser?key=${FbApiKey}`, {
          ...payload,
          returnSecureToken: true
        })
        .then(response => response.json())
        .then( authData => {
          commit("auth", authData);
          localStorage.setItem("token", authData.idToken);
          localStorage.setItem("refresh", authData.refreshToken);
          // console.log(authData);
        })
        .catch( error => {
          console.log(error);
        });
      },
      refreshToken({ commit }) {
        const refreshToken = localStorage.getItem("refresh");

        if(refreshToken) {
          Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          })
          .then( response => response.json())
          .then( authData => {
            commit("auth", {
              idToken: authData.id_token,
              refreshToken: authData.refresh_token
            })

          localStorage.setItem("token", authData.id_token);
          localStorage.setItem("refresh", authData.refresh_token);
            // console.log(authData);
          })
        }
      }
    }
  })