import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import {secret} from './config/config.js'

const googleMapsKey = "U2FsdGVkX1+yxj/YsHGc6QLr0MZMZfcMbol596o5GBSab9uYuozpDqCMEnP+bavMotv8fR9HB5M/NN61vElF8g==";


var CryptoJS = require("crypto-js");
Vue.use(VueGoogleMaps, {
  load: {
    key: CryptoJS.AES.decrypt(googleMapsKey, secret()).toString(CryptoJS.enc.Utf8)
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
