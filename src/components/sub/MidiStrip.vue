<script setup>

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

function Ch(e) {
  const ch = parseInt(e.target.id)
  midi.ses.ch = ch
  console.log('set ch', ch)
}

const ch = new Uint8Array(16)

</script>

<template>
  <button v-for="(v,k) in ch" :key="k" :id="k" class="btn sky" :class="k == midi.ses.ch ? 'on' : ''" @click="Ch">{{ k+1 }}</button>
</template>