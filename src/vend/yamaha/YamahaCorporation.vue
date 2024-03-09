<script setup>
//import { ref } from 'vue'
//import { RouterLink, RouterView } from 'vue-router'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

//import routes from './routes'
//console.log('Yamaha routes',routes)

//const view = ref({ini:true, dx7: true, tx802: false, voice:false, mix:false, vis:false})
//function View(e) {console.log('View',e.target.id)
//  view.value[e.target.id] = !view.value[e.target.id]
//}

//   <span @click="View" id="dx7" :class="view.dx7 ? 'router-link-active':''" class="green btn">dx7</span>
//<span @click="View" id="tx802" :class="view.tx802 ? 'router-link-active':''" class="green btn">tx802</span>

//import DX7 from './dx7/DX7.vue'
//<DX7 :ch="midi.ses.ch" />
</script>

<template>
  <h3>{{ midi.vendor[0x43] }}</h3>
  DX7:
  <ul>
    <li>Ini should work, defaults unknown</li>
    <li>Voice edit should work (@TODO should load some vox params if open bank match existing?) </li>
    <li>Open and send Bank .syx 4014 bytes ('headless' 4096 should work)</li>
    <li>Open (edit) and send Voice .syx 165 bytes, + check sum calc</li>
    <li>Included cc for dev (2 switches don't work yet, needs custom vals that cc midi)</li>
    <li>For dev added After Touch and Velocity to midi keyboard</li>
    <li>Suggest</li>
    <li>---</li>
    <li>@TODO messed up midi ch separation..</li>
  </ul>
</template>
