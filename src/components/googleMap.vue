<template>
    <GmapMap
        :center="{lat:36, lng:-79}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100vw; height: 100vh"
        ref="mapRef"
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
    </GmapMap>
</template>

<script>
    var map;
    export default {
        mounted () {
            this.$refs.mapRef.$mapPromise.then((mapObj) => {
                mapObj.panTo({lat: 1.38, lng: 103.80});
                map = mapObj;
            })
        },
        methods: {
            PanTo(latitude, longitude) {
                map.panTo({lat: latitude, lng: longitude})
            }
        }
    }
</script>