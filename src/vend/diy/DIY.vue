<script setup>
//import { ref, onBeforeMount } from 'vue'//, defineComponent
/*
import FirMata from './firmata/FirMata.vue'
import DINoctopus from './bjonnh/DINoctopus.vue'
import PicoDexed from './diyelectromusic/PicoDexed.vue'
import MiniDexed from './probonopd/MiniDexed.vue'
import MT32Pi from './dwhinham/MT32Pi.vue'
*/
//import { useMidiStore } from '../../stores/midi'
//const midi = useMidiStore()

/*
onBeforeMount(() => {
  let test = document.createElement('script')
  test.setAttribute('src',"/midi/test.js")
  document.head.appendChild(test)
})
*/

//created() {
//  let js = document.createElement('script')
//  ckeditor.setAttribute('src',"/midi/test.js")
//  document.head.appendChild(js)
//}
/*
const view = ref(0)
const diy = {
  0: { vendor: 'd.i.y', device: 'projects'},
  1: { vendor: 'Bjonnh', device: 'dinoctopus' },
  2: { vendor: 'probonopd', device: 'minidexed'},
  3: { vendor: 'diyelectromusic', device: 'picodexed'},
  4: { vendor: 'dwhinham', device: 'mt32pi' },

  10: { vendor: 'firmata', device: 'firmata'},
}
//midi.Vendor('diy') // This creates global session

function View(e) {
  midi.Vendor(e)
  view.value = e.target.id
  //midi.Device(e.target.value) // This creates global session
  //diy[e.target.value].device

  //midi.ses.vendor = diy[e.target.value].vendor
  //midi.ses.device = diy[e.target.value].device
}
*/
/*
  <select id="diy" v-model="view" @click="Show">
    <option v-for="(v,k) in diy" :key="k" :value="k">{{ v.vendor }}::{{ v.device }}</option>
  </select>*/
</script>

<template>
  <h3>DIY</h3>
  To dev:
<ul>
  <li>To send midi: midi.Tx([0xF0, 0xF7]) (need to import useMidiStore first)</li>
  <li>To send CC commands, import @midi/components/CC.vue and provide cc id</li>
  <li>/src/stores is where the session, maps and functions live</li>
  <li>/src/components - reusable components, ./sub/parts used in components</li>
  <li>/src/vend is where vendors and diy live</li>
  <li>To Create Your own diy controller, copy/paste one of /src/vend/diy/maker and rename it</li>
  <li>Update diy/routes.js with instruments you create(for nav buttons to appear)</li>
  <li>/public/midi/vendors/diy/maker/device - where conf/mappings etc can be kept and easily edited .json & .js? @TODO(to keep the main app size to a min?todo)</li>
</ul>
@TODO
<!--
  <span v-for="(v,k) in diy" :key="k">
    <button v-if="k > 0" @click="View" name="diy" :value="v.device" :id="k" :class="k == view ? 'on':''" class="lime btn">{{ v.vendor }}::{{ v.device }}</button>
  </span>

  <div>
    <h3 v-if="view == 0"> -- Recommend other cool projects -- </h3>
    <DINoctopus v-if="'dinoctopus' == diy[view].device" />
    <FirMata v-if="'firmata' == diy[view].device" />
    <MiniDexed v-if="'minidexed' == diy[view].device" />
    <PicoDexed v-if="'picodexed' == diy[view].device" />
    <MT32Pi v-if="'mt32pi' == diy[view].device" />
  </div>
-->
</template>
