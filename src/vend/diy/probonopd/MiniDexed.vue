<script setup>
import FX from './FX.vue'
import DX7 from '@midi/vend/yamaha/dx7/DX7.vue'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

/**
 * Set vendor and device manualy(needed if imported)
 */
midi.Vendor({ target: { name: 'diy', value: 'minidexed' } })

function LoadData(o) {
  // 0: File { lastModified: 1701798754000, name: "performance.ini", size: 5089, type: "text/plain", webkitRelativePath: "" }
  console.log('LoadData', o, o.file.name, o.file.size, o.dat)
  const name = o.file.name.split('.')

  if (name[1] == 'ini' || name[1] == 'INI') {
    console.log('Load ini data', o.dat)
  }
}
function Load(e) {
  //const dat = midi.ses.Upload(e)
  console.log('Load', e)
  const [file] = e.target.files
  const reader = new FileReader()
  //reader.addEventListener( 'load', () => { Load(e.target.name, file, reader.result) }, false )
  if (file) {
    //reader.readAsArrayBuffer(file)
    //reader.readAsDataURL(file)
    reader.readAsText(file)
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
  const e = document.getElementById('ini').click()
  console.log('Upload', e)
}


// @TODO add to ses fx: new Array(8).fill(0),
const ini = {
  fx: {
    // * TG FX
    ReverbSize: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbSize', txt: 'RevSize', show: true, type: 'range' },
    ReverbHighDamp: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbHighDamp', txt: 'RevHDamp', show: true, type: 'range' },
    ReverbLowDamp: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLowDamp', txt: 'RevLDamp', show: true, type: 'range' },
    ReverbLowPass: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLowPass', txt: 'RevLPass', show: true, type: 'range' },
    ReverbDiffusion: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbDiffusion', txt: 'RevDiff', show: true, type: 'range' },
    ReverbLevel: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLevel', txt: 'RevLevl', show: true, type: 'range' },
    CompressorEnable: { ctl: 'cc', key: 0xff, name: 'CompressorEnable', txt: 'CompEn', show: false, type: 'button' },
    ReverbEnable: { ctl: 'cc', key: 0xff, name: 'ReverbEnable', txt: 'RevEn', show: true, type: 'button' }
  },
  params: {
    Detune: { ctl: 'cc', key: 0x5e, min: 0, max: 127, def: 0, name: 'Detune', txt: 'De- tune', type: 'range' }, //Detune#':0		# -99 .. 99,
    Cutoff: { ctl: 'cc', key: 0x4a, min: 0, max: 99, def: 99, name: 'Cutoff', txt: 'Cut Off', type: 'range' }, //Cutoff#':99		# 0 .. 99,
    Resonance: { ctl: 'cc', key: 0x47, min: 0, max: 99, def: 0, name: 'Resonance', txt: 'Reso- nance', type: 'range' }, //Resonance#':0		# 0 .. 99,
    ReverbSend: { ctl: 'cc', key: 0x5b, min: 0, max: 99, def: 0, name: 'ReverbSend', txt: 'Rvbr Send', type: 'range' }, //ReverbSend#':0		# 0 .. 99,
  }
}

//const ch = new Proxy(midi.ses.prop[midi.ses.ch].vend.yamaha.dx7, {})
//if(midi.ses.vend.diy == undefined) midi.ses.vend.diy = {}
//if(midi.ses.vend.diy.dx7 == undefined) midi.ses.vend.yamaha.dx7 = { show: { fx: false } }
midi.ses.vend.diy.minidexed = { show: { fx: false } }
const dex = new Proxy(midi.ses.vend.diy.minidexed, {})
</script>

<template>
  <h3>-- probonopd/MiniDexed -- <a href="https://github.com/probonopd/MiniDexed" target="_blank">https://github.com/probonopd/MiniDexed</a> --</h3>

  <div>
    <button id="yamaha" name="dx7" value="fx" @click="Show" class="btn orange" :class="dex.show.fx ? 'on' : ''">FX</button>
    <button class="orange btn" value="perf" @click="Upload">Upload Performance</button>
  </div>


  <FX v-if="dex.show.fx" :ch="ch > -1 ? ch : midi.ses.ch" />

  <DX7 v-for="ch in 8" :key="ch" :ch="ch - 1" />

  <input type="file" id="ini" name="dx7" style="display: none" ref="fileInput" accept=".ini" @change="Load" />
</template>
