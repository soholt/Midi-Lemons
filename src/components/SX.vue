<script setup>
//import { ref } from 'vue'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

import RangeCtl from './sub/RangeCtl.vue'

//const def = {}
const props = defineProps({
  sx: {
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
  prop: {
    type: Object,
    required: true,
    //default: null //{
    //    styles: 'green vertical slider',
    //}
  },
})

//const midiCh = ref(1)
console.log('props', props)
function SX(e) {
  let _ch
  props.ch == -1 ? _ch = midi.ses.ch : _ch = props.ch
  
  console.log('sx', { midi:  _ch, key: props.cc, val: e.target.value })

}

</script>

<template>-SX-
    <!--
    <CtlRange
          :id="props.prop.ctl"
          :k="sx"
          :o="ops"
          :p="prop"
          :v="midi.ses.props[midi.ses.ch].val[cc]"
          :f="SX"
        />
-->
</template>