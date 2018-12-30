<template>
  <div id="app">
    <GoogleMap v-on:ready="findUser"/>
    <PanTool v-on:submit="doPan"/>
    <MapToolbar v-on:center="centerOnPosition" v-on:getMeetups="getMeetups" v-on:clearMeetups="clearMeetups"/>
  </div>
</template>

<script>
import GoogleMap from './components/googleMap.vue'
import PanTool from './components/panTool.vue'
import MapToolbar from './components/mapToolbar.vue'
import googleMapVue from './components/googleMap.vue'
import MeetupApi from './services/meetupApi.js'

var timer;

var currentPosition = {
    latitude: "",
    longitude: ""
}

export default {
    components: {
        GoogleMap,
        PanTool,
        MapToolbar
    },
    name: 'app',
    mounted() {
    },
    methods: {
        findUser: function() {
            this.getUserLocation();
        },
        doPan: function(lat, long) {
            GoogleMap.methods.PanTo(lat, long);
            GoogleMap.methods.SetUserMarker(lat, long);
        },
        centerOnPosition: function() {
            this.getUserLocation()
        },
        getMeetups: function() {
            MeetupApi.methods.getMeetupsByLocation(currentPosition.latitude, currentPosition.longitude)
            .then(function(json) {
                GoogleMap.methods.ClearMeetupMarkers();
                if (json.hasOwnProperty('results')) {
                    var meetupsWithLatLong = json.results.filter(meetup => {
                        return meetup.hasOwnProperty("venue") 
                        && meetup.venue.hasOwnProperty("lat") 
                        && meetup.venue.hasOwnProperty("lon")
                        && meetup.venue.lat
                        && meetup.venue.lon
                    })
                    meetupsWithLatLong.forEach(meetup => GoogleMap.methods.DrawMeetupMarker(meetup.venue.lat, meetup.venue.lon, meetup.name));
                }
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
        },
        clearMeetups: function() {
            GoogleMap.methods.ClearMeetupMarkers();
        },
        consoleLog() {
            console.log("ping")
        },
        handleMeetupsResult(meetupsJson) {
            console.log(meetupsJson)
        },
        getUserLocation() {
            if (navigator.geolocation){
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                function success(position) {
                    if (position.coords
                        && position.coords.latitude
                        && position.coords.longitude){
                            currentPosition.latitude = position.coords.latitude;
                            currentPosition.longitude = position.coords.longitude;
                            GoogleMap.methods.SetUserMarker(position.coords.latitude, position.coords.longitude);
                            GoogleMap.methods.PanTo(position.coords.latitude, position.coords.longitude);
                            var zoomLevel = GoogleMap.methods.GetZoom();
                            if (zoomLevel < 13) GoogleMap.methods.SetZoom(13);
                    }
                    return null;
                };
                function error() {
                    return null;
                };
                navigator.geolocation.getCurrentPosition(success, error, options);
            } else {
                return null
            }
        },
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
