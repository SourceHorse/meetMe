<template>
  <div id="app">
    <GoogleMap/>
    <PanTool v-on:submit="doPan"/>
    <MapToolbar v-on:center="centerOnPosition"/>
  </div>
</template>

<script>
import GoogleMap from './components/googleMap.vue'
import PanTool from './components/panTool.vue'
import MapToolbar from './components/mapToolbar.vue'
import googleMapVue from './components/googleMap.vue';

var timer;

export default {
    components: {
        GoogleMap,
        PanTool,
        MapToolbar
    },
    name: 'app',
    mounted() {
        this.getUserLocation();
    },
    methods: {
        doPan: function(lat, long) {
            GoogleMap.methods.PanTo(lat, long);
            GoogleMap.methods.SetUserMarker(lat, long);
        },
        centerOnPosition: function() {
            this.getUserLocation()
        },
        getUserLocation() {
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    function success(position) {
                        if (position.coords
                            && position.coords.latitude
                            && position.coords.longitude
                            && position.timestamp){
                                GoogleMap.methods.SetUserMarker(position.coords.latitude, position.coords.longitude)
                                GoogleMap.methods.PanTo(position.coords.latitude, position.coords.longitude)
                                return latLong;
                            }
                        return null
                    },
                    function error() {
                        return null
                    }
                )
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
