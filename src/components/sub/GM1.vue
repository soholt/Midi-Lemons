<script setup>
/**
 * General MIDI System Level 1
 * 
 * General MIDI Protocol Implementation Requirements:

    Note on/Note off:
      • Octave Registration: Middle C = MIDI Key 60 (3CH)
      • All voices, including percussion, respond to velocity
      • Voices dynamically allocated (notes/drums can re-attack using free voices)

    Controller Changes:
      Controller #  Description @TODO
      1             Modulation
      7             Volume
      10            Pan
      11            Expression
      64            Sustain
      121           Reset All Controllers
      123           All Notes Off

      Registered Parameter #  Description
      0                       Pitch Bend Sensitivity @TODO
      1                       Fine Tuning @TODO
      2                       Coarse Tuning @TODO

    Channel Messages:
      • Channel Pressure (Aftertouch)
      • Pitch Bend (default range = ±2 semitones)
    Default Settings:
      • Bend="0", Volume="100" (0-127), Controllers "normal"
  */
import { ref } from 'vue'

import DeviceId from './DeviceId.vue'

import { useMidiStore } from '../../stores/midi'
const midi = useMidiStore()

const props = defineProps({
  ch: { // @TODO
    type: Number,
    required: true,
  },
})

// By category
const cat = ref(0)  // selected cat
const gm1Cats = [ // Show buttons?
  'All',          //  0
  'Piano',        //  1 1-8
  'Chromatic Percussion', // 2 9-16
  'Organ',        //  3 17-24
  'Guitar',       //  4 25-32
  'Bass',         //  5 33-40
  'Strings',      //  6 41-48
  'Ensemble',     //  7 49-56
  'Brass',        //  8 57-64
  'Reed',         //  9 65-72
  'Pipe',         // 10 73-80
  'Synth Lead',   // 11 81-88
  'Synth Pad',    // 12 89-96
  'Synth Effects',// 13 97-104
  'Ethnic',       // 14 105-112
  'Percussive',   // 15 113-120
  'Sound Effects',// 16 121-128
]

const map = [
  [0, 127],
  [0,7],
  [8,15],
  [16,23],
  [24,31],
  [32,39],
  [40,47],
  [48,55],
  [56,63],
  [64,71],
  [72,79],
  [80,87],
  [88,95],
  [96,103],
  [104,111],
  [112,119],
  [120,127]
]

function Cat(e) {
  cat.value = e.target.value
}
/*
  const mapb = {
  0: [0, 127],
  1: [0,7],
  2: [8,15],
  3: [16,23],
  4: [24,31],
  5: [32,39],
  6: [40,47],
  7: [48,55],
  8: [56,63],
  9: [64,71],
  10:[72,79],
  11:[80,87],
  12:[88,95],
  13:[96,103],
  14:[104,111],
  15:[112,119],
  16:[120,127],
  }

  const mapa = {
  0: { t:'All', m:[0, 127]},
  1: { t:'Piano', m:[0,7]},
  2: { t:'Chromatic Perc.', m:[8,15]},
  3: { t:'Organ', m:[16,23]},
  4: { t:'Guitar', m:[24,31]},
  5: { t:'Bass', m:[32,39]},
  6: { t:'Strings', m:[40,47]},
  7: { t:'Ensemble', m:[48,55]},
  8: { t:'Brass', m:[56,63]},
  9: { t:'Reed', m:[64,71]},
  10: { t:'Pipe', m:[72,79]},
  11: { t:'Synth Lead', m:[80, 87]},
  12: { t:'Synth Pad', m:[88,95]},
  13: { t:'Synth Effects', m:[96,103]},
  14: { t:'Ethnic', m:[104,111]},
  15: { t:'Percussive', m:[112,119]},
  16: { t:'Sound Effects', m:[120,127]},
  }
*/
function DrumOn(e) { // send to midi ch 10
    midi.Tx([0x9A, parseInt(e.target.id), 127])
    //console.log('DrumOn', e.target.id)
}
function DrumOff(e) { // send to midi ch 10
    midi.Tx([0x8A, parseInt(e.target.id), 127])
    //console.log('DrumOff', e.target.id)
}

/*
Turn General MIDI System On: F0 7E <device ID> 09 01 F7
Turn General MIDI System Off: F0 7E <device ID> 09 02 F7
*/
function GmState() {
  midi.ses.prop[midi.ses.ch].gm1.on = !midi.ses.prop[midi.ses.ch].gm1.on
  if(midi.ses.prop[midi.ses.ch].gm1.on == true) midi.Tx([0xF0, 0x7E, midi.ses.prop[midi.ses.ch].dev, 0x09, 0x01, 0xF7])
  if(midi.ses.prop[midi.ses.ch].gm1.on == false) midi.Tx([0xF0, 0x7E, midi.ses.prop[midi.ses.ch].dev, 0x09, 0x02, 0xF7])
}
//console.log({gm1:gm1,gm1Keys:Object.values(gm1)})
</script>

<template>
  <!--
  | Cats <select class="sky" @change="Cat" v-model="cat">
    <option v-for="(v,k) in gm1Cats" :key="k" :value="k">{{ v }}</option>
    </select>
-->
  | Voice <select class="sky" name="vox" @change="midi.PC" v-model="midi.ses.prop[ch].pc">
     <!--<option v-for="(v,k) in Object.fromEntries(Object.entries(gm1).slice(start, end))" :key="k" :value="k">{{ String(Number(k)+1).padStart(3, '0') }} - {{ v }}</option>-->
     <option v-for="(v,k) in gm1a.slice(map[cat][0], map[cat][1])" :key="k" :value="k+map[cat][0]">{{ String(Number(k+map[cat][0])+1).padStart(3, '0') }} - {{ v }}</option>
     <!--<option v-for="(v,k) in Object.entries(gm1).slice(map[cat][0], map[cat][1]).map(entry => entry[1])" :key="k" :value="k+map[cat][0]">{{ String(Number(k+map[cat][0])+1).padStart(3, '0') }} - {{ v }}</option>-->
    </select>

  | <button class="btn orange" @click="midi.ses.prop[midi.ses.ch].gm1.cats = !midi.ses.prop[midi.ses.ch].gm1.cats" :class="midi.ses.prop[midi.ses.ch].gm1.cats ? 'on':''">Cats</button>
  | <button class="btn orange" @click="midi.ses.prop[midi.ses.ch].gm1.drums = !midi.ses.prop[midi.ses.ch].gm1.drums" :class="midi.ses.prop[midi.ses.ch].gm1.drums ? 'on':''">Drums</button>

  | Device Id <DeviceId /> <button class="btn lime" @click="GmState" :class="midi.ses.prop[midi.ses.ch].gm1.on ? 'on':''">GM On/Off</button>

  <div v-if="midi.ses.prop[midi.ses.ch].gm1.cats">
    <button v-for="(v,k) in gm1Cats" :key="k" :value="k" class="btn lemon" @click="Cat" :class="cat == k ? 'on':''">{{ v }}</button>
    <!--<button v-for="(v,k) in Object.entries(gm1).slice(map[cat][0], map[cat][1]).map(entry => entry[1])" :key="k" :value="k+map[cat][0]" class="btn lime" @click="midi.PC" :class="midi.ses.prop[ch].pc == k+map[cat][0] ? 'on':''">{{ v }}</button>-->
    <button v-for="(v,k) in gm1a.slice(map[cat][0], map[cat][1])" :key="k" :value="k+map[cat][0]" class="btn lime" @click="midi.PC" :class="midi.ses.prop[ch].pc == k+map[cat][0] ? 'on':''">{{ v }}</button>
  </div>

  <div v-if="midi.ses.prop[midi.ses.ch].gm1.drums">
    <button v-for="(v,k) in gm1Drums" :key="k" :id="k" class="btn sky" @mousedown="DrumOn" @mouseup="DrumOff">{{ v }}</button> (Drums are on MIDI ch: 10)
  </div>

</template>
<script>
/**
 * @link from GENERAL MIDI LEVEL 1  - RP-003_General_MIDI_System_Level_1_Specification_96-1-4_0.1 spec

const gm1 = {

  0: 'Acoustic Grand Piano',
  1: 'Bright Acoustic Piano',
  2: 'Electric Grand Piano',
  3: 'Honky-tonk Piano',
  4: 'Electric Piano 1',
  5: 'Electric Piano 2',
  6: 'Harpsichord',
  7: 'Clavinet',

  //Chromatic Percussion:
  8: 'Celesta',
  9: 'Glockenspiel',
  10: 'Music Box',
  11: 'Vibraphone',
  12: 'Marimba',
  13: 'Xylophone',
  14: 'Tubular Bells',
  15: 'Dulcimer',

  //Organ:
  16: 'Drawbar Organ',
  17: 'Percussive Organ',
  18: 'Rock Organ',
  19: 'Church Organ',
  20: 'Reed Organ',
  21: 'Accordion',
  22: 'Harmonica',
  23: 'Tango Accordion',

  //Guitar:
  24: 'Acoustic Guitar (nylon)',
  25: 'Acoustic Guitar (steel)',
  26: 'Electric Guitar (jazz)',
  27: 'Electric Guitar (clean)',
  28: 'Electric Guitar (muted)',
  29: 'Overdriven Guitar',
  30: 'Distortion Guitar',
  31: 'Guitar harmonics',

  //Bass:
  32: 'Acoustic Bass',
  33: 'Electric Bass (finger)',
  34: 'Electric Bass (pick)',
  35: 'Fretless Bass',
  36: 'Slap Bass 1',
  37: 'Slap Bass 2',
  38: 'Synth Bass 1',
  39: 'Synth Bass 2',

  //Strings:
  40: 'Violin',
  41: 'Viola',
  42: 'Cello',
  43: 'Contrabass',
  44: 'Tremolo Strings',
  45: 'Pizzicato Strings',
  46: 'Orchestral Harp',
  47: 'Timpani',

  //Strings (continued):
  48: 'String Ensemble 1',
  49: 'String Ensemble 2',
  50: 'Synth Strings 1',
  51: 'Synth Strings 2',
  52: 'Choir Aahs',
  53: 'Voice Oohs',
  54: 'Synth Voice',
  55: 'Orchestra Hit',

  //Brass:
  56: 'Trumpet',
  57: 'Trombone',
  58: 'Tuba',
  59: 'Muted Trumpet',
  60: 'French Horn',
  61: 'Brass Section',
  62: 'Synth Brass 1',
  63: 'Synth Brass 2',

  //Reed:
  64: 'Soprano Sax',
  65: 'Alto Sax',
  66: 'Tenor Sax',
  67: 'Baritone Sax',
  68: 'Oboe',
  69: 'English Horn',
  70: 'Bassoon',
  71: 'Clarinet',

  //Pipe:
  72: 'Piccolo',
  73: 'Flute',
  74: 'Recorder',
  75: 'Pan Flute',
  76: 'Blown Bottle',
  77: 'Shakuhachi',
  78: 'Whistle',
  79: 'Ocarina',

  //Synth Lead:
  80: 'Lead 1 (square)',
  81: 'Lead 2 (sawtooth)',
  82: ' Lead 3 (calliope)',
  83: 'Lead 4 (chiff)',
  84: 'Lead 5 (charang)',
  85: 'Lead 6 (voice)',
  86: 'Lead 7 (fifths)',
  87: 'Lead 8 (bass + lead)',

  //Synth Pad:
  88: 'Pad 1 (new age)',
  89: 'Pad 2 (warm)',
  90: 'Pad 3 (polysynth)',
  91: 'Pad 4 (choir)',
  92: 'Pad 5 (bowed)',
  93: 'Pad 6 (metallic)',
  94: 'Pad 7 (halo)',
  95: 'Pad 8 (sweep)',

  //Synth Effects:
  96: 'FX 1 (rain)',
  97: 'FX 2 (soundtrack)',
  98: 'FX 3 (crystal)',
  99: 'FX 4 (atmosphere)',
  100: 'FX 5 (brightness)',
  101: 'FX 6 (goblins)',
  102: 'FX 7 (echoes)',
  103: 'FX 8 (sci-fi)',

  //Ethnic:
  104: 'Sitar',
  105: 'Banjo',
  106: 'Shamisen',
  107: 'Koto',
  108: 'Kalimba',
  109: 'Bag pipe',
  110: 'Fiddle',
  111: 'Shanai',

  //Percussive:
  112: 'Tinkle Bell',
  113: 'Agogo',
  114: 'Steel Drums',
  115: 'Woodblock',
  116: 'Taiko Drum',
  117: 'Melodic Tom',
  118: 'Synth Drum',

  //Sound effects:
  119: 'Reverse Cymbal',
  120: 'Guitar Fret Noise',
  121: 'Breath Noise',
  122: 'Seashore',
  123: 'Bird Tweet',
  124: 'Telephone Ring',
  125: 'Helicopter',
  126: 'Applause',
  127: 'Gunshot',
}
 */
const gm1a = [ // @TODO make it into json?

 'Acoustic Grand Piano',
 'Bright Acoustic Piano',
 'Electric Grand Piano',
 'Honky-tonk Piano',
 'Electric Piano 1',
 'Electric Piano 2',
 'Harpsichord',
 'Clavinet',

//Chromatic Percussion:
 'Celesta',
 'Glockenspiel',
 'Music Box',
 'Vibraphone',
 'Marimba',
 'Xylophone',
 'Tubular Bells',
 'Dulcimer',

//Organ:
 'Drawbar Organ',
 'Percussive Organ',
 'Rock Organ',
 'Church Organ',
 'Reed Organ',
 'Accordion',
 'Harmonica',
 'Tango Accordion',

//Guitar:
 'Acoustic Guitar (nylon)',
 'Acoustic Guitar (steel)',
 'Electric Guitar (jazz)',
 'Electric Guitar (clean)',
 'Electric Guitar (muted)',
 'Overdriven Guitar',
 'Distortion Guitar',
 'Guitar harmonics',

//Bass:
 'Acoustic Bass',
 'Electric Bass (finger)',
 'Electric Bass (pick)',
 'Fretless Bass',
 'Slap Bass 1',
 'Slap Bass 2',
 'Synth Bass 1',
 'Synth Bass 2',

//Strings:
 'Violin',
 'Viola',
 'Cello',
 'Contrabass',
 'Tremolo Strings',
 'Pizzicato Strings',
 'Orchestral Harp',
 'Timpani',

//Strings (continued):
 'String Ensemble 1',
 'String Ensemble 2',
 'Synth Strings 1',
 'Synth Strings 2',
 'Choir Aahs',
 'Voice Oohs',
 'Synth Voice',
 'Orchestra Hit',

//Brass:
 'Trumpet',
 'Trombone',
 'Tuba',
 'Muted Trumpet',
 'French Horn',
 'Brass Section',
 'Synth Brass 1',
 'Synth Brass 2',

//Reed:
 'Soprano Sax',
 'Alto Sax',
 'Tenor Sax',
 'Baritone Sax',
 'Oboe',
 'English Horn',
 'Bassoon',
 'Clarinet',

//Pipe:
 'Piccolo',
 'Flute',
 'Recorder',
 'Pan Flute',
 'Blown Bottle',
 'Shakuhachi',
 'Whistle',
 'Ocarina',

//Synth Lead:
 'Lead 1 (square)',
 'Lead 2 (sawtooth)',
 'Lead 3 (calliope)',
 'Lead 4 (chiff)',
 'Lead 5 (charang)',
 'Lead 6 (voice)',
 'Lead 7 (fifths)',
 'Lead 8 (bass + lead)',

//Synth Pad:
 'Pad 1 (new age)',
 'Pad 2 (warm)',
 'Pad 3 (polysynth)',
 'Pad 4 (choir)',
 'Pad 5 (bowed)',
 'Pad 6 (metallic)',
 'Pad 7 (halo)',
 'Pad 8 (sweep)',

//Synth Effects:
 'FX 1 (rain)',
 'FX 2 (soundtrack)',
 'FX 3 (crystal)',
 'FX 4 (atmosphere)',
 'FX 5 (brightness)',
 'FX 6 (goblins)',
 'FX 7 (echoes)',
 'FX 8 (sci-fi)',

//Ethnic:
 'Sitar',
 'Banjo',
 'Shamisen',
 'Koto',
 'Kalimba',
 'Bag pipe',
 'Fiddle',
 'Shanai',

//Percussive:
 'Tinkle Bell',
 'Agogo',
 'Steel Drums',
 'Woodblock',
 'Taiko Drum',
 'Melodic Tom',
 'Synth Drum',

//Sound effects:
 'Reverse Cymbal',
 'Guitar Fret Noise',
 'Breath Noise',
 'Seashore',
 'Bird Tweet',
 'Telephone Ring',
 'Helicopter',
 'Applause',
 'Gunshot'
]

const gm1Drums = {
  35:'Acoustic Bass Drum',
  36:'Bass Drum 1',
  37:'Side Stick',
  38:'Acoustic Snare',
  39:'Hand Clap',
  40:'Electric Snare',
  41:'Low Floor Tom',
  42:'Closed Hi Hat',
  43:'High Floor Tom',
  44:'Pedal Hi-Hat',
  45:'Low Tom',
  46:'Open Hi-Hat',
  47:'Low-Mid Tom',
  48:'Hi Mid Tom',
  49:'Crash Cymbal 1',
  50:'High Tom',
  51:'Ride Cymbal 1',
  52:'Chinese Cymbal',
  53:'Ride Bell',
  54:'Tambourine',
  55:'Splash Cymbal',
  56:'Cowbell',
  57:'Crash Cymbal 2',
  58:'Vibraslap',
  59:'Ride Cymbal 2',
  60:'Hi Bongo',
  61:'Low Bongo',
  62:'Mute Hi Conga',
  63:'Open Hi Conga',
  64:'Low Conga',
  65:'High Timbale',
  66:'Low Timbale',
  67:'High Agogo',
  68:'Low Agogo',
  69:'Cabasa',
  70:'Maracas',
  71:'Short Whistle',
  72:'Long Whistle',
  73:'Short Guiro',
  74:'Long Guiro',
  75:'Claves',
  76:'Hi Wood Block',
  77:'Low Wood Block',
  78:'Mute Cuica',
  79:'Open Cuica',
  80:'Mute Triangle',
  81:'Open Triangle'
}

/*
 const gm1a = [
//Piano:
'Acoustic Grand Piano',
'Bright Acoustic Piano',
'Electric Grand Piano',
'Honky-tonk Piano',
'Electric Piano 1',
'Electric Piano 2',
'Harpsichord',
'Clavinet',

//Chromatic Percussion:
'Celesta',
'Glockenspiel',
'Music Box',
'Vibraphone',
'Marimba',
'Xylophone',
'Tubular Bells',
'Dulcimer',

//Organ:
'Drawbar Organ',
'Percussive Organ',
'Rock Organ',
'Church Organ',
'Reed Organ',
'Accordion',
'Harmonica',
'Tango Accordion',

//Guitar:
'Acoustic Guitar (nylon)',
'Acoustic Guitar (steel)',
'Electric Guitar (jazz)',
'Electric Guitar (clean)',
'Electric Guitar (muted)',
'Overdriven Guitar',
'Distortion Guitar',
'Guitar harmonics',

//Bass:
'Acoustic Bass',
'Electric Bass (finger)',
'Electric Bass (pick)',
'Fretless Bass',
'Slap Bass 1',
'Slap Bass 2',
'Synth Bass 1',
'Synth Bass 2',

//Strings:
'Violin',
'Viola',
'Cello',
'Contrabass',
'Tremolo Strings',
'Pizzicato Strings',
'Orchestral Harp',
'Timpani',

//Strings (continued):
'String Ensemble 1',
'String Ensemble 2',
'Synth Strings 1',
'Synth Strings 2',
'Choir Aahs',
'Voice Oohs',
'Synth Voice',
'Orchestra Hit',

//Brass:
'Trumpet',
'Trombone',
'Tuba',
'Muted Trumpet',
'French Horn',
'Brass Section',
'Synth Brass 1',
'Synth Brass 2',

//Reed:
'Soprano Sax',
'Alto Sax',
'Tenor Sax',
'Baritone Sax',
'Oboe',
'English Horn',
'Bassoon',
'Clarinet',

//Pipe:
'Piccolo',
'Flute',
'Recorder',
'Pan Flute',
'Blown Bottle',
'Shakuhachi',
'Whistle',
'Ocarina',

//Synth Lead:
'Lead 1 (square)',
'Lead 2 (sawtooth)',
' Lead 3 (calliope)',
'Lead 4 (chiff)',
'Lead 5 (charang)',
'Lead 6 (voice)',
'Lead 7 (fifths)',
'Lead 8 (bass + lead)',

//Synth Pad:
'Pad 1 (new age)',
'Pad 2 (warm)',
'Pad 3 (polysynth)',
'Pad 4 (choir)',
'Pad 5 (bowed)',
'Pad 6 (metallic)',
'Pad 7 (halo)',
'Pad 8 (sweep)',

//Synth Effects:
'FX 1 (rain)',
'FX 2 (soundtrack)',
'FX 3 (crystal)',
'FX 4 (atmosphere)',
'FX 5 (brightness)',
'FX 6 (goblins)',
'FX 7 (echoes)',
'FX 8 (sci-fi)',

//Ethnic:
'Sitar',
'Banjo',
'Shamisen',
'Koto',
'Kalimba',
'Bag pipe',
'Fiddle',
'Shanai',

//Percussive:
'Tinkle Bell',
'Agogo',
'Steel Drums',
'Woodblock',
'Taiko Drum',
'Melodic Tom',
'Synth Drum',

//Sound effects:
'Reverse Cymbal',
'Guitar Fret Noise',
'Breath Noise',
'Seashore',
'Bird Tweet',
'Telephone Ring',
'Helicopter',
'Applause',
'Gunshot',
]
*/
</script>