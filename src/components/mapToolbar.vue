<template>
    <button @click="center">
        <span> center </span>
    </button>
</template>

<script>
export default {
    methods: {
        center: function() {
            this.$emit('center');
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    padding: 5px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
}
</style>