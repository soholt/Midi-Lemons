<script setup>
import { toRaw } from 'vue'

import RangeHd from './sub/RangeHd.vue'

//import MidiChannel from './MidiChannel.vue';

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

//const def = {}
const props = defineProps({
  /*
  cc: {
    type: Number,
    required: true,
  },
  */
  ch: {
    type: Number,
    required: false,
    default: -1
  },
  ops: {
    type: Object,
    required: false,
    //default: null //{
    //    styles: 'green vertical slider',
    //}
  },/*
  prop: {
    type: Object,
    required: true,
    //default: null //{
    //    styles: 'green vertical slider',
    //}
  },*/
})
/*
//const midiCh = ref(1)
//console.log('props', props)
function CC(e) {
  let _ch
  const val = parseInt(e.target.value)

  props.ch == -1 ? _ch = midi.ses.ch : _ch = props.ch
  
  //if(props.prop.ctl === 'cc') {
  //  console.log('cc', { ch:  _ch, key: props.cc, val: e.target.value })
  //} else {
  //  console.log('sx', { ch:  _ch, key: props.cc, val: e.target.value })
  //}

  //midi.Tx([0xb0 + _ch, props.cc, val])
  console.log('cc', { ch:  _ch, key: props.cc, val: val })
  midi.CC({ ch:  _ch, key: props.cc, val: val })
}
*/
//function PB(o) {
  //console.log('--PB', toRaw(o))
//  midi.PB([o.msb, o.lsb])
//}
// Reset to default 63
function OnMouseUp(e) {
  console.log('OnMouseUp',e.target.id)
  // reset
}
const max = 16383 // (0x7f*0x80+0x80)-1 rm
const prop = { txt: 'Ptch Bnd', text: 'Pitch Bend', msb:{def:0x3F, min:0, max:0x7F}, lsb:{def:0, min:0, max:0x7F }, sum:{min:0,max:max}, show: { sum:true }, name: 'pb', type: 'range'}//@TODO rm sum
</script>

<template>
    
    <RangeHd
          id="pitch-bend"
          :ch="ch"
          :k="0xE0"
          :o="ops"
          :p="prop"
          :v="midi.ses.prop[midi.ses.ch].pb"
          :f="midi.PB"
          :mouseup="OnMouseUp"
        />

</template>