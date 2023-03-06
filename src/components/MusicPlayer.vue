
<template>
  <h1>Music Player</h1>
  <div class="card">
    <p>TODO: Specify melodies here as text input</p>
    <p>TODO: Render melodies as interesting rows</p>
    <button @click="play">Play Music</button>
  </div>
</template>

<script>
import { playMelody } from '../models/play.js'

export default {
  methods: {
    play() {
      playMelody()
    }
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
