import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import axios from 'axios'
import config from './config/config.js'
import MeetupApi from './services/meetupApi.js'

const googleMapsKey = "U2FsdGVkX1+yxj/YsHGc6QLr0MZMZfcMbol596o5GBSab9uYuozpDqCMEnP+bavMotv8fR9HB5M/NN61vElF8g==";

// Broke. Getting CORS error
//MeetupApi.getMeetupsByLocation(36, -79);

var CryptoJS = require("crypto-js");
Vue.use(VueGoogleMaps, {
  load: {
    key: CryptoJS.AES.decrypt(googleMapsKey, config.secret()).toString(CryptoJS.enc.Utf8)
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})

