<script setup>
import { ref } from 'vue'

import GM1 from './sub/GM1.vue'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

const props = defineProps({
  ch: {
    type: Number,
    required: true,
  },
  // show/hide components
  msb: {
    type: Boolean,
    required: false,
    default: true
  },
  lsb: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: Boolean,
    required: false,
    default: true
  },
})
/*


    <tr>
      <td>
        {{ ses.history }}
      </td>
      <td>
        {{ ses.history }}
      </td>
    </tr>
    */
function _i() {
  const a = []
  for(let i = 0; i < 128; i++) {
    a[i] = String(i+1).padStart(3, 0)
  }
  return a
}

function Type(e) {
  console.log('Type', e.target.name, e.target.value, midi.ses.prop[props.ch].type)
}
const types = { 0:'--', gm1:'GM1', gm2:'GM2', gs:'GS', xg:'XG' }
// make external loadable json file?
const voxs = {
  0: _i(),
  gm1: {0:'todo'},
  gm2: {0:'todo'},
  gs: {0:'todo'},
  gx: {0:'todo'},
  dx7: {} // download from the instrument
}
/*
function toggle(e) {
  console.log('toggle', e.target.value)
}
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
*/

</script>

<template>
  <div>
    <span v-if="props.msb">
      | Bank <select class="sky" name="msb" :data-ch="ch" :data-key="0x00" @change="midi.CC" v-model="midi.ses.prop[ch].cc[0x00]">
        <option v-for="(v,k) in voxs[0]" :key="k" :value="k">{{ v }}</option>
      </select>
    </span>

    <span v-if="props.lsb">
      | Bank lsb <select class="sky" name="lsb" :data-ch="ch" :data-key="0x20" @change="midi.CC" v-model="midi.ses.prop[ch].cc[0x20]">
        <option :value="0">000</option>
        <option v-for="(v,k) in voxs[0]" :key="k" :value="k">{{ v }}</option>
      </select>
    </span>

    <span v-if="props.type">
      | Type <select class="sky" name="type" @change="Type" v-model="midi.ses.prop[ch].type">
        <option v-for="(v,k) in types" :key="k" :value="k">{{ v }}</option>
      </select>
    </span>

    <span v-if="midi.ses.prop[ch].type == 'gm1'">
      <GM1 :ch="midi.ses.ch" />
    </span>
    <span v-else>
    | Voice <select class="sky" name="vox" @change="midi.PC" v-model="midi.ses.prop[ch].pc">
      <option v-for="(v,k) in voxs[midi.ses.prop[ch].type]" :key="k" :value="k">{{ voxs[0][k] }} - {{ v }}</option>
    </select>
    |
    </span>

  </div>
</template>