<script setup>
/**
 *
 * @link https://uk.yamaha.com/files/download/other_assets/9/333979/DX7E1.pdf
 */

import { onBeforeMount } from 'vue' //, defineComponent

//import { RouterLink, RouterView } from 'vue-router'

import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

//import { useDX7Store } from './dx7'
//const dx7 = useDX7Store()

//import NavView from '../../NavView.vue'
import CC from './CC.vue'
import BankVox from './BankVox.vue'
import IniEdit from './IniEdit.vue'
import VoiceEdit from './VoiceEdit.vue'
//import from './routes'

import map from './map.js'
/*
const Banks_ = defineComponent({
  async setup() {
    const result = ref();

    const response = await fetch('/vendors/yamaha/dx7/banks.json');
    result.value = await response.json();
    console.log('result.value',result.value)
    return { result };
  },
})
const Banks = {}
*/
//let map = { banks:{} }
onBeforeMount(() => {
  //let _dx7 = document.createElement('script')
  ////dx7.setAttribute('src','/midi/vendors/yamaha/dx7/dx7.js')
  ////dx7.setAttribute('src',"/midi/dx7.js")
  //_dx7.setAttribute('src',"/midi/test.js")
  //document.head.appendChild(_dx7)
  //console.log('document.head', document.head)
})

/**
 * Needed while setting up router
 * Set vendor and device manualy(needed if imported?)
 */
//midi.Vendor({ target: { name: 'yamaha', value: 'dx7' } })

const props = defineProps({
  ch: {
    // TODO
    type: Number,
    required: false,
    default: -1
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7f
  }
})

//if(props.ch == undefined) {
//  const ch = new Proxy(midi.ses.ch,{})
//}
/**
 * Create seesion per MIDI Ch for vendor if needed, or comment it out to save ram
 * This will be used in DX7 or other devices, so define it here if used
 * This will create midi.ses.prop[midi.ses.ch].vend.yamaha = {}
 * Then per device per ch @SEE DX7.vue midi.ses.prop[midi.ses.ch].vend.yamaha.dx7 = {}
 */

if(midi.ses.vend.yamaha == undefined) midi.ses.vend.yamaha = {}
if (midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend[midi.ses.vendor] == undefined) {
  for (let ch = 0; ch < midi.ses.conf.midi.chs; ch++) {
    midi.ses.CreateCh(
      {
        dx7: {
          cc: { // Create separate cc as val don't match midi cc
            //1: 0,
            2: 0,
            4: 0,
            5: 0,
            6: 0,
            //7: Vol - main mixer
            64: 0,
            65: 0,
          },
          ini: new Array(14).fill(0),
          vox: new Array(156).fill(0),
          show: { ini: false, vox: false, inf: false }
        }
      },
      ch, 'yamaha'
    )
    Reset()
  }
  /*
  midi.ses.CreateChs({ 
    dx7: { 
      ini: new Array(14).fill(0),
      vox: new Array(156).fill(0),
      show: { fx: false, ini: false, vox: false, inf: false }
    }
  }, 'yamaha')*/
} //  dx7: { ini: {}, vox: new Array(156).fill(0) }

const dx7 = new Proxy(midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7, {})


const o = {
  SendBank: (e) => {
    console.log('SendBank', e.target.value)
    midi.Tx(midi.ses.vend.yamaha.dx7.banks[e.target.value])
  },
  SendVox: () => {
    console.log('SendVox', [0xf0, 0x43, props.ch, 0x00, 0x01, 0x1b, ...dx7.vox.slice(0,155), midi.fn.Crc(dx7.vox.slice(0,155)), 0xF7], ' crc:', midi.fn.Crc(dx7.vox.slice(0,155)))
    midi.Tx([0xf0, 0x43, props.ch > -1 ? props.ch : midi.ses.ch, 0x00, 0x01, 0x1b, ...dx7.vox.slice(0,155), midi.fn.Crc(dx7.vox.slice(0,155)), 0xF7])
  },
  SetVoxName: (e) => {
    let i = 0
    e.target.value = e.target.value.padEnd(10, ' ')
    for( let k = 145; k < 155; k++) {
      midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[k] = e.target.value[i].charCodeAt(0)
      i++
    }
  },
  GetBank: () => { // f=9
    //midi.Tx([0xF0, 0x43, 0x00 | props.ch > -1 ? props.ch : midi.ses.ch, 0x09 ,0xF7])
  },
  GetVox: () => { // f=0
    //midi.Tx([0xF0, 0x43, 0x00 | props.ch > -1 ? props.ch : midi.ses.ch, 0x00 ,0xF7])
  },
  GetPerf: () => { // f=2
    //midi.Tx([0xF0, 0x43, 0x00 | props.ch > -1 ? props.ch : midi.ses.ch, 0x02 ,0xF7])
  },
  Reset: () => { Reset() },
}

function Reset() {
  //console.log('dx7 Reset')

  // OP
  for(let i=0; i < 6; i++) {
    for(let k in map.vox.op) {
      const key = parseInt(k) + (i * 21)
      midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[key] = map.vox.op[k].def
      //console.log('op k:v',k, map.vox.op[k].def)
    }
  }

  // Props
  for(let k in map.vox.props) {
    const key = parseInt(k) + 126
    midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[key] = map.vox.props[k].def
    //console.log('props k:v',k, map.vox.props[k].def, key)
  }

  let i = 0
  const initVoice = 'INIT VOICE'
  // Name
  for( let k = 145; k < 155; k++) {
    midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[k] = initVoice[i].charCodeAt(0)
    i++
  }

  //o.SetVoxName({target:{value:'INIT VOICE'}})
  // On/Off
  midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[155] = 0b00111111

  //console.log('Reset', midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox)

}

//let ch = props.ch > -1 ? props.ch : midi.ses.ch // overload props.ch
//const ch = new Proxy(midi.ses.ch, {})
/* @TODO
let _ch = new Proxy(midi.ses,{})
if(props.ch != undefined) {
  _ch = props.ch
}
console.log('ch',props.ch)
*/
//const Ch = ref(-1)
/*
const dx7 = LoadJson('/vendor/yamaha/dx7.json')
//console.log('dx7', dx7)//Object.keys(Banks),
*/
/**
 * Watch MIDI Ch for changes and gen ses for selected ch if not avail
 
watchEffect(() => {
  if(props.ch > -1) { // if 
    console.log('watchEffect props.ch', props.ch)
  } else {
    ch = midi.ses.ch
    console.log('watchEffect', {ch:ch, ses:midi.ses.ch, prop:props.ch})
    Create()
  }
})
*/
//let show = {}

//  name="msb" :data-ch="ch" :data-key="0x00" @change="midi.CC" v-model="midi.ses.prop[midi.ses.ch].cc[0x00]"
// @change="Bank" :value="bank"
function TxIni(e) {
  const id = parseInt(e.target.getAttribute('data-id'))
  const key = parseInt(e.target.getAttribute('data-key'))
  const val = parseInt(e.target.value)
  console.log('Tx ini', e.target.id, e.target.name, id, key, val, e.target.type)

  const payload = []
  payload[0] = 0xf0
  payload[1] = 0x43
  payload[2] = 0x10 | (props.ch > -1 ? props.ch : midi.ses.ch)
  //payload[3] = 0x00 // VCED
  //payload[3] = 0x18 // ACED
  //payload[3] = 0x1a // PCED
  //payload[3] = 0x1b // switch
  payload[3] = 0b00001000 // 0gggggpp g=2 = function parameter;  g=0=voice;
  payload[4] = key
  payload[5] = val
  payload[6] = 0xf7
  midi.Tx(payload)
  dx7.ini[id] = val
  //console.log('dx7.ini', {ch:props.ch, id:id,  key:key, val:val},e.target.name, payload)
}
/**
 *
 * @param {Event} e Voice param id:val to Tx
 */
function TxVox(e) {
  const key = parseInt(e.target.getAttribute('data-key'))
  const val = parseInt(e.target.value)

  if (e.target.type == 'submit') {
    // button
    dx7.vox[key] = dx7.vox[key] == 1 ? 0 : 1 // flip min/max //console.log('dx7.vox checkbox', {min:e.target.min, max:e.target.max, val:dx7.vox[key]}, e.target.value)
  } else {
    dx7.vox[key] = val //midi.ses.prop[props.ch].vend.yamaha.dx7.vox[payload[4]] = payload[5] //console.log('dx7.vox', {ch:props.ch, key:key, val:dx7.vox[key]})
  }

  const payload = []
  payload[0] = 0xf0
  payload[1] = 0x43
  payload[2] = 0x10 | (props.ch > -1 ? props.ch : midi.ses.ch)
  //payload[3] = 0x00 // VCED
  //payload[3] = 0x18 // ACED
  //payload[3] = 0x1a // PCED
  //payload[3] = 0x1b // switch
  payload[3] = 0x00 // VCED
  payload[4] = key
  payload[5] = dx7.vox[key]
  payload[6] = 0xf7
  // inc byte 3 if key is more than 7F and start coulting from 0
  if (payload[4] > 0x7f) {
    payload[3] = 0x01 //payload[3] | 0x01
    payload[4] = payload[4] - 0x80
  }
  midi.Tx(payload)
  console.log('dx7.vox', {ch:props.ch, key:key, val:val},e.target.name, payload)
}

/**
 * Receive MIDI msgs and forward it to sorting
 * @param {Array} a
 */
midi.RxQueueAdd('dx7', (a) => {
  Rx(a)
})
function Rx(a) {
  // a[0] Status byte
  if (a[0] == 0xf0) {
    // SysEx

    // a[1] Identification number
    if (a[1] == 0x43) {
      // Yamaha

      // a[2] Sub status (s=0) & Channel number 0x0sssNNNN (n=0;ch1)
      //const ss = a[2] & 0b01110000 // sub status
      //@TODO device id
      const id = a[2] & 0x0f // MIDI devId/Ch?

      if (a[2] == 0x10) { // single vox param
        // Vox ctl
        //if(a[3] == 0) {}
        let key = a[4]
        let val = a[5]
        // Roll Over
        if (a[3] == 1) {
          key = key + 0x80
        } //console.log('dx7 RX Voice Edit - ROOL OVER -', { key:key, val:val}) //
        console.log('dx7 RX Voice Edit', {aLen: a.length, roll:a[3], key:key, val:val})//, dat:midi.Hex([key, val])
        midi.ses.prop[props.ch > -1 ? props.ch : midi.ses.ch].vend.yamaha.dx7.vox[key] = val
      } //else {
        //console.log('DX7 Rx SysEx catch all:', a, ' @TODO')
      //}

      // a[3] Format number
      if (a[3] == 0x00) { // Bulk data of 1 voice
        if(a.length == 163) {
          const countMSB = a[4]
          const countLSB = a[5]
          const count = (a[4] << 7) | a[5]
          const dat = a.slice(6, 6 + 155)
          dat.push(0b00111111) // OP On/off
          const crc = a[6 + 155]
          const crcRx = midi.fn.Crc(a.slice(6, 6 + 155))
          if(crc == crcRx) midi.ses.prop[midi.ses.ch].vend.yamaha.dx7.vox = dat
          console.log('dx7 RX Bulk data of 1 voice byte count:', count, { aLen: a.length, datLen: dat.length, countMSB: countMSB, countLSB: countLSB, count:count }, ' crc?:', crc, '==', crcRx, a) //, crc:midi.Hex([crcTx, crcRx]), eof:midi.Hex([a[162]])}, midi.Hex(dat))
        }
      } else
      
      if (a[3] == 0x02) { // Performance data of the DX1 A-side(from DX7E1.pdf)
        //console.log('Performance data, length:', a.length)
        const countMSB = a[4]
        const countLSB = a[5]
        const dat = a.slice(6, 6 + 94)
        const crcTx = a[6 + 94 + 1]
        const crcRx = midi.fn.Crc(a.slice(6, 6 + 94))
        console.log('dx7 RX Performance data', { aLen: a.length, datLen: dat.length, countMSB: countMSB, countLSB: countLSB }, ' crc:', crcTx, crcRx, a) //, crc:midi.Hex([crcTx, crcRx]), eof:midi.Hex([a[4098]])}, midi.Hex(dat))
      } else
      
      if (a[3] == 0x09) { // Bulk data of 32 voices
        if(a.length == 4104) {
          const countMSB = a[4]
          const countLSB = a[5]
          const dat = a.slice(6, 6 + 4096)
          const crcTx = a[6 + 4096]
          const crcRx = midi.fn.Crc(a.slice(6, 6 + 4096))
          console.log('dx7 RX Bulk data of 32 voices', { aLen: a.length, datLen: dat.length, countMSB: countMSB, countLSB: countLSB }, ' crc:', crcTx, crcRx, a) //, crc:midi.Hex([crcTx, crcRx]), eof:midi.Hex([a[4098]])}, midi.Hex(dat))
        } else { console.log('dx7 RX Bulk data of 32 voices, length:', a.length) }
      }
      
      /*
      if(ss == 0) {
        //
      }

      if(ss == 1) { // Parameter change
        //g = 0x0gggggPP
        //const g0 = 
        //if(a[3] == ) {}
      }

      //console.log('dx7 RX voice', {aLen: a.length, dat:midi.Hex(a)})
*/
    } else {
      console.log('not dx7 msg or not implemented or error')
    }
  } // not SysEx else { console.log('dx7 RX todo') }
}

/*
// Set all OPs to On
midi.ses.prop[props.ch].vend.yamaha.dx7.vox[155] = 0b00111111

// Test
const singleVoice = 'f0 43 01 00 01 1b 55 15 19 2d 63 3a 00 00 00 00 00 00 00 00 00 00 4c 00 08 00 0b 17 63 25 2d 00 62 00 00 00 00 00 00 00 01 00 03 5c 00 01 00 07 55 15 19 2d 5c 3a 00 00 00 00 00 00 00 00 00 00 4c 00 06 00 05 1b 63 25 2d 00 63 00 00 00 00 00 00 00 01 00 03 61 00 01 00 0e 2e 27 19 26 49 5f 49 00 00 00 00 00 00 00 00 00 49 00 01 00 09 36 1c 27 2e 63 3a 00 00 00 00 00 00 00 00 00 00 63 00 01 00 00 54 5f 5f 3c 32 32 32 32 04 00 00 23 40 04 00 00 04 01 18 42 45 4c 4c 2d 46 4c 55 54 45 10 f7'
const binVoice = midi.Bin(singleVoice) // .length = 163
const vox = binVoice.slice(6, 6+155)
vox.push(0b00111111) // OP status switches, turn all on
midi.ses.prop[props.ch].vend.yamaha.dx7.vox = vox
//console.log('dx7.vox singleVoice.length', { len:binVoice.length, crc:midi.Hex([midi.fn.Crc(vox)]) }, Sort(binVoice), vox )
*/
</script>

<template>
  <div v-if="dx7.show.cc">
    <span v-for="(v,k) in dx7.cc" :key="k">
      {{ map.ini.cc[k].t }} {{ dx7.cc[k] }} <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="Number(k)" :prop="map.ini.cc[k]" />
    </span>
    <br />
    <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="96" :prop="map.ini.cc[96]" />
    <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="97" :prop="map.ini.cc[97]" />
    <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="125" :prop="map.ini.cc[125]" />
    <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="126" :prop="map.ini.cc[126]" />
    <CC :ch="ch > -1 ? ch : midi.ses.ch" :cc="127" :prop="map.ini.cc[127]" />
  </div>
  <BankVox :ch="ch > -1 ? ch : midi.ses.ch" :Banks="map.banks" :o="o" />
  <IniEdit v-if="dx7.show.ini" :f="TxIni" :ini="map == undefined ? { map: { ini: { params: {} } } } : map.ini.params" :val="dx7.ini" :ch="ch > -1 ? ch : midi.ses.ch" />
  <VoiceEdit v-if="dx7.show.vox" :f="TxVox" :vox="map == undefined ? { map: { vox: {} } } : map.vox" :val="dx7.vox" :o="o" />
</template>
