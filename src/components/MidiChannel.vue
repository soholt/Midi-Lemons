<script setup>

import { useMidiStore } from '@midi/stores/midi'
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


const props = defineProps({
  
  _ch: {
    type: Number,
    required: false,
    default: -1
  },
  
})
//console.log("dx7.ini.value", dx7.ini[props.ch].MIDIChannel)
/*
if(dx7.ini[props.ch].MIDIChannel > 16) {
  dx7.ini[props.ch].MIDIChannel.value = 16
}

function midi(e) {
  console.log("midi", e.target)
  //if(e.target.datach) {
    const tch = e.target.getAttribute('data-ch')
      console.log("e.target.datach", tch)
    //}
}

console.log("dx7.ini[props.ch].MIDIChannel", dx7.ini[props.ch].MIDIChannel)
*/
function Ch(e) {
  //midi.Ch(parseInt(e.target.id))
}

</script>

<template>
  <table>
    <tr>
      <td>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

          <i v-for="i in 16" :key="i">
            <input
              @click="Ch"
              :value="i"
              :id="'ch'+ch+'m'+i"
              :data-ch="ch"
              name="MIDIChannel"
              v-model="midi.ses.ch"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label class="btn btn-outline-success" :for="'ch'+ch+'m'+i">{{ i }}</label>
          </i>

        </div>
      </td>
    </tr>
  </table>
</template>
