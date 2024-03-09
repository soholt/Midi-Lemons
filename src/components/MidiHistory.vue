<script setup>

import { ref } from 'vue'

import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()

const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 0 // ch = (ch - 1), always 1 less
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7F
  },
})

//const _ch = props.ch == -1 ? midi.ses.ch : props.ch
//console.log('History',_ch, props)
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

//const s = Object.keys(midi.ses.prop[midi.ses.ch].tx.note).forEach(function eachKey(key) { console.log(key, midi.ses.prop[midi.ses.ch].tx.note[key]) })

// Turn on/off ts & decode
function Show(e) {
  midi.ses.prop.view.hist[e.target.name] = !midi.ses.prop.view.hist[e.target.name]
}

// 
function View(e) {
  midi.ses.View(e, e.target.value)
}

// TS string
function Ts(t) {
  const d = new Date(t)
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
}

function Save(e) {
  const d = new Date()
  const dat = []
  const name = `${d.getFullYear()}${String(d.getMonth()).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}-Midi-Lemons-`
  switch(e.target.name) {
    case 'note':
      
      //const notes = midi.ses.prop[midi.ses.ch][e.target.value+'Ts'].note.map((ts,key) => { ts:midi.ses.prop[midi.ses.ch][e.target.value].note[key] } )//console.log('ts,key',ts,k)
      midi.ses.prop[midi.ses.ch][e.target.value+'Ts'].note.forEach((ts,k) => {
        console.log('ts,key',ts,k)
        dat[k] = {}
        dat[k][ts] =  midi.ses.prop[midi.ses.ch][e.target.value].note[k]
      })
      console.log('Save',dat)
      midi.ses.conf.Save(name+'notes.json', dat)
      break;
  }
}

const msg = ref('F0 7E 7F 06 01 F7')
function Tx() {
  midi.Tx(msg.value.split(' ').map((v) => parseInt(v, 16)))
}
</script>

<template>
  <hr />
  <h3>Latest global:</h3>
  <table>
    <tr>
      <td> 
        RX:{{ midi.ses.prop.view.hist.decode ? midi.Decode(midi.ses.prop.midi.rx) : `Hex:[${midi.Hex(midi.ses.prop.midi.rx)}] Dec:[${midi.ses.prop.midi.rx}]` }}
      </td>
      <td>
        TX:{{ midi.ses.prop.view.hist.decode ? midi.Decode(midi.ses.prop.midi.tx) : `Hex:[${midi.Hex(midi.ses.prop.midi.tx)}] Dec:[${midi.ses.prop.midi.tx}]` }}
      </td>
    </tr>
  </table>
  <h3>History for MIDI Ch: {{ midi.ses.ch+1 }}</h3>
  <button name="ts" @click="Show" class="btn sky" :class="midi.ses.prop.view.hist.ts ? 'on':'off'">TimeStamp HH:MM:SS.ms</button>
  <button name="decode" @click="Show" class="btn sky" :class="midi.ses.prop.view.hist.decode ? 'on':'off'">Decode</button>
  Send any msg on enter (hex string):
  <input type="text" @keyup.enter="Tx" placeholder="send any msg" v-model="msg" class="btn sky" />
  <button @click="Tx" class="btn lime">Tx</button> &lt;-- Eg: DEVICE INQUIRY, 7F = device id
  <table style="height: 300px;">
    <tr>
      <td>
        ---&gt; Rx
        <button id="rx" name="cc" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.rx.cc ? 'on':'off'">cc</button>
        <button id="rx" name="pc" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.rx.pc ? 'on':'off'">pc</button>
        <button id="rx" name="sx" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.rx.sx ? 'on':'off'">sx</button>
        <button id="rx" name="note" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.rx.note ? 'on':'off'">note</button>
      </td>
      <td>
        &lt;--- Tx
        <button id="tx" name="cc" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.tx.cc ? 'on':'off'">cc</button>
        <button id="tx" name="pc" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.tx.pc ? 'on':'off'">pc</button>
        <button id="tx" name="sx" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.tx.sx ? 'on':'off'">sx</button>
        <button id="tx" name="note" value="hist" @click="View" class="btn sky" :class="midi.ses.prop.view.hist.tx.note ? 'on':'off'">note</button>
      </td>
    </tr>

    <tr>
      <td v-if="midi.ses.prop.view.hist.rx.cc">
        RX::CC
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].rx.cc" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].rxTs.cc[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>

      </td>
      <td v-if="midi.ses.prop.view.hist.tx.cc">
        TX::CC
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].tx.cc" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].txTs.cc[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>

      </td>
    </tr>

    <tr>
      <td v-if="midi.ses.prop.view.hist.rx.pc">
        RX::PC
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].rx.pc" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].rxTs.pc[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>

      </td>
      <td v-if="midi.ses.prop.view.hist.tx.pc">
        TX::PC
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].tx.pc" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].txTs.pc[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>

      </td>
    </tr>

    <tr>
      <td v-if="midi.ses.prop.view.hist.rx.sx">
        RX::SX
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].rx.sx" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].rxTs.sx[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>
      
      </td>
      <td v-if="midi.ses.prop.view.hist.tx.sx">
        TX::SX
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].tx.sx" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].txTs.sx[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>
      
      </td>
    </tr>
    <!--
    <tr>
      <td v-if="midi.ses.prop.view.hist.rx.sx">
        {{ midi.ses.prop[ch].rx.sx }}
      </td>
      <td v-if="midi.ses.prop.view.hist.tx.sx">
        {{ midi.ses.prop[ch].tx.sx }}
      </td>
    </tr>
    -->
    <tr>
      <td v-if="midi.ses.prop.view.hist.rx.note">
        RX::Notes - 
        Limit <input type="number" v-model="midi.ses.conf.midi.history.rx.note" class="btn sky" style="width:100px" />
        <!--<button name="note" value="rx" @click="Save" class="btn sky">save</button>-->
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].rx.note" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].rxTs.note[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>
      </td>
      <td v-if="midi.ses.prop.view.hist.tx.note">
        TX::Notes - 
        Limit <input type="number" v-model="midi.ses.conf.midi.history.tx.note" class="btn sky" style="width:100px" />
        <!--<button name="note" value="tx" @click="Save" class="btn sky">save</button>-->
        <div v-for="(v,k) in midi.ses.prop[midi.ses.ch].tx.note" :key="k">
          {{ midi.ses.prop.view.hist.ts ? Ts(midi.ses.prop[midi.ses.ch].txTs.note[k])+'::':'' }}
          {{ midi.ses.prop.view.hist.decode ? midi.Decode(v) : `Hex:[${midi.Hex(v)}] Dec:[${v}]` }}
        </div>
      </td>
    </tr>
  </table>
</template>
