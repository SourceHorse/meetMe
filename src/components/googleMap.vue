<template>
    <GmapMap
        :center="{lat:36, lng:-79}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100vw; height: 100vh"
        ref="mapRef"
    >
    </GmapMap>
</template>

<script>
    import * as VueGoogleMaps from "vue2-google-maps"

    var map;
    var userMarker;

    export default {
        mounted () {
            this.$refs.mapRef.$mapPromise.then((mapObj) => {
                map = mapObj;
                this.$emit("ready");
            })
        },
        methods: {
            PanTo(latitude, longitude) {
                map.panTo({lat: latitude, lng: longitude})
            },
            SetUserMarker(latitude, longitude) {
                userMarker = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    map: map,
                    title: 'my position',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "#00FFFF",
                        fillOpacity: 1,
                        strokeColor: "#00CCCC",
                        strokeWeight: 2,
                        scale: 9
                    }
                });
            }
        }
    }
</script>