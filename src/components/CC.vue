<script setup>
//import { ref } from 'vue'

import RangeCtl from './sub/RangeCtl.vue'

//import MidiChannel from './MidiChannel.vue';

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

//const def = {}
const props = defineProps({
  cc: {
    type: Number,
    required: true,
  },
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
  },
  /**
   * Allow to provide other than default cc obj
   */
  prop: {
    type: Object,
    required: false,
    default: null //{
    //    styles: 'green vertical slider',
    //}
  },
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
</script>

<template>
  <RangeCtl
    :id="midi.ses.ccs[cc].ctl + '' + cc"
    :ch="ch"
    :k="cc"
    :o="ops"
    :p="(prop == null) ? midi.ses.ccs[cc] : prop"
    :v="midi.ses.prop[midi.ses.ch].cc[cc]"
    :f="midi.CC"
  />
</template>