export default class ChiptunePlayer {
  constructor(compressedText) {
    this.compressedText = compressedText;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  decode(compressedText) {
    const lines = compressedText.split('\n');
    const instruments = {
      '🎹': 'square',
      '🎸': 'sawtooth',
      '🎵': 'triangle',
      '🎺': 'sine',
      '🥁': 'noise',
    };
    let notes = [];
  
    lines.forEach(line => {
      const sequence = line.split(' ')
      const instrumentCode = sequence.shift()
      const instrument = instruments[instrumentCode];
  
      if (instrument) {  
        sequence.forEach(note => {
          const duration = parseFloat(note.substring(1));
          const frequency = this.noteToFrequency(note);
          notes.push({ instrument, frequency, duration });
        });
      } else {
        console.log('No instrument found', { instrumentCode, instruments })
      }
    });
  
    return notes;
  }

  noteToFrequency(note) {
    const noteMap = {
      'C': 16.35,
      'C#': 17.32,
      'Db': 17.32,
      'D': 18.35,
      'D#': 19.45,
      'Eb': 19.45,
      'E': 20.60,
      'F': 21.83,
      'F#': 23.12,
      'Gb': 23.12,
      'G': 24.50,
      'G#': 25.96,
      'Ab': 25.96,
      'A': 27.50,
      'A#': 29.14,
      'Bb': 29.14,
      'B': 30.87,
    };
  
    const [, noteName, octave] = note.match(/^([A-G][b#]?)(\d)$/) || [];
  
    console.log('Note', { note, noteName, octave })
  
    let frequency = noteMap[noteName];
  
    if (octave !== undefined) {
      frequency *= Math.pow(2, octave - 1);
    }
  
    return frequency;
  }

  playNote(note, time) {
    const context = this.audioContext;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    console.log('Playing note:', note, time )

    oscillator.type = note.instrument;
    oscillator.frequency.value = note.frequency;

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(time);
    oscillator.stop(time + note.duration);
  }
  
  play(compressedText) {
    const notes = this.decode(compressedText);
    const context = this.audioContext;
    let currentTime = context.currentTime + 0.1;

    console.log('Notes:', { notes }, 'compressed text:', compressedText)
  
    notes.forEach(note => {
      this.playNote(note, currentTime);
      currentTime += note.duration;
    });
  }
}