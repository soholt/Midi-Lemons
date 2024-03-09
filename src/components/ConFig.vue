<script setup>
import { ref } from 'vue'
import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

import MidiIO from './MidiIO.vue'
const ses = ref(false)
</script>

<template>
  <MidiIO />
  <button class="btn sky" @click="ses = !ses" :class="ses ? 'on':''">Session Data</button>
  <button class="btn red" @click="midi.ses.Reset">Reset Session</button>
  <div v-if="ses">
    <h3>Session Data:</h3><pre>{{ midi.ses.prop }}</pre>
  </div>
  <div>
    (Config is saved togeter with session, todo controlls)
    <h3>Config:</h3><pre>{{ midi.ses.conf.midi }}</pre>
  </div>
</template>
