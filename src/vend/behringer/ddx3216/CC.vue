<script setup>

import map from './map.js'

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

function Cc(e) {
  //console.log('CC', e.target.id, e.target.value)
  const key = parseInt(e.target.name)
  const val = parseInt(e.target.value)
  midi.ses.prop[midi.ses.ch].cc[key] = val
  midi.Tx([0xb0 | midi.ses.ch, key, val])
  //console.log([0xB0 + midi.ses.ch, key, val])//val
}
function Wheel(e) {
  Cc(e)
}

const panDef = 63
const volDef = 0 //97

function Reset() {

  for (let k in map.pan) {
    midi.ses.prop[midi.ses.ch].cc[k] = panDef
    midi.Tx([0xb0 | midi.ses.ch, k, panDef])
    //console.log('pan',k)
  }
    
  for (let k in map.vol) {
    midi.ses.prop[midi.ses.ch].cc[k] = volDef
    midi.Tx([0xb0 | midi.ses.ch, k, volDef])
    //console.log('vol',k)
  }

}

</script>

<template>
  <div>
    <h3>DDX3216 CC controlls. <button class="btn red" @click="Reset">Reset</button> <button class="btn">Load</button></h3>
    <h4>To turn on TX: MMC/MIDI->RX/TX->select TX Control Change(in RX/TX Only - select cc components to RX/TX)</h4>
    <h4>(Pan center = 63 and skips every other number or more; Vol 0 = 97;)</h4>

    Pan:
    <table>
      <tr>
        <td v-for="(v, k) in map.pan" :key="k">{{ midi.ses.prop[midi.ses.ch].cc[k] }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.pan" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Cc"
              :id="'ccb' + k"
              :min="0"
              :max="127"
              :name="k"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="midi.ses.prop[midi.ses.ch].cc[k]"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.pan" :key="k">
          {{ v }}
        </td>
      </tr>
    </table>

    Vol:
    <table>
      <tr>
        <td v-for="(v, k) in map.vol" :key="k">{{ midi.ses.prop[midi.ses.ch].cc[k] }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.vol" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Cc"
              :id="'ccb' + k"
              :min="0"
              :max="127"
              :name="k"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="midi.ses.prop[midi.ses.ch].cc[k]"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.vol" :key="k">
          {{ v }}
        </td>
      </tr>
    </table>

    Other: mapings? +not added: 33-60, 101-127 - needed?
    <table>
      <tr>
        <td v-for="(v, k) in map.other" :key="k">{{ midi.ses.prop[midi.ses.ch].cc[k] }}</td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.other" :key="k">
          <span class="sliDecontainer">
            <label :for="'ccb' + k"></label>
            <input
              :list="'ccb' + k"
              @input="Cc"
              :id="'ccb' + k"
              :min="0"
              :max="127"
              :name="k"
              type="range"
              class="verical"
              @wheel="Wheel"
              orient="vertical"
              :value="midi.ses.prop[midi.ses.ch].cc[k]"
            />
          </span>
        </td>
      </tr>
      <tr>
        <td v-for="(v, k) in map.other" :key="k">
          {{ v }}
        </td>
      </tr>
    </table>

  </div>
</template>
