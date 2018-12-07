import axios from 'axios'
import config from '../config/config.js'
var CryptoJS = require('crypto-js');

const meetupApiKey = 'U2FsdGVkX1+UfPGPY0O+4MaM4huEoqE3r1BxmU0korHx3YtxFlUvAJ3a7R/tnO1VeuG1zlco9YBZcMkpr/n6ng==';

export default {
    methods: {
        getMeetupsByLocation(lat, long, radius) {
            if(lat && long) {
                var decryptedKey = CryptoJS.AES.decrypt(meetupApiKey, config.secret()).toString(CryptoJS.enc.Utf8);
                var requestUrl = 'https://api.meetup.com/2/open_events?lat=' + lat + '&lon=' + long + '&key=' + decryptedKey + "&callback=parseResponse";
                
                let axiosConfig = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
                  }
                  
                  let axiosData = {
                    'HTTP_CONTENT_LANGUAGE': self.language
                  }
                
                // return axios.get(requestUrl, axiosData, axiosConfig)
                //             .then(response => console.log(response))



                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() { 
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                        callback(xmlHttp.responseText);
                }
                xmlHttp.open("GET", requestUrl, true);
                xmlHttp.withCredentials = true;
                xmlHttp.setRequestHeader("Content-Type", "application/json");
                xmlHttp.send({"request": "authentication token"});
            }
        }
    }
}