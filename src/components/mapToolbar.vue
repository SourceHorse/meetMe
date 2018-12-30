<template>
    <div id="mapToolBar">
        <button @click="center">
            <span class="material-icons">gps_fixed</span>
        </button>
        <button @click="getMeetups">
            <span class="material-icons">people</span>
        </button>
        <button @click="clearMeetups">
            <span class="material-icons">clear</span>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        center: function() {
            this.$emit('center');
        },
        getMeetups: function() {
            this.$emit('getMeetups');
        },
        clearMeetups: function() {
            this.$emit('clearMeetups');
        }
    }
}
</script>

<style lang="scss" scoped>
#mapToolBar {
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 10000;
    background-color: rgba(20, 20, 20, 0.3);
    padding: 15px;
    border-radius: 0 10px 10px 0;

    *{
        display: block;
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
}

button {
    padding: 5px;
}
</style>