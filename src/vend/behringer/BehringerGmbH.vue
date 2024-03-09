<script setup>
/**
 * This is your chance to do copy/paste Behringer
 * Copy this as an example and adjust as needed
 */
//import DDX3216 from './ddx3216/DDX3216.vue'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

/**
 * Since its only 1 device, show it here,
 * if not using router, must set device manualy
 */
// midi.Vendor({target:{name:'behringer', value:'ddx3216'}})//midi.Device('ddx3216')

/**
 * Create seesion per MIDI Ch for vendor if needed, or comment it out to save ram
 * This will be used in DDX3216 or other devices, so define it here if used
 * This will create midi.ses.prop[midi.ses.ch].vend.behr = {}
 * Then per device per ch @SEE DDX3216.vue midi.ses.prop[midi.ses.ch].vend.behr['ddx3216'] = {} 
 */
//midi.ses.CreateCh('behr')



//<DDX3216 />
</script>
<template>
  <div>
    <h3>{{ midi.vendor[0x00][0x20][0x32] }}</h3>
  </div>
  Implemented pan/vol - CC and SX controls for DDX3216
</template>