<script setup>
//import { ref } from 'vue'
//import { useRoute, RouterLink, RouterView } from 'vue-router'

import CCS from './sub/CCS.vue'
import MidiKeyboard from './MidiKeyboard.vue'
import MidiMix from './MidiMix.vue'
//import MidiHistory from './MidiHistory.vue'
import MidiBank from './MidiBank.vue'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()
/*
const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 0 // ch = (ch - 1), always 1 less
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7F
  },
})
*/
const views = {
  mix: 'Mix',
  bank: 'Bank',
  ccs: 'CC',
  kbd: 'Keyboard'
}
</script>

<template>
  <table>
    <tr>
      <td class="mix-tbl" v-for="(v,k) in midi.ses.conf.midi.chs" :key="k">
        <button :value="k" class="btn sky mix-btn" :class="k == midi.ses.ch ? 'on' : ''" @click="midi.CH">{{ k+1 }}</button>
      </td>
      <td>
        <button v-for="(v,k) in views" :key="k" :id="k" :name="k" class="btn orange" :class="midi.ses.prop.view[k].show ? 'on' : ''" @click="midi.ses.View">{{ v }}</button>
      </td>
    </tr>
  </table>
  <MidiMix v-if="midi.ses.prop.view.mix.show" />
  <MidiBank v-if="midi.ses.prop.view.bank.show" :ch="midi.ses.ch" /><!--@TODO ch-->
  <CCS v-if="midi.ses.prop.view.ccs.show" /><!--@TODO ch-->
  <MidiKeyboard v-if="midi.ses.prop.view.kbd.show" /><!--@TODO ch-->
</template>
