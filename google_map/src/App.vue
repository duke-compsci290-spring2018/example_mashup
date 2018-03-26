<template>
    <gmap-map
        :center="center"
        :zoom="3"
        @click="addMarker"
        style="height: 480px;"
    >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
        ></gmap-marker>
    </gmap-map>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            center: {
                lat: 40,
                lng: -35
            },
            markers: [
                {
                    position: { lat: 35.99, lng: -78.89}, // Durham, NC
                },
                {
                    position: { lat: 48.85, lng: 2.35},   // Paris, France
                }
            ]
        }
    },
    methods: {
        addMarker (event) {
            this.markers.push({
                position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
            })
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
