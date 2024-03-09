<script setup>
import { onBeforeMount, onUnmounted } from 'vue'//onBeforeUnmount
import DeviceId from '../../../components/sub/DeviceId.vue'
import CC from './CC.vue'
import SX from './SX.vue'
import map from './map.js'
import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 15 // Ch 16 = (16 - 1)
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7F
  },
})

const restore = midi.ses.ch // Save current MIDI Ch
onUnmounted(() => { midi.Ch(restore) }) // Restore midi ch, when browsing away

/**
 * Set default to MIDI Ch to 16(val=16-1), as timing and time code msgs(SysEs RT/non-RT) might be traveling,
 * including CC, so that it does not interfere with other devices (user changeble in Ui Midi)
 */
//onBeforeMount(() => {
  midi.Ch(props.ch)
  //Create(midi.ses.ch) //console.log('ses ddx3216', toRaw(midi.ses.prop[midi.ses.ch].vend.behr))
//})

// SX defaults
const panDef = 30
const volDefM = 0 // 0dB = 0x0A // M = MSB; L = LSB; S = SUM
const volDefL = 0 // 0dB = 0x00
const volDefS = 0 // 0dB = 1280

midi.ses.CreateChs({
  ddx3216: {
    dev: props.dev,
    pan:{},
    vol:{},
    //view: {cc: false, sx: false}
  }
}, 'behr')
for(const i in map.sx) {
  midi.ses.prop[props.ch].vend.behr.ddx3216.pan[i] = {s:panDef}
  midi.ses.prop[props.ch].vend.behr.ddx3216.vol[i] = {m:volDefM,l:volDefL,s:volDefS}
}
/**
 * Create session on above defined Ch 16 @TODO do it if it doesnt exist? ch watch?
 * Can also set device id if used (needed for SysEx) - no need, already in props
 
function Create(ch) {
  if(midi.ses.prop[ch].vend.behr == undefined) midi.ses.prop[midi.ses.ch].vend.behr = {}
  if(midi.ses.prop[ch].vend.behr.ddx3216 == undefined) {
    midi.ses.prop[midi.ses.ch].vend.behr.ddx3216 = {
      dev: props.dev,
      pan:{},
      vol:{},
      //view: {cc: false, sx: false}
    }
    //Fill in with defaults for SX(could be moved to sx) m = MSB; l = LSB; s = SUM
    for(const i in map.sx) {
      midi.ses.prop[ch].vend.behr.ddx3216.pan[i] = {s:panDef}
      midi.ses.prop[ch].vend.behr.ddx3216.vol[i] = {m:volDefM,l:volDefL,s:volDefS}
    }
  }
}
*/
/**
 * Create device in global ses for .behr = {} if needed, or comment it out to save ram
 */
if(midi.ses.vend.behr == undefined) midi.ses.vend.behr = {}
if(midi.ses.vend.behr.ddx3216 == undefined) midi.ses.vend.behr.ddx3216 = { show: {cc: false, sx: false} }

function DevId(i) { midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.dev = i } // This will return selected Device Id and set ses var for dev
</script>

<template><hr />
  <div>
    <h3>DDX3216
      <button id="behr" name="ddx3216" value="cc" @click="midi.Show" class="lime btn" :class="midi.ses.vend.behr.ddx3216.show.cc ? 'on' : ''">Control Change</button> or 
      <button id="behr" name="ddx3216" value="sx" @click="midi.Show" class="lime btn" :class="midi.ses.vend.behr.ddx3216.show.sx ? 'on' : ''">SysEx</button> controlls, 
      running on MIDI ch:{{ midi.ses.ch+1 }} | DeviceId <DeviceId :f="DevId" />
    </h3>
    <div v-if="midi.ses.vend.behr.ddx3216.show.cc == false && midi.ses.vend.behr.ddx3216.show.sx == false">
      Have a dedicated midi ch and do not share it with other midi devices.<br />
      Use CC or SX or both modes, turn off unused mode/s to lower midi polution.
      <div class="red"> -- If used in CC mode, and the same MIDI Ch is shared with other intruments, it will likley to mess up instruments params.</div>
    </div>
    <CC v-if="midi.ses.vend.behr.ddx3216.show.cc" />
    <SX v-if="midi.ses.vend.behr.ddx3216.show.sx" />
  </div>
</template>
