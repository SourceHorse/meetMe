<template>
    <div ref="panTool">
        <input type="text" @input="handleLatitudeInput($event.target.value)" placeholder="lat">
        <input type="text" @input="handleLongitudeInput($event.target.value)" placeholder="long">
        <button ref="latLongPanButton" @click="submit">
            <span>Pan To</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "PanTool",
        data: function() {
            return {
                latitude: "",
                longitude: ""
            };
        },
        methods: {
            handleLatitudeInput(value) {
                this.latitude = parseInt(value);
            },
            handleLongitudeInput(value) {
                this.longitude = parseInt(value);
            },
            submit: function() {
                this.$emit('submit', this.latitude, this.longitude)
            }
        }
    }
</script>

<style lang="scss" scoped>
input {
    display: inline-block;
    width: 70px;
    margin-right: 15px;
}
div {
    background-color: #333;
    padding: 5px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;
}
</style>

