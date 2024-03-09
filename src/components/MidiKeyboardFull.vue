<script setup>
import { ref } from 'vue'

//import { useDX7Store } from '@midi/stores/dx7'
//const dx7 = useDX7Store()

import MidiKeyboard from '@midi/components/MidiKeyboard.vue'

const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 1
  }
})

const midiCh = ref(1)
</script>

<template>
  <div id="piano">
    <span v-for="i in 16" :key="i">
      <input :value="i" :id="'ch' + i" :data-ch="i" :name="'MIDICh' + i" v-model="midiCh" type="radio" class="btn-check" autocomplete="off" />
      <label class="btn btn-outline-success" :for="'ch' + i">{{ i }}</label>
    </span>
    <MidiKeyboard :ch="midiCh" />
  </div><hr >
</template>