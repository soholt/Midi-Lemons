<script setup>
import { ref } from 'vue'

//import SX from '@midi/components/SX.vue'

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

const show = ref({ sx: true, rt: true })

const ctl = ref({
  sx: 0, // 0 is unused in SysEx, so using it here
  rt: 0, // 0 is unused in SysEx, so using it here
})
function Sx(e) {
  const id = parseInt(e.target.id)
  ctl.value.sx = id
  console.log('Sx', id)
}
function Sxn(e) {
  const id = parseInt(e.target.id)
  const name = parseInt(e.target.name)
  if(isNaN(id)) {
    //pass
  } else {
    //
  }
  console.log('Sxn', name, id)
}
function Rt(e) {
  const id = parseInt(e.target.id)
  ctl.value.rt = id
  console.log('Rt', id)
}
function Rtn(e) {
  const id = parseInt(e.target.id)
  const name = parseInt(e.target.name)
  if(isNaN(id)) {
    //pass
  } else {
    //
  }
  console.log('Rtn', name, id)
}

const map = ref(false)
</script>

<template>

  <h3>
    SysEx: (not implemented) 
    <button class="btn sky" :class="map ? 'on':''" @click="map = !map">Map</button>
  </h3>

  <div v-if="map">Map (..in pregress, more todo)<pre>{{ midi.ses.sxs }}</pre></div>

  <div v-if="show.sx">
    <div>None-Real Time:</div>
    <button v-for="(v, k) in midi.ses.sxs.id[0x7e]" :key="k" :id="k" class="btn lemon" :class="k == ctl.sx ? 'on':''" @click="Sx">{{ v.txt }}</button>
    <div v-if="ctl.sx > 0">
      <span v-for="(v, k) in midi.ses.sxs.id[0x7e][ctl.sx]" :key="k">
        <button v-if="v.txt" :id="k" :name="ctl.sx" class="btn lime" @click="Sxn">{{ v.txt }}</button>
      </span>
    </div>
  </div>

  <div v-if="show.rt">
    <div>Real Time:</div>
    <span><button v-for="(v, k) in midi.ses.sxs.id[0x7f]" :key="k" :id="k" class="btn red" :class="k == ctl.rt ? 'on':''" @click="Rt">{{ v.txt }}</button></span>
    <div v-if="ctl.rt > 0">
      <span v-for="(v, k) in midi.ses.sxs.id[0x7f][ctl.rt]" :key="k">
        <button v-if="v.txt" :id="k" :name="ctl.rt" class="btn lime" @click="Rtn">{{ v.txt }}</button>
      </span>
    </div>
  </div>

</template>
