<script setup>
//import { computed, watch } from 'vue'

//import { useSesStore } from '@midi/stores/ses'
//const ses = useSesStore()

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

import CC from '../../../components/CC.vue'
/*
<div>
        <v-slider v-model="slider1" color="orange" label="color"></v-slider>
        <v-slider v-model="slider2" track-color="green" label="track-color"></v-slider>
        <v-slider v-model="slider3" thumb-color="purple" label="thumb-color"></v-slider>
</div>

      <td>DEC</td>
  <td>&nbsp;{{ Number(cc.val[k]).toString(10).padStart(3, '&nbsp;') }}</td>



      <td>CC</td>
      <td>VL</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }}&nbsp;</td>
      <td>{{ Number(cc.val[k]).toString(16).padStart(2, 0) }}&nbsp;</td>


      <th>-</th>
      <th>+</th>
      <td><v-btn @click="cc.dec(k)">&lt;</v-btn></td>
      <td><v-btn @click="cc.inc(k)">&gt;</v-btn></td>
      */

//console.log('range', ccMap)
/*
function range(e) {
  console.log('range', e.target.value, e.target.id, e.target.type)
  midi.ses.CC(e)
}

*/

/*
const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 0
  },
})
*/
//ccs[i] = { txt:txt, name:'cc', min: 0, max: 127, def: 0, type: 'range', meta: d, show: true }
//const cc = computed(() => { return midi.ses.prop[midi.ses.ch].cc })
//console.log(`cc is ${cc.value}`)
function click() {
  console.log('Clicked, update')
}// @click="click"

//const vals = computed(() => { return vendor.value != '' ? routes[vendor.value].instruments : [] })
//watch(ses.ch, (newX) => {
//  console.log(`x is ${newX}`)
//})
const o = {}
</script>
<template>
  <h2>CC map, KEY is used to display CC controls: &lt;CC :cc="KEY" /&gt;</h2>
  <table style="width:100%">
    <tr>
      <td style="width:40px">DEC</td>
      <td style="width:40px">CH</td>
      <td style="width:40px">KEY</td>
      <td style="width:40px">VAL</td>
      <td style="width:450px">Name</td>
      <td>Param</td>
    </tr>
<!--
    <tr v-for="(v,k) in midi.ses.ccs" :key="k">
      <td>{{ k.toString(10).padStart(3, 0) }}</td>
      <td>0x{{ (0xb0 + midi.ses.ch).toString(16).padStart(2, 0) }}</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }} </td>
      <td>{{ midi.ses.prop[midi.ses.ch].cc[k] }}TODO</td>
      <td>{{ v.text }}</td>
      <td><CC :ch="midi.ses.ch" :cc="k" :lsb="midi.ses.ccs[midi.ses.ccs[k].lsb]"/></td>
    </tr>



      :list="id + k"
      @input="f"
      @input="midi.CC"
      :class="o.style"
      @wheel="Wheel"
      {{ midi.ses.prop[midi.ses.ch].cc[k] }}
      :value="v.def"
      {{ midi.ses.prop[midi.ses.ch].cc }} - {{ midi.ses.ch }} - {{ k }} - {{ midi.ses.prop[midi.ses.ch].cc[k] }}
  -->
    <tr v-for="(v,k) in midi.ses.ccs" :key="k">
      <td>{{ k.toString(10).padStart(3, 0) }}</td>
      <td>0x{{ (0xb0 + midi.ses.ch).toString(16).padStart(2, 0) }}</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }} </td>
      <td>{{ Number(k) == 0x0A ?  midi.ses.prop[midi.ses.ch].cc[k]-64 : midi.ses.prop[midi.ses.ch].cc[k] }}</td>
      <td>{{ v.txt }}</td>
      <td>
        <!-- && p.res == 7 to enambe hd+cahnge below p.res == 140 to 14-->
    <!--
        <div v-if="v.type == 'range'" class="sliDecontainer">
          <label :for="'cc' + k"></label>
          <input
            :id="'cc' + k"
            :data-ch="midi.ses.ch"
            :data-key="k"
            :min="v.min"
            :max="v.max"
            :type="v.type"
            :name="v.name"
            :value="midi.ses.prop[midi.ses.ch].cc[k]"
            @input="midi.CC" />
          
          <datalist v-if="'datalist' in o" :id="id + k">
            <option v-for="(v,k) in o.datalist" :key="k" :value="k" :label="v"></option>
          </datalist>
        </div>
        <button v-if="v.type == 'button'" class="btn sky" :id="'cc' + k" :data-ch="midi.ses.ch" :data-id="v.id" :data-key="k" :value="v.min" @click="midi.CC" :class="v == v.max ? 'on':''" type="button">{{ v.txt }}</button>
        <button v-if="v.type == 'checkbox'" class="btn orange" :id="'cc' + k" :data-ch="midi.ses.ch" :data-id="v.id" :data-key="k" :value="v.min" @click="midi.CC" :class="v == v.max ? 'on':''">{{ v.txt }}</button>
      --><!-- @TODO v-if;v-else can be outside the loop, put it in maps/cc.js https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
      <CC :cc="k" />
      </td>
      </tr>


<!--for HD
    <tr v-for="(v,k) in midi.ses.ccs.slice(0,32)" :key="k">
      <td>{{ k.toString(10).padStart(3, 0) }}</td>
      <td>0x{{ (0xb0 + midi.ses.ch).toString(16).padStart(2, 0) }}</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }} </td>
      <td>{{ midi.ses.prop[midi.ses.ch].cc[k] }}TODO</td>
      <td>{{ v.text }}</td>
      <td><CC :ch="midi.ses.ch" :cc="k" :lsb="midi.ses.ccs[midi.ses.ccs[k].lsb]"/></td>
    </tr>
-->

<!-- skip lsbs 32-64 -->
    <!--
    <tr v-for="(v,k) in Object.entries(midi.ses.ccs).slice(32,64).map(entry => entry[1])" :key="k">
      <td>{{ k.toString(10).padStart(3, 0) }}</td>
      <td>0x{{ (0xb0 + midi.ses.ch).toString(16).padStart(2, 0) }}</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }} </td>
      <td>{{ midi.ses.prop[midi.ses.ch].cc[k] }}TODO</td>
      <td><hr /></td>
      <td><hr /></td>
    </tr>
-->

<!--for HD
    <tr v-for="(v,k) in midi.ses.ccs.slice(64,128)" :key="k=k+64">
      <td>{{ k.toString(10).padStart(3, 0) }}</td>
      <td>0x{{ (0xb0 + midi.ses.ch).toString(16).padStart(2, 0) }}</td>
      <td>{{ Number(k).toString(16).padStart(2, 0) }} </td>
      <td>{{ midi.ses.prop[midi.ses.ch].cc[k] }}TODO</td>
      <td>{{ v.text }}</td>
      <td><CC :ch="midi.ses.ch" :cc="k" /></td>
    </tr>
-->
  </table>
        <!-- :val="0" midi.ses. -->
</template>
