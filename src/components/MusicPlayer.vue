
<template>
  <h1>Music Player</h1>
  <div class="card">
    <p><b>Goal:</b> Create an interactive music player and format that ChatGPT can create tunes for.</p>
    <p>Source code: <a href="https://github.com/connected-web/chatgpt-music">connected-web/chatgpt-music</a></p>
  </div>

  <div class="card">
    <h3>TODO List</h3>
    <p>TODO: Specify melodies here as text input</p>
    <p>TODO: Render melodies as interesting rows</p>
  </div>

  <div class="card">
    <h3>Twinkle Twinkle</h3>
    <p>First attempt, with a simple twinkle twinkle single instrument example</p>
    <button @click="playSimple">Play Simple</button>
  </div>

  <div class="card">
    <h3>Audio Player</h3>
    <p>More advanced Audio Player with multiple instruments.</p>
    <p>Needs further debugging; error in console: <code>Oscillator is already playing or stopping</code></p>
    <button @click="playAudioPlayer">Play Audio Player</button>
  </div>

  <div class="card">
    <h3>Chiptune Player</h3>
    <p>A reset to try and get ChatGPT to create a complete player with support for multiple instruments.</p>
    <p>Needs further debugging; plays a single fading note then throws an error:</p>
    <p><code>Failed to set the 'value' property on 'AudioParam': The provided float value is non-finite.</code></p>
    <button @click="playChiptunePlayer">Play Chiptune Player</button>

    <h4>Example chiptune format</h4>
    <p>Emoticon as instrument on first line, notes and durations space separated.</p>
    <pre><code>{{ chiptuneMelody }}</code></pre>
  </div>
</template>

<script>
import { playMelody } from '../models/play.js'

import AudioPlayer from '../models/AudioPlayer.js'
import ChiptunePlayer from '../models/ChiptunePlayer.js'

export default {
  computed: {
    chiptuneMelody() {
      return [
        '🎸 A4 1.5 C5 0.5 B4 0.5 A4 0.5 G4 1.5',
        '🎵 A3 1.5 E4 0.5 F#4 0.5 G4 0.5 A4 1.5',
        '🎺 B4 1.5 A4 0.5 G4 0.5 A4 0.5 B4 1.5',
        '🎹 C5 0.5 D5 0.5 E5 0.5 F5 0.5 G5 0.5 A5 0.5 B5 0.5 C6 1.5',
        '🥁 D5 0.25 C5 0.25 B4 0.25 A4 0.25 G4 0.25 F#4 0.25 E4 0.25 D4 0.25 C4 0.25 B3 0.25 A3 0.25 G3 0.25 F#3 0.25 E3 0.25 D3 0.25 C3 1.75'
      ].join('\n')
    }
  },
  methods: {
    playSimple() {
      playMelody()
    },
    playAudioPlayer() {
      const player = new AudioPlayer()
      player.addInstrument('piano', 'triangle')
      player.setInstrument('piano')
      player.playMelody('C:1 D:1 E:2 C:1 D:1 E:2 E:2 F:1 G:1 E:2 F:2 G:2', 'piano')
    },
    playChiptunePlayer() {
      const player = new ChiptunePlayer();
      player.play(this.chiptuneMelody)
    }
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
