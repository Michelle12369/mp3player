import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import Vuex from 'vuex';

Vue.config.productionTip = false


const config = {
  apiKey: "AIzaSyCss_QExWVH-zXyuXj6h4seukavjYRictQ",
  authDomain: "mp3player-4dc8c.firebaseapp.com",
  databaseURL: "https://mp3player-4dc8c.firebaseio.com",
  projectId: "mp3player-4dc8c",
  storageBucket: "mp3player-4dc8c.appspot.com",
  messagingSenderId: "635764764737",
  appId: "1:635764764737:web:f19492e6ea86403c1d96c0",
  measurementId: "G-6FQKGGWY5V"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
