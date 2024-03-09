<script setup>
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

import WebMidi from './sub/WebMidi.vue'
import WebSerial from './sub/WebSerial.vue'
function Src(e) {
  midi.ses.prop.midi.io = e.target.value
}
</script>
<template>
  <div>
    <select name="" :value="midi.ses.prop.midi.io" @change="Src">
      <option value="webMidi">WebMidi</option>
      <option value="webSerial">WebSerial</option>
      <option value="broadcast">Broadcast</option>
    </select>
    <WebMidi v-if="midi.ses.prop.midi.io == 'webMidi'" />
    <WebSerial v-if="midi.ses.prop.midi.io == 'webSerial'" />
    <span v-if="midi.ses.prop.midi.io == 'broadcast'">Broadcast @TODO</span>
  </div>
</template>
