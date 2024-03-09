<script setup>

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

const props = defineProps({
  /**
   * @param {Function} f If passed will return val to the function, else set midi.ses.prop[midi.ses.ch].dev
   */
  f: {
    type: Function,
    required: false,
    default: undefined
  }
})

function Dev(e) {
  console.log('Dev id, typeof f',typeof f === 'function', props.f)
  if(props.f !== undefined) { // return val to caller
    props.f(parseInt(e.target.value))
  } else { // set val on midi ch
    midi.ses.prop[midi.ses.ch].dev = parseInt(e.target.value)
  }
}
</script>

<template>
  <select class="orange" @change="Dev" :value="midi.ses.prop[midi.ses.ch].dev">
    <option v-for="(v,k) in midi.devs" :key="k" :value="k">0x{{ v }} ({{ k }})</option>
  </select>
</template>