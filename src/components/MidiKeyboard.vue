<script setup>
import { ref } from 'vue'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

//import MidiChannel from './MidiChannel.vue';
import CC from './CC.vue';
import PB from './PB.vue';
import RangeCtl from '@midi/components/sub/RangeCtl.vue'

const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 0
  },
})

// aftertouch
const at = ref(0)
const vel = ref(100) // velocity
function Cc(e){
  const id = e.target.getAttribute('data-id')
  switch(id) {
    case 'at':
      at.value = parseInt(e.target.value)
      break
    case 'vel':
      vel.value = parseInt(e.target.value)
      break
  }
  console.log('Cc:', id, e.target.value, e.target)
}

// is note playing
const playing = ref(false)
const _mousedown = ref(false)

function play(e) {
  //console.log('e.target.mousedown play', e.target.mousedown,  e.target)
  if (!playing.value && _mousedown.value) { // this starts playing the note if mouse enters the key while pressed
  //const ch = parseInt(e.target.getAttribute('data-ch'))
  const note = e.target.getAttribute('data-note')
  //const note = [ch, note, 0x7f]
  midi.NoteOn([0x90 + midi.ses.ch, note, parseInt(vel.value)])
  if(at.value > 0) midi.Tx([0xD0 | midi.ses.ch, parseInt(at.value)])
  playing.value = true
  //console.log('---- play', note, e.target.key)
  }
}
function _play(e) {
  _mousedown.value = true
  play(e)
}

function stop(e) {
  //console.log('e.target.mousedown stop', e.target.mousedown)
  if (playing.value) { // this stops playing the note if mouse moves away from the key
    //const ch = parseInt(e.target.getAttribute('data-ch'))
    const note = e.target.getAttribute('data-note')
    //const note = [0x80, _note, 0x7f]
    midi.NoteOff([0x80 + midi.ses.ch, note, parseInt(vel.value)])
    playing.value = false
    //console.log('---- stop', note)
  }
}
function _stop(e) {
  _mousedown.value = false
  stop(e)
}

const notes = []

const octaves = 3
const start = 0x30
const size = 12 * octaves
for (let i = 0; i < size; i++) {
  notes[i] = start + i
}
</script>

<template>
  <div>
    <table>
      <tr>
        <td>at*</td><td>vel</td><td>pitch</td><td>mod</td><td v-for="(v, k) in notes" :key="k" :id="'k'+k" :data-ch="ch" :data-note="v">{{ midi.note[v].n }}:{{ midi.note[v].o-1 }}</td>
      </tr>
      <tr>
        <td>
          <RangeCtl id="at" :ch="midi.ses.ch" :k="1" :o="{ style: 'vertical', orient: 'vertical', datalist: { key: 'val', 0: 0, 64: 64, 127: 127 } }" :p="midi.ses.ccs['1']" :v="at" :f="Cc" />
        </td>
        <td>
          <RangeCtl id="vel" :ch="midi.ses.ch" :k="7" :o="{ style: 'vertical', orient: 'vertical', datalist: { key: 'val', 0: 0, 64: 64, 127: 127 } }" :p="midi.ses.ccs['7']" :v="vel" :f="Cc" />
        </td>
        <td>
          <PB :ops="{ style: 'vertical', orient: 'vertical', datalist: { key: 'val', 0: 0, 64: 64, 127: 127 } }"/>
        </td>
        <td>
          <CC :cc="0x01" :ops="{ style: 'vertical', orient: 'vertical', datalist: { key: 'val', 0: 0, 64: 64, 127: 127 } }"/>
        </td>
        <td v-for="(v, k) in notes" :key="k" :id="'k'+k" :data-note="v" @mousedown="_play" @mouseup="_stop" @mouseenter="play" @mouseleave="stop" class="key"></td>
      </tr>
    </table>
    at* = After Touch(for testing, sends [0xD0+midi ch, 0xVal] if val > 0);
    vel = Velocity
  </div>
</template>
<style scoped>
table, th, td {
  border: 1px solid rgb(0, 0, 0);
  border-collapse: collapse;
  border-radius: 1px;
}
.key {

  height: 128px;
}
td {
  width: 30px;
  background-color: white;
  color: grey;
}

#k1, #k3, #k6, #k8, #k10,   #k13, #k15, #k18, #k20, #k22,   #k25, #k27, #k30, #k32, #k34 {
  background-color: black;
}
td:hover {background-color: #D6EEEE;}
/*
background: black;
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
}
th, td {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 40px;
}
*/
</style>
