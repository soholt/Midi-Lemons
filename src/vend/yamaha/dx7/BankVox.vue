<script setup>
import { ref, onBeforeMount } from 'vue' //, defineComponent

//import { RouterLink, RouterView } from 'vue-router'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

const props = defineProps({
  ch: {
    // TODO
    type: Number,
    required: true
  },
  Banks: {
    type: Object,
    required: true
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7f
  },
  o: {
    type: Object,
    required: true
  }
})

let dx7 = { show: { fx: false, ini: false, vox: true, inf: false } }
//Banks = await midi.fn.GetJson('/midi/vendors/yamaha/dx7/banks.json')
//sys.conf = await midi.fn.GetJson('/midi/vendors/yamaha/dx7/conf.json')
onBeforeMount(async () => {
  midi.ses.vend.yamaha.dx7 = { banks: {}, inis: {}, voxs: {} }

  // @TODO FIX
  //for (let mch = 0; mch < midi.ses.conf.midi.chs; mch++) {
  //  midi.ses.prop[mch].vend[midi.ses.vendor][midi.ses.device] = { ini: {}, vox: new Array(156).fill(0) } //Object.create(o)
  //}

  /**
   * Create vendor in global ses if needed, or comment it out to save ram
   * This will be used in DX7 or other devices, so define it here if used
   * This will create midi.ses.vend.yamaha = {}
   * Then per device @SEE DX7.vue midi.ses.vend.yamaha.dx7 = {}
   *
   * This also allows you to use midi.show method to show/hide components @SEE
   */
  //midi.ses.CreateGlobal('yamaha', { dx7: { show: { ini: false, vox: true, inf: false } }})
  // MOVED TO PER CH
  //if(midi.ses.vend[midi.ses.vendor].show == undefined) midi.ses.vend[midi.ses.vendor][midi.ses.device]['show'] = { fx: false, ini: false, vox: true, inf: false }

  // Shorten long typing

  //const
  dx7 = new Proxy(midi.ses.prop[props.ch].vend.yamaha.dx7, {})

  //const show = new Proxy(midi.ses.vend[midi.ses.vendor][midi.ses.device].show, {});
})

function Show(e) {
  dx7.show[e.target.value] = !dx7.show[e.target.value] //console.log('dx7.show', dx7.show.vox)
}

/**
 * Create device in global and per MIDI Ch ses for .yamaha = {} if needed, or comment unused to save ram
 
function Create() {

  if(midi.ses.vend.yamaha == undefined) midi.ses.vend.yamaha = {} // global
  if(midi.ses.prop[midi.ses.ch].vend.yamaha == undefined)  midi.ses.prop[midi.ses.ch].vend.yamaha = {} // per MIDI Ch

  if(midi.ses.vend.yamaha.dx7 == undefined) midi.ses.vend.yamaha.dx7 = { show: {ini: false, vox: true, inf: false} } // global
  if(midi.ses.prop[midi.ses.ch].vend.yamaha.dx7 == undefined) midi.ses.prop[midi.ses.ch].vend.yamaha.dx7 =  // per MIDI Ch

  console.log('Create', midi.ses.ch)
}*/
//import sysex from './sysex';

//console.log('import ParamCtl, VoiceEdit', ParamCtl, VoiceEdit)

//<RouterLink to="./"><button>back</button></RouterLink>
const banks = Object.keys(props.Banks) //['rom1a','rom1b','rom2a','rom2b','rom3a','rom3b','rom4a','rom4b']//Object.keys(dx7.value.banks) //
const bank = ref(banks[0])

function Bank(e) {
  midi.CC(e) // bank select
  midi.Pc(parseInt(document.getElementById('vox').value), props.ch)
  //midi.Pc()
  //midi.PC.Tx([0xC0 | ch, midi.ses.prop[midi.ses.ch].pc]) // also send currently selected voice midi.ses.prop[midi.ses.ch].pc or could reset to 1 on bank change
  //load vox if vabk loaded
  
  
}
function Vox(e) {
  midi.PC(e)
  // Load vox params if vox for selected bank is loaded
  if(midi.ses.vend.yamaha.dx7.banks[bank.value] != undefined) {
    //dx7.vox = midi.ses.vend.yamaha.dx7.banks[bank.value][e.target.name].length(156)
    console.log('--Vox', e.target.name, midi.ses.vend.yamaha.dx7.banks[bank.value])//, midi.ses.vend.yamaha.dx7.banks[bank.value]
    // turn on vox
    //dx7.show.vox = true
  }
}

// 4096 bytes
function ParseVoxData(a) {
  const vox = String.fromCharCode(a.slice(118, 128).join(','))// new TextDecoder().decode(a.slice(name_start, name_start + 10))
  const dat = {}
  dat[vox] = a
  return dat[vox] /*
  return {
    dat: a,
    vox: String.fromCharCode(a.slice(118, 128))// new TextDecoder().decode(a.slice(name_start, name_start + 10))
  }*/
}
/**
 * split Bank to Vox
 
function ParseSyxBankData(a) {
  const dat = {}

  const header = 6
  const offset = 118
  const block = 128
  for (let i = 0; i < 32; i++) {
    //_dat[i] = {vox:[],dat:[]}
    const name_start = header + offset + i * block
    const vox =  new TextDecoder().decode(a.slice(name_start, name_start + 10))
    //console.log('ParseSyxData vox', a.length, vox)
    dat[vox] = Array.from(a.slice(i*block,(i*block)+block))
    //_dat[i].dat = a.slice(i*block,(i*block)+block)
    //_dat[i].vox = String.fromCharCode(a.slice(name_start, name_start + 10))// new TextDecoder().decode(a.slice(name_start, name_start + 10))
  }
  console.log('ParseSyxData len:', a.length, ' datLen:', a[4] << 7 | a[5], ' Crc:', a[6+4096] ,'== ', midi.fn.Crc(a.slice(6,-2)), '? - dat:', dat) // @TODO

 return dat
}
*/
function LoadData(o) {
  // 0: File { lastModified: 1701798754000, name: "performance.ini", size: 5089, type: "text/plain", webkitRelativePath: "" }
  console.log('LoadData', o, o.file.name, o.file.size)
  const name = o.file.name.split('.')

  if (name[1] == 'syx' || name[1] == 'SYX') {
    switch (o.file.size) {
      case 4096:
        console.log('Load Bank? HEADLESS?:', name[0])
      // @TODO verify it works
        midi.ses.vend.yamaha.dx7.banks[name[0]] = [0xF0, 0x43, 0x00, 0x09, 0x20, 0x00, ...Array.from(new Uint8Array(o.dat)), midi.fn.Crc(Array.from(new Uint8Array(o.dat))), 0xF7]
        
        //banksUploaded[name[0]] = []
        //for(let k in 32) {
        //  banksUploaded[name[0]][k] = [] // vox data
        //  console.log(k)
        //}
        break
      case 4104:
        console.log('Load Bank:', name[0], Array.from(new Uint8Array(o.dat)).toString(16).padStart(2,'0'))

        midi.ses.vend.yamaha.dx7.banks[name[0]] = Array.from(new Uint8Array(o.dat)) //ParseSyxBankData(new Uint8Array(o.dat))

        //console.log('size dat:', o.dat[4] | o.dat[5],' Crc:', midi.ses.vend.yamaha.dx7.banks[name[0]][6+4096+1])//, midi.fn.Crc(midi.ses.vend.yamaha.dx7.banks[name[0]])

        //for(let k in 32) {
        //  midi.ses.vend.yamaha.dx7.banks[name[0]][k] = [] // vox data
        //  console.log(k)
        //}
        //console.log('ParseSyx',midi.ses.vend.yamaha.dx7.banks[name[0]] )
        break
      case 163:
        // @TODO if not in obj
        midi.ses.vend.yamaha.dx7.voxs[name[0]] = ParseVoxData(Array.from(new Uint8Array(o.dat)).slice(6,-2))
        midi.ses.vend.yamaha.dx7.voxs[name[0]].push(0b00111111)
        
        dx7.vox = midi.ses.vend.yamaha.dx7.voxs[name[0]]
        dx7.show.vox = true
        console.log('Load Vox', midi.ses.vend.yamaha.dx7.voxs, Array.from(new Uint8Array(o.dat)).map((a)=>{return a.toString(16).padStart(2,'0')}))
        break
    }
    console.log('ParseSyx',midi.ses.vend.yamaha.dx7.banks )
  }
}
function Load(e) {
  //const dat = midi.ses.Upload(e)
  console.log('Load', e)
  const [file] = e.target.files
  const reader = new FileReader()
  //reader.addEventListener( 'load', () => { Load(e.target.name, file, reader.result) }, false )
  if (file) {
    reader.readAsArrayBuffer(file)
    //reader.readAsDataURL(file)
    //  reader.readAsText(file)
  }
  reader.addEventListener(
    'load',
    () => {
      LoadData({ name: e.target.name, file: file, dat: reader.result })
    },
    false
  )

  //reader.readAsArrayBuffer(dat.file)
}
function Upload() {
  const e = document.getElementById('dx7Upload').click()
  console.log('Load', e)
}
</script>
<template>
  <button class="lime btn" value="bank" @click="Upload" :class="midi.ses.vend.yamaha.dx7.banks[bank] != undefined ? 'orange btn on todo' : ''">Bank:</button>
  <select class="lime" name="msb" :data-ch="ch" :data-key="0x00" @change="Bank" v-model="midi.ses.prop[ch].cc[0x00]">
    <option v-for="(v, k) in banks" :key="k" :id="v" :value="k">{{ (k + 1 + '').padStart(3, '0') }} {{ v }}</option>
  </select>

  <button class="lime btn" value="voice" @click="Upload">Voice:</button>
  <select id="vox" class="lime" @change="Vox">
    <option v-for="(v, k) in Banks[bank]" :key="k" :name="v" :value="k">{{ (k + 1 + '').padStart(3, '0') }} {{ v }}</option>
  </select>

  <button id="yamaha" name="dx7" value="ini" @click="Show" class="btn orange" :class="dx7.show.ini ? 'on' : ''">Ini</button>
  <button id="yamaha" name="dx7" value="vox" @click="Show" class="btn orange" :class="dx7.show.vox ? 'on' : ''">Voice</button>
  <button id="yamaha" name="dx7" value="cc" @click="Show" class="btn orange" :class="dx7.show.cc ? 'on' : ''">CC</button>

  <button id="yamaha" name="dx7" value="inf" @click="Show" class="btn sky" :class="dx7.show.inf ? 'on' : ''">info</button>
<!--
  <button @click="o.GetBank" class="lemon btn">GetBank?</button>
  <button @click="o.GetVox" class="lemon btn">GetVox?</button>
  <button @click="o.GetPerf" class="lemon btn">GetPerformance?</button>-->
  <button class="red btn" @click="o.Reset">Reset</button>

  <div v-if="Object.keys(midi.ses.vend.yamaha.dx7.banks).length > 0">
    Banks:
    <div v-for="(v,k) in Object.keys(midi.ses.vend.yamaha.dx7.banks)" :key="k">
      <button id="yamaha" name="bank" :value="v" @click="o.SendBank" class="btn red">Send Bank {{ v }}</button>
    </div>
  </div>
  
  {{ ch }}

  <div v-if="dx7.show.inf">
    Based on:
    <ul>
      <li>https://uk.yamaha.com/files/download/other_assets/9/333979/DX7E1.pdf</li>
      <li>https://uk.yamaha.com/files/download/other_assets/5/320805/DX7E2.pdf</li>
      <li>https://uk.yamaha.com/en/search/index.html?search=dx7</li>
      <li>https://uk.yamaha.com/en/support/manuals/?l=en&c=&k=dx7</li>
      <li>https://uk.yamaha.com/en/products/contents/music_production/synth_chronology/modal/modal_dx7.html</li>
    </ul>
  </div>
  <br />

  <input type="file" id="dx7Upload" name="dx7" style="display: none" ref="fileInput" accept=".syx" @change="Load" />
</template>
