<script setup>
import { ref } from 'vue'
//import { VBtn, VSlider, VTextField } from 'vuetify/components'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

//import { useMidiStore } from '@midi/stores/midi'
//const midi = useMidiStore()

import CC from './CC.vue'
//import SX from './SX.vue'
/*
const v = {
  min: 0,
  max: 127,
  type: 'range',
  name: 'vol',
  txt: 'Vol',
  def: 100,
  val: 100,
  ops: { vertical: true, height: 127, skin: 'dexed' }
}
// { txt:txt, name:'cc', min: 0, max: 127, def: 0, type: 'range', meta: d, show: true }
console.log('midi.ses.props', midi.ses.props)
function vol(e) {
  const key = parseInt(e.target.getAttribute('data-key'))
  const val = parseInt(e.target.value)
  console.log('vol pre:',midi.ses.props[key].val[0x07], key, e.target.id, e.target.value)
  if (key === 0) {
    //sysex
  } else {
    midi.ses.props[key].val[0x07] = val
  }
  console.log('vol post:',midi.ses.props[key].val[0x07], key, e.target.id, e.target.value)
}


// midi ch key => label mapping
const chs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
function setCh(e) {
  midi.ses.ch = parseInt(e.target.id)
  console.log('setCh', midi.ses.ch)
}
const isActive = ref(true)
// v-model="midi.ses.ch"
 :class="{ active: isActive }"
  :prop="midi.ses.ccs[0x07]"
*/
</script>

<template>
  <table><!-- to solo || !to solo? expensive!
    <tr>
      <td v-for="i in 17" :key="i">
        <button class="btn red btn40" :class="{ active: isActive }">S</button>
      </td>
    </tr>-->
    <tr>
      <td class="mix-tbl" v-for="i in midi.ses.conf.midi.chs" :key="i">
        <button class="btn lemon mix-btn">M{{ i }}</button>
      </td>
    </tr>
    <tr>
      <td v-for="(v,k) in midi.ses.conf.midi.chs" :key="k">
        <CC :cc="0x0A" :ch="k" :ops="{style:'vertical', orient:'verical', datalist: { key: 'val', 0: 0, 64: 64, 100:100, 127: 127 }}" />
      </td>
    </tr>
    <tr>
      <td v-for="(v,k) in midi.ses.conf.midi.chs" :key="k">
        <CC :id="v" :cc="0x07" :ch="k" :ops="{style:'vertical', orient:'verical', datalist: { key: 'val', 0: 0, 64: 64, 100:100, 127: 127 }}" />
      </td>
      <td>
        <!--<SX :sx="0x07" :prop="midi.ses.ccs[0x07]" :ops="{style:'vertical red btn40'}" />-->
      </td>
    </tr><!--
    <tr>
      <td v-for="(v,k) in chs" :key="k">reset
        <button @click="setCh" :id="k" class="btn green btn40" :class="midi.ses.ch == k ? 'router-link-active':''">
          {{ v }}
        </button>
      </td>
      <td>
        <button class="btn blue btn40" >Main</button>
      </td>
    </tr>-->
  </table>

  <!--
  <v-slider
    color="orange"
    id="a"
    :min="v.min"
    :max="v.max"
    hide-details
    step="1"
  ></v-slider>
  -->
</template>
<style scoped></style>
