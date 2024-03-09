<script setup>
import { ref, toRaw } from 'vue' //, watch , onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, computed,, getCurrentInstance
import { RouterLink } from 'vue-router'//RouterView

import MidiHistory from '@midi/components/MidiHistory.vue'
import MidiIO from '@midi/components/MidiIO.vue'
import MidiTransport from '@midi/components/MidiTransport.vue'

import ConFig from '@midi/components/ConFig.vue'
import MidiNav from '@midi/components/MidiNav.vue'
import KbdMap from '@midi/components/sub/KbdMap.vue'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()
/*
onBeforeMount(() => {
  if (window.location.hostname == 'localhost') {
    //conf.value = _conf.local
    //if(conf.value.dev) console.log('onBeforeMount conf localhost:', conf.value)
  } else {
    //
  }
})

onBeforeUnmount(() => {
  //if (conf.value.websocket) ws.close()
  //if (conf.value.webmidi) webmidi.close()
})
*/
const views = ref({
  io: 'IO',
  tp: 'Transport',
  midi: 'Midi',
  hist: 'History'
})

function Load() { document.getElementById('doUpload').click() }

</script>

<template>
  <header>
    <RouterLink v-for="(v, k) in midi.vendors" :key="k" :id="k" :to="'/midi/' + v">
      <button :name="v" class="btn lemon" :class="midi.ses.vendor == v ? 'on' : ''">{{ v.charAt(0).toUpperCase() + v.slice(1) }}</button><!-- @click="midi.Vendor"-->
    </RouterLink>
<!--
    <span v-if="midi.router.currentRoute.matched != undefined && midi.router.currentRoute.matched[0] != undefined">
    |
    <RouterLink v-for="(v,k) in midi.router.currentRoute.matched[0].children" :key="k" :to="'/midi/' + midi.ses.vendor + '/' + v.name">
      
      <button :name="midi.ses.vendor" :value="v.name" class="btn lime" :class="midi.router.currentRoute.name == v.name ? 'on' : ''" @click="midi.Vendor">{{ v.meta.txt }}</button>
    </RouterLink>
    |</span>
  -->
<!--<button :name="midi.ses.vendor" :value="v" class="btn lime" :class="midi.ses.device == v ? 'on' : ''" @click="midi.Vendor">{{ midi.deviceTxt[k] }}</button>-->

|
    <RouterLink v-for="(v,k) in midi.devices" :key="k" :to="'/midi/' + midi.ses.vendor + '/' + v">
      <button :name="midi.ses.vendor" :value="v" class="btn lime" :class="midi.router.currentRoute.name == v ? 'on' : ''">{{ midi.deviceTxt[k] }}</button><!-- @click="midi.Vendor"-->
    </RouterLink>
    |
<!--
    |
    <RouterLink v-for="(v,k) in midi.devices" :key="k" :to="'/midi/' + midi.ses.vendor + '/' + v">
      <button :name="midi.ses.vendor" :value="v" class="btn lime" :class="midi.router.currentRoute.name == v ? 'on' : ''" @click="midi.Vendor">{{ midi.deviceTxt[k] }}</button>
    </RouterLink>
    |
    -->
    <button v-for="(v,k) in views" :key="k" :id="k" :name="k" class="btn orange" :class="midi.ses.prop.view[k].show ? 'on' : ''" @click="midi.ses.View">{{ v }}</button>
    | Session: 
    <button class="btn" @click="Load">Load</button>
    <a class="btn sky" @click="midi.ses.Save">Save</a>
    | 
    <button class="btn" name="conf" @click="midi.ses.View" :class="midi.ses.prop.view.conf.show ? 'on':''">Conf</button>
    <button class="btn" @click="console.log(toRaw(midi.ses.prop));console.log(toRaw(midi.router.currentRoute.value))">Log</button>
    
  </header>

  <main>
    <MidiIO v-if="midi.ses.prop.view.io.show" />
    <ConFig v-if="midi.ses.prop.view.conf.show" />
    <MidiTransport v-if="midi.ses.prop.view.tp.show"/>
    <MidiNav v-if="midi.ses.prop.view.midi.show" />
    <MidiHistory v-if="midi.ses.prop.view.hist.show" :ch="midi.ses.ch" />
  </main>

  <KbdMap />

  <input
    type="file"
    id="doUpload"
    name="ses"
    style="display: none"
    ref="fileInput"
    accept=".json"
    @change="midi.ses.Upload"
  />
</template>
