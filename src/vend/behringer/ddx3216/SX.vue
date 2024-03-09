<script setup>
import { ref, onBeforeUnmount, toRaw } from 'vue'

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

import map from './map.js'


const panMax = 60
const volMax = 1472

//const volMaxM = 0x0B // max msb // vol max:["F0", "00", "20", "32", "00", "0B", "20", "01", "00", "01", "0B", "40", "F7"]
//const volMaxL = 0x40

console.log('SX ses behr ddx3216', toRaw(midi.ses.prop[midi.ses.ch].vend.behr.ddx3216))

const types = {
  1: 'Vol',
  3: 'Pan'
}

function SetPan(a) { midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.pan[a[8]] = { s: a[11] } }
function SetVol(a) { midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.vol[a[8]] = { m: a[10], l: a[11], s: (a[10] * 0x80) + a[11] } }

function Sx(e) {
  //console.log('CC', e.target.id, e.target.value)
  const dev = midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.dev
  const key = parseInt(e.target.name)
  const type = parseInt(e.target.getAttribute('data-key'))
  const val = parseInt(e.target.value)

  const pay = [0xF0, 0x00, 0x20, 0x32, dev, 0x0B, 0x20, 0x01, key, type, 0x00, 0x00, 0xF7]

  switch(type) {
    case 1: // Vol
      pay[10] = Math.floor(val / 0x80)
      pay[11] = val - (pay[10] * 0x80)
      midi.Tx(pay)
      SetVol(pay)
      break
    case 3: // Pan
      pay[11] = val
      midi.Tx(pay)
      SetPan(pay)
      break
  }
  console.log('ddx3216.Sx', midi.Hex(pay), {ch:midi.ses.ch, type:types[type], dev:dev, key:key, val:val})
}
/**
 * To receive and process MIDI msgs
 * Leave it as is or uncomment 'delete' in onBeforeUnmount to stop RX and processing when navigating away from DDX3216
 * @param {Array} a MIDI msg
 */
midi.RxQueueAdd['ddx3216'] = (a) => {

  // 11.5 bits? map.vol skips numbers so the resolution = ??
  // min:["F0", "00", "20", "32", "00", "0B", "20", "01", "00", "01", "00", "00", "F7"] bytes: key:8; type:9; val: msb:10; lsb:11
  // max:["F0", "00", "20", "32", "00", "0B", "20", "01", "00", "01", "0B", "40", "F7"]
  //let val = 0

  if(a[1] == 0x00 && a[2] == 0x20 && a[3] == 0x32) { // filter/verify from behringer by manufac id

    switch(a[9]) {
      case 1: // VOL
      SetVol(a)//midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.vol[a[8]] = { m: a[10], l: a[11], s: (a[10] * 0x80) + a[11] } // 0-1472 msb and lsb
        // @TODO MAIN VOL & PAN midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.vol[64] = { m: a[10], l: a[11], s: (a[10] * 0x80) + a[11] } // 0-1472 msb and lsb
        //console.log('BEHR MIDI SX VOl:', val)
        break //if(a[8] > -1 && a[8] < 32 || a[8] == 61) { // 0-31 && 64 main vol

      case 3: // PAN
      SetPan(a)//midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.pan[a[8]] = { s: a[11] } //  // 0-60 = just lsb
        //console.log('BEHR MIDI SX PAN:', val)
        break//else if(a[8] > 63 && a[8] < 96 || a[8] == 100){ // Pan 64-95 && 100 main pan

      // EQ half dB increments
      case 21: // EQ Q type:      q:0.1-10.0:0-40; HC=1; HSh=2  min 0 = 0, max = 40
      case 22: // EQ HIGH FREQ: min 0 = 20Hz; max = 160 = 20kKz; // TODO
      case 23: // EQ HIGH:      min 0 = -18dB, 32 = 0dB; max = 72 = +18dB;
      case 24: // EQ Q:       min 0 = 0, max = 40
      case 26: // EQ HIGH FREQ: min 0 = 20Hz; max = 160 = 20kKz; // TODO
      case 27: // EQ MID:       min 0 = -18dB, 32 = 0dB; max = 72 = +18dB;
      case 28: // EQ Q:       min 0 = 0, max = 40
      case 30: // EQ HIGH FREQ: min 0 = 20Hz; max = 160 = 20kKz; // TODO
      case 31: // EQ LOW MID:   min 0 = -18dB, 32 = 0dB; max = 72 = +18dB;
      case 32: // EQ Q:       min 0 = 0, max = 40
      case 33: // EQ Q type:      q:0.1-10.0:0-40; HC=1; HSh=2  min 0 = 0, max = 40
      case 34: // EQ HIGH FREQ: min 0 = 20Hz; max = 160 = 20kKz; // TODO
      case 35: // EQ LOW:       min 0 = -18dB, 32 = 0dB; max = 72 = +18dB;
      case 36: // EQ Q:       min 0 = 0, max = 40
          break
    }

    //hd.value = val
    //key.value = a[8]

    //midi.ses.prop[midi.ses.ch].vend.behr.ddx3216[a[8]] = { m: a[10], l: a[11], s: val } // MSB, LSB, SUM
    

  }
  //console.log('BEHR MIDI SX key:', a[8], ' type:',a[9], ' val:', [a[10], a[11]])
}

function Wheel(e) {
  //Sx(e)//@TODO global Wheel
}
function Reset() {
/*
  for (let k in map.pan) {
    midi.ses.prop[midi.ses.ch].cc[k] = map.panDef
    midi.Tx([0xb0 | midi.ses.ch, k, map.panDef])
    console.log('pan',k)
  }
    
  for (let k in map.vol) {
    midi.ses.prop[midi.ses.ch].cc[k] = map.volDef
    midi.Tx([0xb0 | midi.ses.ch, k, map.volDef])
    console.log('vol',k)
  }
*/
}




// Remove listening and processing if no longer needed or comment it out, to leave it listening and processing until browser reload
onBeforeUnmount(() => {
  //delete midi.RxQueueRm(ddx3216)
})
</script>

<template>
  <div>

    <h3>DDX3216 SX controlls.<!--<button class="btn red" @click="Reset">Reset</button> <button class="btn">Load</button>--></h3>
    <h4>To turn on TX: MMC/MIDI -> RX/TX -> select TX DIRECT PAR SYSEX</h4>
    <h4>(Pan center = 30 and max = 60; Vol 0 = 1280(hex m:10;l:0))</h4>

    Pan/Vol:
    <table>
      <tr>
        <td v-for="(v, k) in map.sx" :key="k">{{ midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.pan[k].s }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.sx" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Sx"
              :id="'ccb' + k"
              :min="0"
              :max="panMax"
              :name="k"
              data-key="3"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.pan[k].s"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.sx" :key="k">
          {{ v }}
        </td>
      </tr>
      


      <tr>
        <td v-for="(v, k) in map.sx" :key="k">{{ midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.vol[k].s }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.sx" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Sx"
              :id="'ccb' + k"
              :min="0"
              :max="volMax"
              :name="k"
              data-key="1"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="midi.ses.prop[midi.ses.ch].vend.behr.ddx3216.vol[k].s"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.sx" :key="k">
          {{ v }}
        </td>
      </tr>
    </table>
    EQ, FX etc
<!--
    Other: mapings? +not added: 33-60, 101-127 - needed?
    <table>
      <tr>
        <td v-for="(v, k) in  map.other" :key="k">{{ ses[k].s }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in  map.other" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Sx"
              :id="'ccb' + k"
              :min="0"
              :max="max"
              :name="k"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="ses[k].s"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in  map.other" :key="k">
          {{ v }}
        </td>
      </tr>
    </table>
-->
  </div>
</template>
