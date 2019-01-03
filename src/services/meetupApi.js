import axios from 'axios'
import config from '../config/config.js'
import * as fetchjsonp from 'fetch-jsonp'
var CryptoJS = require('crypto-js');

const meetupApiKey = 'U2FsdGVkX1+UfPGPY0O+4MaM4huEoqE3r1BxmU0korHx3YtxFlUvAJ3a7R/tnO1VeuG1zlco9YBZcMkpr/n6ng==';
const baseUrl = "https://api.meetup.com";
const defaultRadiusMiles = 15;

export default {
    methods: {
        getMeetupsByLocation(lat, long, radius) {
            if(lat && long) {
                var decryptedKey = CryptoJS.AES.decrypt(meetupApiKey, config.secret()).toString(CryptoJS.enc.Utf8);
                var fetchOptions = {
                    method: 'GET',
                    mode: 'no-cors'
                }

                return fetchjsonp(`${baseUrl}/2/open_events?lat=${lat}&lon=${long}&radius=${defaultRadiusMiles}&key=${decryptedKey}`, fetchOptions)
                .then(function(response) {
                    return response.json()
                  })
            }
        }
    }
}