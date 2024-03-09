<script setup>
//import { ref } from 'vue'

//import { RouterLink, RouterView } from 'vue-router'
import RangeCtl from '@midi/components/sub/RangeCtl.vue'

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

import CC from '../../../components/CC.vue'
//import SX from '@midi/components/SX.vue'

//import TGVoiceEditAlgo from '@midi/components/TGVoiceEditAlgo.vue'

const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: -1
  }
})
const _ch = props.ch == -1 ? midi.ses.ch : props.ch

function Sx(e) {
  const key = parseInt(e.target.getAttribute('data-key'))
  const val = parseInt(e.target.value)
  console.log('DX7 ini Sx', key, val)
}
</script>

<template>
  FX @TODO
  <hr />
<!--
  <table>
    <tr>
      <td v-for="(v, k) in dx7.ini.params" :key="k">{{ v.txt }}</td>
    </tr>
    <tr>
      <td v-for="(v, k) in dx7.ini.params" :key="k">
        <CC v-if="v.ctl == 'cc'" :cc="v.key" :ch="_ch" :ops="{ style: 'vertical', orient: 'vertical' }" />
        <div v-if="v.ctl == 'sx'">
          <RangeCtl :id="k" :k="v.key" :o="{ style: 'vertical', orient: 'vertical' }" :p="v" :v="0" :f="Sx" />
        </div>
        
      </td>
    </tr>
  </table>
  midi.ses.props[midi.ses.ch].val[cc]
  Pan <CC :cc="0x0A" :ch="_ch" />
-->
</template>
