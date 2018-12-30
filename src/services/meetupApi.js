import axios from 'axios'
import config from '../config/config.js'
import * as fetchjsonp from 'fetch-jsonp'
var CryptoJS = require('crypto-js');

const meetupApiKey = 'U2FsdGVkX1+UfPGPY0O+4MaM4huEoqE3r1BxmU0korHx3YtxFlUvAJ3a7R/tnO1VeuG1zlco9YBZcMkpr/n6ng==';
const baseUrl = "https://api.meetup.com";

export default {
    methods: {
        getMeetupsByLocation(lat, long, radius) {
            if(lat && long) {
                var decryptedKey = CryptoJS.AES.decrypt(meetupApiKey, config.secret()).toString(CryptoJS.enc.Utf8);

                var fetchOptions = {
                    method: 'GET',
                    mode: 'no-cors'
                }

                fetchjsonp(`${baseUrl}/2/open_events?lat=${lat}&lon=${long}&key=${decryptedKey}`, fetchOptions)
                .then(function(response) {
                    return response.json()
                  }).then(function(json) {
                    console.log('parsed json', json)
                  }).catch(function(ex) {
                    console.log('parsing failed', ex)
                  })

                // axios(`${baseUrl}/2/open_events?lat=${lat}&lon=${long}&key=${decryptedKey}`, {
                //     method: "GET",
                //     mode: "no-cors",
                // }).then((response) => {
                //     console.log(response);
                // }).catch((e) => {
                //     console.log(e);
                // });
            }
        }
    }
}