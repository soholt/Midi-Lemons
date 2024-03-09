<script setup>
//import { ref } from 'vue'

//import { RouterLink, RouterView } from 'vue-router'
import CC from '../../../components/CC.vue'
//import SX from '@midi/components/SX.vue'
import RangeCtl from '@midi/components/sub/RangeCtl.vue'

//import { useMidiStore } from '../../../stores/midi'
//const midi = useMidiStore()

//import { useDX7Store } from './dx7'
//const dx7 = useDX7Store()
//import map from './map'

// @TODO algo import TGVoiceEditAlgo from './TGVoiceEditAlgo.vue'

//const props = 
defineProps({
  ch: {
    type: Number,
    required: true,
  },
  ini: {
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
  }
})

// @TODO
//const _ch = props.ch == -1 ? midi.ses.ch : props.ch
//midi.ses.props[midi.ses.ch].val[cc]
</script>

<template>
  Params
  <hr />

  <table>
    <tr>
      <td v-for="(v, k) in ini" :key="k">{{ v.txt }}</td>
    </tr>
    <tr>
      <td v-for="(v, k) in ini" :key="k">
        <CC v-if="v.ctl == 'cc'" :cc="v.key" :ch="ch" :ops="{ style: 'vertical', orient: 'vertical' }" />
        <div v-if="v.ctl == 'sx'">
          <RangeCtl :id="k" :k="v.key" :o="{ style: 'vertical', orient: 'vertical' }" :p="v" :v="val[k]" :f="f" />
        </div>
        <!--SX v-if="v.ctl == 'sx'" :cc="v.key" :tg="tg" :pro="v" :ops="{style:'green'}" />-->
      </td>
    </tr>
  </table>
</template>
