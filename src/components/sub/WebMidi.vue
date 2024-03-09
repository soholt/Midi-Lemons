<script setup>
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()
//<button id="k" class="btn sky" >switch on/off</button>
</script>

<template>
  <select v-model="midi.webMidi.out" class="sky">
    <option v-for="(v, k) in midi.webMidi.outs" :key="k" :value="v.id">Lemons OUT ---&gt; {{ v.name }}</option>
  </select>
  <select v-model="midi.webMidi._in" class="sky">
    <option v-for="(v, k) in midi.webMidi.ins" :key="k" :value="v.id">Lemons IN &lt;--- {{ v.name }}</option>
  </select><!--
  listen(rx): @TODO
<ul>
  <li>cc</li>
  <li>sx rt</li>
  <li>sx nrt</li>
  <li>MMC</li>
  <li>MTC</li>
  <li>CLK</li>
  <li>etc</li>
</ul>-->
</template>
