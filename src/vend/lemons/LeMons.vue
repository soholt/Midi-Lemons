<script setup>
//import { ref } from 'vue'

//import { useMidiStore } from '@midi/stores/midi'
//const midi = useMidiStore()

//import NavView from '@midi/instruments/NavView.vue'
//import CtlRange from '@midi/components/CtlRange.vue'

/*
import CCS from './cc/CCS.vue'
import SXS from './sx/SXS.vue'
import TooLs from './tools/TooLs.vue'
//import ExAmple from './example/ExAmple.vue'

const view = ref({cc: false, sysex: false, tools: false, vendors: false})
function View(e) {
  console.log('View',e.target.id)
  view.value[e.target.id] = !view.value[e.target.id]
}
*/
</script>

<template>
  <h3>Midi-Lemons</h3>
  <!--
  <button @click="View" id="cc" :class="view.cc ? 'router-link-active':''" class="lime btn">Control Change</button>
  <button @click="View" id="sysex" :class="view.sysex ? 'router-link-active':''" class="lime btn">SysEx</button>
  <button @click="View" id="tools" :class="view.tools ? 'router-link-active':''" class="lime btn">Tools</button>
  
  <br /><br /><hr />

  <CCS v-if="view.cc" />
  <SXS v-if="view.sysex" />
  <TooLs v-if="view.tools" />
-->
To dev:
<ul>
  <li>To send midi: midi.Tx([0xF0, 0xF7]) (need to import useMidiStore first)</li>
  <li>To send CC commands, import @midi/components/CC.vue and provide cc id</li>
  <li>/src/stores is where the session, maps and functions live</li>
  <li>/src/components - reusable components, ./sub/parts used in components</li>
  <li>/src/vend is where vendors and diy live</li>
  <li>To Create Your own controller, copy/paste one of /src/vend/vendor and rename it</li>
  <li>Update your routes.js with instruments and add yourself to /src/vend/routes.js for buttons to appear</li>
  <li>/public/midi/vendors/etc - where conf/mappings etc can be kept and easily edited .json & .js? @TODO(to keep the main app size to a min?todo)</li>
</ul>
</template>
