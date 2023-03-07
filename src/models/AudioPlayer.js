export default class AudioPlayer {
  constructor() {
    this.audioContext = new AudioContext();
    this.instruments = {};
    this.notes = {
      'C': 261.63,
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'B': 493.88
    };
    this.currentInstrument = null;
  }

  addInstrument(name, oscillatorType, volume = 1) {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = oscillatorType;
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume;
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    this.instruments[name] = { oscillator, gainNode };
  }

  setInstrument(instrument) {
    this.currentInstrument = instrument;
  }

  playNoteWithInstrument(note, startTime, duration, instrument) {
    const frequency = this.notes[note];
    const { oscillator } = this.instruments[instrument];
    
    if (oscillator.state === "stopped") {
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    } else {
      console.log("Oscillator is already playing or stopping");
    }
  }

  playMelody(melody, instrument) {
    let startTime = this.audioContext.currentTime;
    const notes = melody.split(' ');
  
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i].split(':');
      const pitch = note[0];
      const duration = parseFloat(note[1]);
      this.playNoteWithInstrument(pitch, startTime, duration, instrument);
      startTime += duration;
    }
  }
}