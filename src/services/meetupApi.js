import axios from 'axios'
import {secret} from '../config/config.js'
var CryptoJS = require('crypto-js');

const meetupApiKey = 'U2FsdGVkX1+UfPGPY0O+4MaM4huEoqE3r1BxmU0korHx3YtxFlUvAJ3a7R/tnO1VeuG1zlco9YBZcMkpr/n6ng==';

export default {
    getMeetupsByLocation(lat, long, radius) {
        if(lat && long) {
            var requestUrl = 'https://api.meetup.com/2/open_events?lat=' + lat + '&lon=' + long + '&key=' + CryptoJS.AES.decrypt(meetupApiKey, secret()).toString(CryptoJS.enc.Utf8 + "&f=jsonp");
            return axios.get(requestUrl)
                        .then(response => console.log(response))
        }
    }
}