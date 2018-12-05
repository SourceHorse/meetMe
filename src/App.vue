<template>
  <div id="app">
    <GoogleMap/>
    <PanTool v-on:submit="doPan"/>
  </div>
</template>

<script>
import GoogleMap from './components/googleMap.vue'
import PanTool from './components/panTool.vue'

export default {
  components: {
    GoogleMap,
    PanTool
  },
  name: 'app',
  methods: {
      doPan: function(lat, long) {
          GoogleMap.methods.PanTo(lat, long);
          GoogleMap.methods.SetUserMarker(lat, long);
      }
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
