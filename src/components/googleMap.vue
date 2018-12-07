<template>
    <GmapMap
        :center="{lat:36, lng:-79}"
        :zoom="7"
        map-type-id="terrain"
        ref="mapRef"
        id="GoogleMap"
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
            SetZoom(level) {
                map.setZoom(level);
            },
            GetZoom() {
                return map.getZoom();
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

<style lang="scss" scoped>
#GoogleMap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
}
</style>
