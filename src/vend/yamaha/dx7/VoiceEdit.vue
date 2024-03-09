<script setup>
import { computed } from 'vue'
//import map from './map.js'
import RangeCtl from '@midi/components/sub/RangeCtl.vue'

const props = defineProps({
  vox: {
    type: Object,
    required: true,
  },
  val: {
    type: Array,
    required: true,
  },
  f: {
    type: Function,
    required: true,
  },
  o: {
    type: Object,
    required: true,
  }
})

const OSC_MODE = ['Ratio', 'Fidex'] // { 0:'ratio', 1:'mode' }
const LFT_CURVE = ['-LIN', '-EXP', '+EXP', '+LIN'] // { 0:'-LIN', 1:'-EXP', 2:'+EXP', 3:'+LIN' }
const WAVEFORM = { 0: 'TRI angular', 1: 'SAW Down', 2: 'SAW Up', 3: 'SQR', 4: 'SIN', 5: 'SQR&Hold' }

/**
 * OPerators On/Off state
 * Convert byte to bin string, pad to 7(0 - not used, 6+1 to align)
 * Access OP state using string as array
 * scratch that and split() for reactivity
 */
const ops = computed(() => { return props.val[155].toString(2).padStart(7,'0').split('') })

/**
 * Operator toggle
 * Convert flip the bit, join array and convert to int
 */
function OpToggle(e) {
  const id = parseInt(e.target.id)
  let state = ops.value
  state[id] == '0' ? state[id] = '1' : state[id] = '0' // Flip the bit
  const val = parseInt(state.join(''), 2) // Bits back to byte
  props.f({target:{ id:155, value:val}})
}

/**
 * Operator offset
 */
const op = { 6: 0, 5: 21, 4: 42, 3: 63, 2: 84, 1: 105 }

function Name(a) { return new TextDecoder().decode(new Uint8Array(a)) }
//function Name(a) { return String.fromCharCode(a.join(',')) }
// <button class="lime btn" value="voice" @click="Upload">Voice:</button>
</script>

<template>
  <h3>
    Voice:
    <input @keyup.enter="o.SetVoxName" class="sky btn" type="text"  size="10" minlength="1" maxlength="10" placeholder="name" :value="Name(val.slice(145, 155))" />
    <button class="lemon btn" @click="o.SendVox">Send</button>
    
  <!--<div v-if="Object.keys(midi.ses.vend.yamaha.dx7.voxs).length > 0">
    Voices: {{ Object.keys(midi.ses.vend.yamaha.dx7.voxs) }}
    <button id="yamaha" name="dx7" value="vox" @click="SendVox" class="btn red">Send Voice</button>
  </div>-->

  </h3>
  <table>
    <tr>
      <th>OPs:</th><th>OP 1</th><th>val</th><th>OP 2</th><th>val</th><th>OP 3</th><th>val</th><th>OP 4</th><th>val</th><th>OP 5</th><th>val</th><th>OP 6</th><th>val</th><th>id</th>
    </tr>
    <tr v-for="(v,k) in vox.op" :key="k">
      <td>{{ v.t }}</td>
      <td><RangeCtl :id="'op-'+op[1] + k" :k="op[1] + k" :p="v" :f="f" :v="val[op[1] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[1] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[1] + k]] : '' }} {{ k == 20 ? val[op[1] + k]-7 : val[op[1] + k] }}</td>
      <td><RangeCtl :id="'op-'+op[2] + k" :k="op[2] + k" :p="v" :f="f" :v="val[op[2] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[2] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[2] + k]] : '' }} {{ k == 20 ? val[op[2] + k]-7 : val[op[2] + k] }}</td>
      <td><RangeCtl :id="'op-'+op[3] + k" :k="op[3] + k" :p="v" :f="f" :v="val[op[3] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[3] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[3] + k]] : '' }} {{ k == 20 ? val[op[3] + k]-7 : val[op[3] + k] }}</td>
      <td><RangeCtl :id="'op-'+op[4] + k" :k="op[4] + k" :p="v" :f="f" :v="val[op[4] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[4] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[4] + k]] : '' }} {{ k == 20 ? val[op[4] + k]-7 : val[op[4] + k] }}</td>
      <td><RangeCtl :id="'op-'+op[5] + k" :k="op[5] + k" :p="v" :f="f" :v="val[op[5] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[5] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[5] + k]] : '' }} {{ k == 20 ? val[op[5] + k]-7 : val[op[5] + k] }}</td>
      <td><RangeCtl :id="'op-'+op[6] + k" :k="op[6] + k" :p="v" :f="f" :v="val[op[6] + k]" /></td>
      <td>{{ k == 11 ? LFT_CURVE[val[op[6] + k]] : '' }}{{ k == 17 ? OSC_MODE[val[op[6] + k]] : '' }} {{ k == 20 ? val[op[6] + k]-7 : val[op[6] + k] }}</td>
      <td>{{ k }}</td>
    </tr>
    <tr>
      <td>OP On/Off</td>
      <td><button @click="OpToggle" id="1" type="button" :class="ops[1]==1 ? 'on':''" class="lime btn">OP 1</button></td><td></td>
      <td><button @click="OpToggle" id="2" type="button" :class="ops[2]==1 ? 'on':''" class="lime btn">OP 2</button></td><td></td>
      <td><button @click="OpToggle" id="3" type="button" :class="ops[3]==1 ? 'on':''" class="lime btn">OP 3</button></td><td></td>
      <td><button @click="OpToggle" id="4" type="button" :class="ops[4]==1 ? 'on':''" class="lime btn">OP 4</button></td><td></td>
      <td><button @click="OpToggle" id="5" type="button" :class="ops[5]==1 ? 'on':''" class="lime btn">OP 5</button></td><td></td>
      <td><button @click="OpToggle" id="6" type="button" :class="ops[6]==1 ? 'on':''" class="lime btn">OP 6</button></td><td></td>
      <td>155</td>
    </tr>
  </table>
{{ ops }}
  <hr />
  Options:
  <table>
    <tr v-for="(v, k) in val.slice(126, 145)" :key="k">
      <td>{{ vox.props[k].t }}</td><!--
      <td><input @input="f" @Wheel="Wheel" :data-key="k+126" :name="k+126" type="range" :min="vox.props[k+126].min" :max="vox.props[k+126].max" :value="val[k+126]" class="form-range p100" /></td>-->
      <td><RangeCtl :id="'pr-'+k+126" :k="k+126" :p="vox.props[k]" :f="f" :v="val[k+126]" /></td>
      <td>{{ k == 18 ? v-24 : v }}</td>
      <td>{{ k == 16 ? WAVEFORM[v] : '' }}</td>
      <td>{{ k+126 }}</td>
    </tr>
  </table>
</template>
