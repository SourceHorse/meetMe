<template>
    <GmapMap
        :center="{lat:36, lng:-79}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
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
    export default {
        mounted () {
            this.$refs.mapRef.$mapPromise.then((map) => {
                map.panTo({lat: 1.38, lng: 103.80})
            })
        }
    }
</script>