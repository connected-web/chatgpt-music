// create an AudioContext
const audioContext = new AudioContext();

// define the notes and their frequencies
const notes = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25
};

// define the melody as an array of note names and durations
const melody = [
  {note: 'C4', duration: 1},
  {note: 'C4', duration: 1},
  {note: 'G4', duration: 1},
  {note: 'G4', duration: 1},
  {note: 'A4', duration: 1},
  {note: 'A4', duration: 1},
  {note: 'G4', duration: 2},
  {note: 'F4', duration: 1},
  {note: 'F4', duration: 1},
  {note: 'E4', duration: 1},
  {note: 'E4', duration: 1},
  {note: 'D4', duration: 1},
  {note: 'D4', duration: 1},
  {note: 'C4', duration: 2},
];

// create a function that plays a single note
function playNote(note, duration, startTime) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.value = notes[note];
  oscillator.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// create a function that plays the melody
export function playMelody() {
  let startTime = audioContext.currentTime;
  for (let i = 0; i < melody.length; i++) {
    const note = melody[i].note;
    const duration = melody[i].duration;
    playNote(note, duration, startTime);
    // update the start time for the next note
    startTime += duration;
    // add a delay between repeated notes
    if (i < melody.length - 1 && melody[i + 1].note === note) {
      startTime += 0.05;
    }
  }
}
