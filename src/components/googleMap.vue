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
    var meetupMarkers = [];
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
                if (!userMarker) {
                        userMarker = new google.maps.Marker({
                        position: {lat: latitude, lng: longitude},
                        map: map,
                        title: "User Location",
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: "#00FFFF",
                            fillOpacity: 1,
                            strokeColor: "#00CCCC",
                            strokeWeight: 2,
                            scale: 9
                        }
                    });
                } else {
                    userMarker.setPosition({lat: latitude, lng: longitude})
                }
            },
            DrawMeetupMarker(latitude, longitude, title) {
                var icons = {
                    meetUp: {
                        icon: "/src/assets/meetup5050.png"
                    }
                }
                var meetupMarker = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    map: map,
                    title: title,
                    icon: icons["meetUp"].icon
                    // {
                    //     path: google.maps.SymbolPath.CIRCLE,
                    //     fillColor: "#FF0000",
                    //     fillOpacity: 1,
                    //     strokeColor: "#FF0000",
                    //     strokeWeight: 0,
                    //     scale: 5
                    // }
                });
                meetupMarker.addListener("click", function() {
                    console.log(meetupMarker.title);
                })
                meetupMarkers.push(meetupMarker);
            },
            ClearMeetupMarkers() {
                meetupMarkers.forEach(marker => marker.setMap(null));
                meetupMarkers = [];
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
