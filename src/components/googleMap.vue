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
    var infoWindow = null;
    export default {
        mounted () {
            this.$refs.mapRef.$mapPromise.then((mapObj) => {
                map = mapObj;
                this.$emit("ready");
                map.addListener("click", function() {
                    if (infoWindow) {
                        infoWindow.close();
                    }
                })
            });
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
                };
            },
            DrawMeetupMarker(meetup) {
                var icons = {
                    meetUp: {
                        icon: "/src/assets/meetup5050.png"
                    }
                };
                var meetupMarker = new google.maps.Marker({
                    position: {lat: meetup.venue.lat, lng: meetup.venue.lon},
                    map: map,
                    title: meetup.name,
                    icon: icons["meetUp"].icon
                });
                meetupMarker.addListener("click", function() {
                    console.log(meetup);

                    if (infoWindow) {
                        infoWindow.close();
                    }
                    
                    var date = new Date(0);
                    date.setMilliseconds(meetup.time);
                    var infoWindowContent = `
                    <h2>${meetup.name}</h2>
                    <h3>${meetup.group.name}</h3>
                    <h3>${date}</h3>
                    <div class="infoWindowDescription">${meetup.description}
                        <img src="${meetup.photo_url}">
                    </div>
                    <a href="${meetup.event_url}" target="_blank">Go to event page</a>
                    `;

                    infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });
                        infoWindow.open(map, meetupMarker);
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

<style lang="scss">
#GoogleMap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
}
.infoWindowDescription {
    max-height: 300px;
    overflow-y: auto;
}
</style>
