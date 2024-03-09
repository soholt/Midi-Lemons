<script setup>
import { ref } from 'vue'
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

const view = ref('vendors')
</script>

<template>
  <div>
    <button @click="view=''" id="cc" :class="view = 'vendors' ? 'on':''" class="lime btn">Vendors</button>
    @TODO, please suggest
  </div>
  <div v-if="view = 'vendors'">
    <p>Brand DEC Ids: (or view it in hex @midi/store/map/vend.js)</p>
    <pre>{{ midi.vendor }}</pre>
  </div>
</template>
