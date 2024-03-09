import { ref, computed, watch, isProxy, toRaw } from 'vue' // , getCurrentInstance
import { useRouter } from 'vue-router' // useRoute, 


import { defineStore } from 'pinia'

import { default as routes } from '../vend/routes.js'
//const routes = { aa:{}}
//console.log('routes', routes, Object.keys(routes))

import ccs from './maps/ccs'
import sxs from './maps/sxs'
//import vendor from '../stores/maps/vendor'

import fn from './fn' // Various functions
//console.log('fn', fn.ParseMidiFile([]))

import { useSesStore } from './ses'
//console.log('conf', ses.conf)
//const ses = {}

//import note from '@midi/stores/maps/note'

//import { useConfStore } from '@midi/stores/conf'
//const conf = useConfStore()

//import { useWSStore } from '@midi/stores/ws'
import { useWebMidiStore } from '@midi/stores/webMidi'
import { useWebSerialStore } from '@midi/stores/webSerial'
//import { useSerialStore } from '@midi/stores/serial'

//console.log('conf', conf)
/*
async function GetJson(url) {
  const response = await fetch(url)
  return await response.json()
}*/
//const vendor = await fn.GetJson('/midi/MidiVendors.json')
import vendor from '@midi/stores/maps/vendor'

export const useMidiStore = defineStore('midi', () => {
  // export const useMidiStore = defineStore('midi', (conf) => {
  //console.log('conf in midi',conf)

  const ses = useSesStore()
  //ses.Defaults()

  const webMidi = useWebMidiStore()
  const webSerial = useWebSerialStore()

  // LUT for note id to note letter and octave
  const note = fn.Notes(ses.conf.midi.notes)

  /*
  // 16 midi ch in/out routing
  const matrix = ref([])
  for (let i = 0; i < ses.conf.midi.chs; i++) {
    matrix.value.push({ in: 0, out: 0 })
  }
  console.log('Matrix', matrix)
  */


/*
  const ports = new Proxy({
    webMidi: [],
    webSerial: webSerial
  },{})*/
  //const port = -1 // selected tx port

  if (ses.conf.midi.webMidi) {
    webMidi.Open() // Open Web Midi
    webMidi.OnRx(RxWebMidi) // Function to receive the data from Web Midi
    //console.log('webmidi on rx', webMidi.Rx)
  }
  if (ses.conf.midi.webSerial) {
    //ports.web.serial = 
    //webSerial.Ports()
    //webSerial.Listen()
    //webSerial.Open() // Open Web Midi
    webSerial.OnRx(RxWebSerial) // Function to receive the data from Web Midi
    //console.log('webmidi on rx', webMidi.Rx)
  }

  //const ws = useWSStore()
  //const webmidi = useWebmidiStore()
  //const serial = useSerialStore()

  //const history = ref({rx:[], tx:[]})
  //const historyLength = ref(conf.midi.historyLength)

  //if(conf.debug === false) console.log = function() {}

  //const conf = ref(_conf)

  /**
   * Currently selected midi ch
   */
  //const ch = ref(1)

  //const show = ref({ midi: false, keyboard: false })

  /**
   * PropInRange
   * Validate incoming value is in range
   *
   * @param {Number} key
   * @param {Number} val
   * @returns {Bool}
   
  function PropInRange(key, val) {
    //props.value[ses.ch.value].val[key].min && props.value[ses.ch.value].val[key].max
    return true
  }
  function Inc(cc) {}
  function Dec(cc) {}
  function Wheel(cc) {}*/
  function CC(e) {
    let ch = ses.ch
    const _ch = parseInt(e.target.getAttribute('data-ch'))
    if (_ch > -1 && _ch < ses.conf.midi.chs) ch = _ch
    const cc = 0xb0 | ch // Add MIDI Ch to cc

    //const id = e.target.id
    const key = parseInt(e.target.getAttribute('data-key'))
    let val = parseInt(e.target.value)

    switch (key) {
      // Push buttons that fire once. No need to do anything
      case 0x78: // All Sound Off
      case 0x79: // Reset All Controllers
      case 0x7b: // All Notes Off
        break

      // On/Off button. Flip min with max for on/off
      case 0x40: // Sustain
      case 0x41: // Portamento
      case 0x42: // Sostenuto
      case 0x43: // Soft Pedal
      case 0x44: // Legato Footswitch
      case 0x45: // Hold 2
      case 0x7a: // Local Control
        ses.prop[ch].cc[key] == ses.ccs[key].min ? (ses.prop[ch].cc[key] = ses.ccs[key].max) : (ses.prop[ch].cc[key] = ses.ccs[key].min)
        val = ses.prop[ch].cc[key]
        break

      // Set key to val
      default:
        ses.prop[ch].cc[key] = val
    }
    //console.log('--CC ch:', ch, ' ses.ch:', ses.ch)

    // Tx CC
    switch (key) {
      // Send MSM+LSB if any changes
      case 0x00: // Bank MSB
      case 0x20: // Bank LSB
        Tx([cc, 0x00, ses.prop[ch].cc[0x00]]) // msb
        Tx([cc, 0x20, ses.prop[ch].cc[0x20]]) // lsb
        break

      /*
        To set or change the value of a Registered Parameter:
        1. Send two Control Change messages using Control Numbers 101 (65H) and 100 (64H) to select the
        desired Registered Parameter Number, as per the following table.
        2. To set the selected Registered Parameter to a speci c value, send a Control Change messages to the
        Data Entry MSB controller (Control Number 6). If the selected Registered Parameter requires the LSB to be
        set, send another Control Change message to the Data Entry LSB controller (Control Number 38).
        3. To make a relative adjustment to the selected Registered Parameter's current value, use the Data
        Increment or Data Decrement controllers (Control Numbers 96 and 97).
      */
      case 0x65: // Registered Parameter Number (RPN) - MSB*
      case 0x64: // Registered Parameter Number (RPN) - LSB*
        //Tx([cc, 0x65, ses.prop[ch].cc[0x65]]) // msb
        //Tx([cc, 0x64, ses.prop[ch].cc[0x64]]) // lsb
        break

      /**
       * Firing All Notes Off first, before mode switch @TODO verify order
       * Reception follows the same rules as All Notes Off -- Ignore if OMNI is On." from Recommended Practice (RP-015)
       */
      case 0x7c: // Omni Mode Off (+ all notes off)
        Tx([cc, 0x7b, 0x00]) // all notes off
        Tx([cc, key, val]) // Omni Mode Off
        break
      case 0x7d: // Omni Mode On (+ all notes off)
        //Tx([cc, 0x7b, 0x00]) // all notes off
        Tx([cc, key, val]) // Omni Mode On
        break
      case 0x7e: // Mono Mode On (+ poly off, + all notes off)
        Tx([cc, 0x7b, 0x00]) // all notes off
        Tx([cc, key, val]) // Mono Mode On
        break
      case 0x7f: // Poly Mode On (+ mono off, +all notes off)
        Tx([cc, 0x7b, 0x00]) // all notes off
        // Make sure
        Tx([cc, key, val]) // mono off
        break

      default:
        Tx([cc, key, val])
    }
    //console.log('CC TX', ch, key, val, e.target.type, e.target.name )
    //console.log('CC ch prop', ch, toRaw(ses.prop) )
    //console.log('CC ch:', ses.ch, ses.prop[0].cc, ses.prop[1].cc, ses.prop[2].cc, ses.prop[15].cc )
  }
/*
  function PCRaw(a) {
  }
  **
   * Program Change
   * @param {Event} e from html
   *
  function PC(e) {
    let pc = 0xc0
    let ch = parseInt(e.target.getAttribute('data-ch'))

    if (ch > -1 && ch < 16) pc = pc | ch
    else ch = ses.ch
    pc = pc | ses.ch

    const val = parseInt(e.target.value)

    //if(ch > -1 && ch < 16) pc = 0xC0 | ch

    PCRaw([pc, val])
  }
*/
  /**
   * Transport control
   * keyboard map from ./components/sub/KbdMap.vue
   */


  function Pc(v, ch = ses.ch) {
    Tx([0xC0 | ch, v])
    ses.prop[ch].pc = v
  }
  function PC(e) {
    //console.log('PC', e.target.value)
    const ch = (e.target.getAttribute('data-ch') != undefined) ? parseInt(e.target.getAttribute('data-ch')) : ses.ch // typeof e.target.getAttribute !== 'undefined' && 
    const val = parseInt(e.target.value)
    Tx([0xC0 | ch, val])
    ses.prop[ch].pc = val
    //console.log('PC', { pc: Hex(val) })
  }/*
  const _PC = {
    //id: 0,
    ch: 0,
    //dev: 0x7F,
    //key: 0,
    val: 0,
    e: (e) => { // event
      //PC.id = parseInt(e.target.id)
      //PC.key = parseInt(e.target.name)
      PC.val = parseInt(e.target.value)
      PC.ch = e.target.getAttribute('data-ch') != null ? parseInt(e.target.getAttribute('data-ch')) : ses.ch
      //PC.dev = e.target.getAttribute('data-dev') != null ? parseInt(e.target.getAttribute('data-dev')) : ses.prop[PC.ch].dev
      PC.Tx()
      console.log('PC', PC)
    },
    Tx: () => { // also reset
      Tx([0xC0 | PC.ch, PC.val])
      ses.prop[PC.ch].pc = PC.val
      console.log('PC', { pc: Hex(PC.val) })
    }
  }*/
  //function Vox(e) { Pc(e) }

  /**
   * @TODO animate
   * Pitch Bend, not lead
   * @param {Array} a:[msb,lsb]
   */
  function PB(o) {
    // Pitch Bend takes two Data bytes, the first one being the Least Significant Byte (LSB) and the second
    // being the Most Significant Byte (MSB).
    let pb = 0xe0 | ses.ch
    if (o.ch > -1 && o.ch < 16) pb = 0xe0 | o.ch

    Tx([pb, o.msb, o.lsb])
    ses.prop[ses.ch].pb = [o.msb, o.lsb]
    console.log('midi.PB', Hex([pb]), o)
  }

  /**
   * Send SysEx
   * @param {Object} o {}
   */
  function Sx(o) {
    console.log('Sx', o)
    const pay = [0xF0]

    Tx(pay)
  }

  /**
   * Transport control
   * keyboard map from ./components/sub/KbdMap.vue
   */
  const TP = {
    id: 0,
    ch: 0,//@TODO ch = parseInt(e.target.getAttribute('data-ch'))
    dev: 0x7F,
    key: 0,
    val: 0,
    e: (e) => {
      // event

      TP.id = parseInt(e.target.id)
      TP.key = parseInt(e.target.name)
      TP.val = parseInt(e.target.value)

      //TP.ch = parseInt(e.target.getAttribute('data-ch')) || ses.ch
      //const dev = parseInt(e.target.getAttribute('data-dev'))
      TP.ch = e.target.getAttribute('data-ch') != null ? parseInt(e.target.getAttribute('data-ch')) : ses.ch
      TP.dev = e.target.getAttribute('data-dev') != null ? parseInt(e.target.getAttribute('data-dev')) : ses.prop[TP.ch].dev
      TP.Tx()
      console.log('TP', TP)
    },
    Toggle: () => {
      if (ses.tp.state == 'play') TP.val = 0x01 // Stop TpState([0,0,0,0,0x01]) // stop
      if (ses.tp.state == 'stop') TP.val = 0x02 // Play Tp({ e: { target: { id: 0x7f, name: 0x06, value: 0x02 } } }) //TpState([0,0,0,0,0x02]) // play
      TP.Tx()
      console.log('Toggle',this)
    },
    Play: () => {
      if (ses.tp.state != 'play') TP.val = 0x02//Tp({ e: { target: { id: 0x7f, name: 0x06, value: 0x02 } } })
      TP.Tx()
      console.log('play')
    },
    Stop: () => {
      if (ses.tp.state != 'stop') TP.val = 0x01//Tp({ e: { target: { id: 0x7f, name: 0x06, value: 0x01 } } })
      TP.Tx()
      console.log('stop')
    },
    State: (a = null)=>{
if(a != null) TP.val = a[5]
      switch (TP.val) {
        case 0x02:
          ses.tp.state = 'play'
          break

        case 0x01:
          ses.tp.state = 'stop'
          ses.tp.rec = false
          break

        case 0x09:
          //ses.tp.state = 'pause'
          //ses.tp.rec = true // ddx3216
          break

        case 0x05:
          //ses.tp.state = 'rew'
          ses.tp.rec = false
          ses.tp.state = 'stop'
          break

        case 0x04:
          //ses.tp.state = 'ff'
          ses.tp.rec = false
          ses.tp.state = 'stop'
          break

        case 0x06: // RECORD STROBE
          //ses.tp.rec = true
          ses.tp.state = 'play'
          ses.tp.rec = true
          break

        case 0x07: // RECORD EXIT
          //ses.tp.rec = true
          ses.tp.state = 'stop'
          ses.tp.rec = false
          break
      }
    },
    Tx: () => {
      Tx([0xF0, TP.id, TP.dev, TP.key, TP.val, 0xF7])
      TP.State()
    }
  }

  /**
   * NoteOn @TODO
   * @param {Number} ch
   * @param {Number} note
   * @param {Number} vel velocity
   */
  function NoteOn(n) {//, vel = 0x7f
    /*
    if (typeof n === 'string' || n instanceof String) {
      //n = noteStrToHex[n]
      Tx([0x90 + (ses.ch.value), n, parseInt(v)])
    }
    if (typeof n === 'number' || n instanceof Number) {
      Tx([0x90 + (ses.ch.value), parseInt(n), parseInt(v)])
    }
    // could do if string/number
    //if(n.isArray()) {
    if(n.lenght == 2) {
      Tx([0x90 + (ses.ch.value), parseInt(n[0]), parseInt(n[1])])
      ses.Hist('tx', 'note', [0x90 + (ses.ch.value), parseInt(n[0]), parseInt(n[1])])
    } else {
      Tx([0x90 + parseInt(n[0]-1), parseInt(n[1]), parseInt(n[2])])
      ses.Hist('tx', 'note', [0x90 + parseInt(n[0]-1), parseInt(n[1]), parseInt(n[2])])
    }
  //} else {
    //TX([0x90 + (ses.ch.value), parseInt(n), 0x7f])
  //}
  */
    Tx([parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
    //ses.Hist('tx', 'note', [parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
  }
  function NoteOff(n) {
    /*
    if(n.lenght == 2) {
      Tx([0x80 + (ses.ch.value), parseInt(n[0]), parseInt(n[1])])
      ses.Hist('tx', 'note', [0x80 + (ses.ch.value), parseInt(n[0]), parseInt(n[1])])
    } else {
      Tx([0x80 + parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
      ses.Hist('tx', 'note', [0x80 + parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
    }
    */
    Tx([parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
    //ses.Hist('tx', 'note', [parseInt(n[0]), parseInt(n[1]), parseInt(n[2])])
  }
  function Tx(a) {
    if (isProxy(a)) {
      a = toRaw(a)
    }

    if (ses.conf.midi.webMidi) webMidi.Send(a)
    //if (ses.conf.midi.webSerial) webSerial.Send(a)
    //if (conf.ig.midi.wsMidi) ws.send(d)

    /**
     *
     * send
     *
     */

    /**
     * History
     */
    ses.prop.midi.tx = a // latest tx msg, overwritten by next incoming msg
    ses.Hist(a, 'tx')

    console.log('<--- Tx', a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()), Decode(a), a) //, DecToHexString(a), DecToHexStringArray(a)

    //ses.history.tx.push(d) // { dst:webmidi,dat:[] }
    //if(ses.history.len > ses.history.tx.lenght) ses.history.tx.shift()
  }

  /**
   * RxQueue - Object of functions for MIDI devices to receive MIDI
   * Any page can add a 'listener' function to this queue
   * On MIDI Rx, evey function in this object is executed,
   * So if it is used and your page no longer needs it when navigating away, delete it, so not to clog up the queue
   * @TODO make it async
   * @TODO 
   */
  const RxQueue = ref({}) // object with functions to receive midi in vendors, vendor manages the functions, see example at behringer/ddx3216/SX.vue

  function RxQueueAdd(s, F) {
    RxQueue.value[s] = (a) => { F(a) }
  }
  function RxQueueRm(s) {
    delete RxQueue.value[s]
  }
  function RxWebMidi(a) {
    //ses.prop.midi.rx = a // lastest rx msg, overwritten by next incoming msg
    //console.log('---> RX WEB', Decode(a), a)
    //console.log('---> RX WEB HEX', a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()))
    Rx(a)
  }

  const RxSerialQueue = ref({}) // object with functions to receive midi in vendors, vendor manages the functions, see example at behringer/ddx3216/SX.vue

  function RxSerialQueueAdd(s, F) {
    RxSerialQueue.value[s] = (a) => { F(a) }
  }
  function RxSerialQueueRm(s) {
    delete RxSerialQueue.value[s]
  }

  function RxWebSerial(a) {
    for (const i in RxSerialQueue.value) {
      RxSerialQueue.value[i](a) // send RXed msg to all functions in RxQueue array, vendor manages the functions, see example at behringer/ddx3216/SX.vue
    }
    //Rx(a)
  }

  function Rx(a) {
    //console.log('---> RX func typeof RxQueue', typeof RxQueue.value)
    //if (typeof RxQueue.value === 'function') {
    
    

    //console.log('---> RX func', Decode(a), a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()), a) //, DecToHexString(a), DecToHexStringArray(a)
    //}
    if (a[0] == 0xF1) {
      //skip log
      RtTcQuarterFrame(a)
    } else if (a[0] == 0xF0 && a[1] == 0x7f && a[3] == 0x06 && a[4] == 0x44) {
      // {txt: 'Real Time', cat: 'sx', sub: 'rt', deviceId: 0, final: 'LOCATE',…} (13) ['F0', '7F', '00', '06', '44', '06', '01', '00', '00', '06', '12', '00', 'F7']
      RtTcLocate(a)
    } else if (a[0] == 0xF0 && a[1] == 0x7f && a[3] == 0x01) {
      // {txt: 'Real Time', cat: 'sx', sub: 'rt', deviceId: 127, val: '@MIDI Time Code',…} (10) ['F0', '7F', '7F', '01', '01', '20', '00', '0D', '02', 'F7'] (10)[240, 127, 127, 1, 1, 32, 0, 13, 2, 247]
      //TsTimecode(a)
      RtTcFull(a)
    } else if (a[0] == 0xF8) {
      // {msg: 'Timing Clock'} ['F8'] [248]
      // do nothing for now @TODO
    } else if ((a[0] & 0xF0) == 0xb0) {
      // cc
      ses.prop[a[0] & 0x0f].cc[a[1]] = a[2]
      //console.log('CC', ' ch:',a[0] & 0x0F, ' key:', a[1], ' val:', a[2], ses.prop[a[0] & 0x0F].cc[a[1]])
    } else if ((a[0] & 0xF0) == 0xe0) {
      // Animate pitch bend
      ses.prop[ses.ch].pb = [a[1], a[2]]
    } else {
      console.log('---> RX', a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()), Decode(a), a) //, DecToHexString(a), DecToHexStringArray(a)

      /**
       * Send msg to every function in the queue
       * @TODO make it async
       */
      for (const i in RxQueue.value) {
        RxQueue.value[i](a) // send RXed msg to all functions in RxQueue array, vendor manages the functions, see example at behringer/ddx3216/SX.vue
      }
      //["F0", "00", "20", "32", "00", "0B", "20", "01", "00", "01", "07", "06", "F7"]
    }

    ses.prop.midi.rx = a // lastest rx msg history , overwritten by next incoming msg
    ses.Hist(a, 'rx')
  }
  /**
   * Set MIDI Ch.
   * @param {Number} ch MIDI Ch 0-15
   * @returns {Number} MIDI Ch
   */
  function Ch(ch = -1) {
    console.log('set midi ch', ch)
    if (ch > -1 && ch < 16) ses.ch = ch
    return ses.ch
  }
  function CH(e) {
    Ch(parseInt(e.target.value))
  }
  /*
  function Param(ch = null, key = null) {
    if (ch == null) ch = ses.ch
    return ses.param[ch]
  }
*/
  const devs = { 0x7f: 'All' } // dev var lives in session per midi ch
  for (let i = 0; i < 127; i++) {
    // generate device array for dropdown
    devs[i] = i.toString(16).toUpperCase().padStart(2, '0')
  }
  // Quarter Frame
  //const RtQfLastKey = undefined // to determin direction
  const RtQfDirection = 1 // 1=forward; 0=backward
  // cache
  const qf = {
    hh: { msb: 0, lsb: 0 },
    mm: { msb: 0, lsb: 0 },
    ss: { msb: 0, lsb: 0 },
    fr: { msb: 0, lsb: 0 },
    tc: { hh: 0, mm: 0, ss: 0, fr: 0 }
  }

  //const usb = {}
  const Usb = {
    usb: {},
    Id: async (vend) => {
      if(Usb.usb.ids == undefined) {
        Usb.usb.ids = await fn.GetJson('/midi/UsbVendors.json')
      }
      return Usb.usb.ids[vend] != undefined ? Usb.usb.ids[vend] : vend
    },
    Dev: async (vend, dev) => {
      if(Usb.usb.dev == undefined) {
        Usb.usb.dev = await fn.GetJson('/midi/UsbDevices.json')
      }
      return (Usb.usb.dev[vend] != undefined && Usb.usb.dev[vend][dev] != undefined) ? Usb.usb.dev[vend][dev] : {t:dev,txt:dev}
    }
    
  }

  function Show(e) {
    console.log('midi.Show', e.target.id, e.target.name, e.target.value)
    if(ses.device != '') { // Set device
      ses.vend[e.target.id][e.target.name].show[e.target.value] = !ses.vend[e.target.id][e.target.name].show[e.target.value]
    } else { // Set vendor
      ses.vend[e.target.id].show[e.target.value] = !ses.vend[e.target.id].show[e.target.value]
    }
    //ses.vend.yamaha.dx7.show.ini = !midi.ses.vend.yamaha.dx7.show.ini
  }
  /*
  const show = computed(() => 
    console.log('--midi.show = computed', ses.vendor, ses.device, ses.vend[ses.vendor], toRaw(ses.vend))
    return ses.vend[ses.vendor]//[ses.device].show
  })
*/
  // Create if instrument loaded without navigation
  if(ses.vendor != '' && ses.vend[ses.vendor] == undefined) ses.vend[ses.vendor] = {}
  if(ses.device != '' && ses.vend[ses.vendor][ses.device] == undefined) ses.vend[ses.vendor][ses.device] = {}
  function Vendor(e) {
    if(ses.vend[e.target.name] == undefined) ses.vend[e.target.name] = {}
    ses.vendor = e.target.name
    ses.device = ''//e.target.name
    //console.log('--Vend name:', e.target.name, ' vendor:', ses.vendor, ' value:', e.target.value,)
    if(e.target.value != undefined) Device(e)
    //midi.router.currentRoute.matched[0].children
  }
  function Device(e) {
    if(ses.vend[ses.vendor][e.target.value] == undefined) ses.vend[ses.vendor][e.target.value] = {}
    ses.device = e.target.value
    //console.log('--Device:', e.target.value, ' vendor:', ses.vendor, ses.device, devices.value)
  }
  //const d = routes['diy'].children.map((o)=>o.path)
//console.log('Object.values()', d, routes['diy'] )


const router = useRouter() //const route = useRoute()

//console.log('route:',route,' router:',router)
//console.log('route:',router.currentRoute.value)
/**
 * Watch for route changes, set vendor/device
 */
watch(() => router.currentRoute.value, async dat => {
  //userData.value = await fetchUser(newId)
  const parts = dat.path.split('/')
  switch(parts.length) {
    case 3: // [ "", "midi", "lemons" ]
      Vendor({target:{name:parts[2]}})
      break
    case 4: // [ "", "midi", "lemons", "sx" ]
      Vendor({target:{name:parts[2],value:parts[3]}})
        break
  }
  //console.log('--App watch route', dat, parts )
})

  const devices = computed(() => {
    //return ses.vendor != '' && routes[ses.vendor].children != undefined ? routes[ses.vendor].children.map((o)=>o.name) : [] // Object
    return ses.vendor != '' && routes[ses.vendor][0].children != undefined ? routes[ses.vendor][0].children.map((o)=>o.name) : []
    //return router.currentRoute.value.matched[0].children
    //return router.currentRoute.matched != undefined && router.currentRoute.matched[0] != undefined ? router.currentRoute.matched[0].children.map((o)=>o.name) : [] // router.currentRoute.matched[0].children
  })
  const deviceTxt = computed(() => {
    return ses.vendor != '' && routes[ses.vendor][0].children != undefined  ? routes[ses.vendor][0].children.map((o)=>o.meta.txt) : []
  })
  //console.log('----devices = computed', routes[ses.vendor].devices)
  //}
  //const vendors =  ref('lemons','roland','yamaha')

  const vendors = Object.keys(routes)
  //console.log('vendors', vendors)

  return {
    ses,
    webMidi, webSerial, // stores   note,
    devs,
    vendor, // const vendor array
    vendors, routes, // const available vendors, routes
    devices, deviceTxt, // computed vendor devices
    Ch,CH,
    CC,
    PB,
    Pc,PC,//PCRaw,
    Sx,
    Tx,
    Rx,
    RxQueueAdd, RxQueueRm, RxSerialQueueAdd, RxSerialQueueRm, //RxQueue,
    TP,
    NoteOn,
    NoteOff, // Midi functions
    Decode,
    Bin,Hex,HexArr, // DecToHexString, DecToHexStringArray, // util functions, move to fn?
    fn, note,// functions
    Vendor, Device,
    Show,
    Usb,

    router,
    //GetJson,
    //Tmp,
  }
































  function RtTcQuarterFrame(a) {
    //dat.msg = '1byte (timecode nibble)'
    // Quarter Frame Messages (2 bytes):
    const m = a[1] & 0xF0
    const l = a[1] & 0x0f
    switch (m) {
      case 0x00: // The arrival of the F1 0X and F1 4X messages always denote frame boundaries.
        //dat.msg = 'Frame count LS nibble'
        //console.log('RtTcQuarterFrame ff lsb',Hex([m,l]))
        qf.fr.lsb = l
        if (RtQfDirection == 0) ses.tc.fr = qf.fr.msb | qf.fr.lsb
        break

      case 0x10:
        //dat.ff.msg = 'Frame count MS nibble'
        //console.log('RtTcQuarterFrame ff msb',Hex([m,l]))
        qf.fr.msb = l
        if (RtQfDirection == 1) ses.tc.fr = qf.fr.msb | qf.fr.lsb
        break

      case 0x20:
        //dat.ss.msg = 'Seconds count LS nibble'
        //console.log('RtTcQuarterFrame ss lsb',Hex([m,l]))
        if (RtQfDirection == 0) ses.tc.ss = qf.ss.msb | qf.ss.lsb
        qf.ss.lsb = l
        break

      case 0x30:
        //dat.ss.msg.msb = 'Seconds count MS nibble'
        //console.log('RtTcQuarterFrame ss msb',Hex([m,l]))
        qf.ss.msb = l
        if (RtQfDirection == 1) ses.tc.ss = qf.ss.msb | qf.ss.lsb
        break

      case 0x40: // The arrival of the F1 0X and F1 4X messages always denote frame boundaries.
        //dat.ss.msg = 'Minutes count LS nibble'
        //console.log('RtTcQuarterFrame mm lsb',Hex([m,l]))
        qf.mm.lsb = l
        if (RtQfDirection == 0) ses.tc.mm = qf.mm.msb | qf.mm.lsb // @TODO wrong mins?
        break

      case 0x50:
        //dat.mm.msg = 'Minutes count MS nibble'
        //console.log('RtTcQuarterFrame mm msb',Hex([m,l]))
        qf.mm.msb = l
        if (RtQfDirection == 1) ses.tc.mm = qf.mm.msb | qf.mm.lsb // @TODO wrong min?
        break

      case 0x60:
        //dat.mm.msg = 'Hours count LS nibble'
        qf.hh.lsb = l
        if (RtQfDirection == 0) ses.tc.hh = qf.hh.msb | qf.hh.lsb // @TODO wrong hours?
        //console.log('RtTcQuarterFrame hh lsb',Hex([m,l]))
        break

      case 0x70:
        //dat.hh.msg = 'Hours count MS nibble and SMPTE Type'
        qf.hh.msb = l
        //console.log('RtTcQuarterFrame hh msb',Hex([m,l]))
        if (RtQfDirection == 1) ses.tc.hh = qf.hh.msb | qf.hh.lsb // @TODO wrong hours?

        // rm
        qf.tc.hh = qf.hh.msb | qf.hh.lsb
        qf.tc.mm = qf.mm.msb | qf.mm.lsb
        qf.tc.ss = qf.ss.msb | qf.ss.lsb
        qf.tc.fr = qf.fr.msb | qf.fr.lsb
        // in backward direction it counts from F7 to F0

        console.log('---RtTcQuarterFrame', Hex([m, l]), qf.tc)
        break
    }
  }
  function RtTcFull(a) {
    // Full Message - (10 bytes)
    /*
    F0 7F <device ID> 01 <sub-ID 2> hr mn sc fr F7
    F0 7F         Real Time Universal System Exclusive Header
    <device ID>   7F (message intended for entire system)
    01            <sub-ID 1>, 'MIDI Time Code'
    <sub-ID 2>    01, Full Time Code Message
    hr            hours and type: 0 yy zzzzz

                    yy type:
                      00 = 24 Frames/Second
                      01 = 25 Frames/Second
                      10 = 30 Frames/Second (drop frame)
                      11 = 30 Frames/Second (non-drop frame)

                    zzzzz Hours (00->23)

    mn            Minutes (00->59)
    sc            Seconds (00->59)
    fr            Frames (00->29)
    F7            EOX
  */
    //const t = { hh:0, yy:0, zz:0, mn:0 , sc:0, fr:0 }
    const fps = [24, 25, 30, 30]
    ses.tc.fps = fps[(a[5] && 0b01100000) >> 5] // TODO
    ;(ses.tc.hh = a[5] & 0b00011111), // @TODO
      (ses.tc.mm = a[6])
    ses.tc.ss = a[7]
    ses.tc.fr = a[8]

    //console.log('RtTcFull', ses.tc, Hex(a))
  }

  function RtTcLocate(a) {
    // MIDI Cueing Set-Up Messages (13 bytes plus any additional information):
    /*
      RtTcLocate F0 7F 00 06 44 06 01 00 00 08 02 00 F7 (13) [240, 127, 0, 6, 68, 6, 1, 0, 0, 8, 2, 0, 247]
    */
    ses.tc.hh = a[7]
    ses.tc.mm = a[8]
    ses.tc.ss = a[9]
    ses.tc.fr = a[10]

    console.log('RtTcLocate', ses.tc, Hex(a), a)
  }

  function NRtCue(a) {
    // MIDI Cueing Set-Up Messages (13 bytes plus any additional information):
    /*
      F0 7E <device ID> 04 <sub-ID 2> hr mn sc fr ff sl sm <add. info.> F7
    */
    let txt = ''
    switch (
      a[4] // <sub-ID 2>
    ) {
      case 0x00:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Special'
        break
      case 0x01:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Punch In points'
        break
      case 0x02:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Punch Out points'
        break
      case 0x03:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Delete Punch In point'
        break
      case 0x04:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Delete Punch Out point'
        break

      case 0x05:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Event Start points'
        break
      case 0x06:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Event Stop points'
        break
      case 0x07:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Event Start points with additional info.'
        break
      case 0x08:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Event Stop points with additional info.'
        break
      case 0x09:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Delete Event Start point'
        break

      case 0x0a:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Delete Event Stop point'
        break
      case 0x0b:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Cue points'
        break
      case 0x0c:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Cue points with additional info.'
        break
      case 0x0d:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Delete Cue point'
        break
      case 0x0e:
        txt = sxs.id[0x7e][a[2]][a[3]] // 'Event Name in additional info.'
        break
    }
    console.log('NRtCue', txt, Hex(a))
  }

  function RtUserBits(a) {
    /*

  */
    console.log('RtUserBits', Hex(a))
  }

  /**
   * Convert array to hex string
   * @param {Array} a
   * @returns {String}
   */
  function Hex(a) {
    return a.map((d) => d.toString(16).padStart(2, '0')).join(' ').toUpperCase()
  }
  function HexArr(a) {
    return a.map((d) => d.toString(16).toUpperCase().padStart(2, '0'))
  }
  /**
   * Split hex string and return data array
   * @param {Array} a Array with
   * @returns 
   */
  function Bin(s) {
    //const dat = s.split(' ')
    //console.log('midi.Bin', dat, s.split(' ').map((k) => { return parseInt(k, 16) }) )
    //return s.map((k) => { return parseInt(k, 16) })
    return s.split(' ').map((k) => { return parseInt(k, 16) })
  }
  /**
   * @TODO normalize object keys
   * @TODO move to Decode()?
   * @param {Array} a 
   * 
   * F1H is used to tell a sequencer or other device how fast it should be playing (in "absolute" time, not
    in terms of tempo), and is based on the standard frame rate of a video signal. It is used in systems where
    a sequencer is following a device that is generating SMPTE timecode, like multitrack audio or video
    players. F1 messages are sent at a constant rate of approximately 120 times per second in North and
    Central America and Japan, or 100 times per second in most of the rest of the world.
    
    F2H is used in non-SMPTE based systems to tell a MIDI sequencer where to start when it receives a
    Continue command (below). The data bytes specify the number of 16th notes from the beginning of the
    sequence. There are 16,384 possible values for the data bytes, so Song Position Pointer can be used to
    specify a location in a sequence up to about 1000 measures long.
    
    F3H is used with sequencers that have multiple song memories to specify which song they are
    supposed to play when they receive the next Start command (below).
    
    F6H is Tune Request. This was originally intended for use by digitally controlled analog
    synthesizers. It tells them to execute whatever self-tuning routines are built into them. Although there are
    still plenty of these types of synths around, very few respond to this command, mostly because they are
    stable enough that they don’t need to be retuned after they are turned on.

    F8H is Timing Clock, or just “Clock”. Timing Clocks are used to lock two or more MIDI devices to the
    same tempo. They are generated 24 times per quarter note, and they change with the tempo (unlike
    MIDI Time Code Quarter Frame messages, which can change with tape speed, but not tempo). A
    “master” device sends out Timing Clocks, and a “slave” follows them.
    Timing Clock is also called “MIDI Sync”, although that term (which doesn’t appear in the MIDI
    Specification) is more properly used in a broader sense, encompassing the Start, Stop, and Continue
    commands, and sometimes Song Position Pointer as well. Therefore, when we speak of a device like a
    sequencer or drum machine being “MIDI Sync compatible,” it means it responds to all of these
    commands.
    
    FAH is Start message. This tells a device to go to the beginning of its song and start playing, at the
    tempo determined by the incoming Timing Clock messages that follow immediately.
    FBH is Continue message, which is similar to Start, except that the receiving device will play from
    its current location, not (necessarily) from the beginning. It often follows a Song Position Pointer
    message.
    
    FCH is Stop message. This tells a device to stop playing, and wait for a Start or Continue (not just a
    Timing Clock).
   */
  function Decode(a) {
    //a[0] = 0x92 //first byte eg: 0x92
    const ch = a[0] & 0x0f // = 0x02 midi chan.
    const cat = a[0] & 0xF0 // = 0x90 msg type or SysEx 0xF0
    const dat = {}

    let ccMsb65h = 0x00 // cache, To set or change the value of a Registered Parameter
    //console.log('---CAT', cat, ' ch:', ch, 'dat:', a)

    switch (cat) {
      case 0xF0: // 0xFn
        switch (a[0]) {
          case 0xF0:
            dat.txt = 'SysEx' // F0
            dat.cat = 'sx'
            switch (a[1]) {
              case 0x7F:
                dat.txt = 'Real Time' // F0 7F
                dat.sub = 'rt'
                dat.deviceId = a[2] // F0 F7 <device ID>; 7F = (message intended for entire system)
                //dat.final = sxs.id[a[1]][a[3]][a[4]].txt
                switch (a[3]) {
                  /*
                    case 0x00: // F0 7F <device ID> 01 <sub-ID 2> hr mn sc fr F7
                      dat.txt = '<sub-ID 1>, MIDI Time Code'
                      dat.msg = '<sub-ID 2> 01, Full Time Code Message'
                      break
*/
                  case 0x01: // MIDI Time Code Full Message - (10 bytes)
                    dat.msg = 'MIDI Time Code' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.dev = a[2]
                    dat.type = sxs.id[a[1]][a[3]].txt
                    RtTcFull(a)
                    break
                  case 0x02: // User Bits Message - (15 bytes)
                    dat.msg = 'User Bits Message'
                    dat.val = a.slice[(5, 13)] //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    RtUserBits(a)
                    break
                  case 0x03:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x04: // MIDI Cueing Set-Up Messages (13 bytes plus any additional information):
                    dat.msg = 'MIDI Cueing Set-Up' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x05:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x06: // LOCATE
                    TP.State(a) //move to rx/tx
                    dat.final = sxs.id[a[1]][a[3]][a[4]].txt
                    if (a[4] == 0x44) dat.val = [a[5], a[6], a[7], a[8], a[9], a[10], a[11]] // dat.final == 'locate'
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x07:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x08:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x09:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x0a:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x0b:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break
                  case 0x0c:
                    dat.val = '@TODO' //dat.val = sxs.id[a[1]][a[3]][a[4]].txt
                    dat.type = sxs.id[a[1]][a[3]].txt
                    break

                  case 0x44: // ?? <sub-ID 1> = 'MIDI Time Code', F0 7F <device ID> 01 <sub-ID 2> hr mn sc fr F7
                    dat.subId1 = 'MIDI Time Code'

                    //dat.msg = 'ID 2> 01, Full Time Code Message'
                    dat.subId2 = a[3]
                    RtTcLocate(a)
                    /*
                     */
                    break
                  default: // dat.log = 'F0 7F catch all @TODO'
                    //switch(a[2]) {
                    //default:
                    dat.log = 'F0 7F catch all @TODO'
                  //}
                  /*
                    case 0x7f:
                      dat.type = sxs.id[a[1]][a[2]].txt
                      //dat.aa = 0x7f
                      switch(a[3]) {
                        case 0x01: //dat.bb = a[3]
                        dat.action = sxs.id[a[1]][a[2]][a[3]].txt
                          //dat.v = [a[4], a[5], a[6], a[7]]
                          //dat.val = {a:a[4], b:a[5], c:a[6], d:a[7]}
                          //a[4], a[5], ??
                          //dat.val = [a[6], a[7]].join(' ')
                          dat.val = {unknown: a[4], hour:a[5] ,min:a[6], sec:a[7]}
                          break
                      }
                      break
                    //default:
                    */
                }

                //dat.sub = sxs.id[a[1]]['txt']

                /*
                  a[2] in sxs.id[a[1]] ? dat.type = sxs.id[a[1]][a[2]].txt : dat.type = '-rt unknown type yet @TODO - (if errror, check the val exist)'
                  a[3] in sxs.id[a[1]][a[2]] ? dat.action = sxs.id[a[1]][a[2]][a[3]].txt : dat.action = '-rt unknown action yet @TODO - (if errror, check the val exist)'
                  a[4] in sxs.id[a[1]][a[2]][a[3]] ? dat.final = sxs.id[a[1]][a[2]][a[3]][a[4]].txt : dat.final = '-rt unknown final yet @TODO - (if errror, check the val exist)'
                  */

                //dat.final = sxs.id[a[1]][a[2]][a[3]][a[4]].txt

                //dat.val = a.slice[4, a.lenght - 1] // 3 ,a.lenght - 1

                //dat.subType = ses.sxs.sx[0x7f][a[2]][a[3]]
                break

              case 0x7E: // 'Non-Real Time' // F0 7E
                dat.txt = 'Non-Real Time' // F0 7E
                dat.cat = 'nrt'
                dat.dev = a[2]
                //dat.sub = sxs.id[0x7e][a[2]]
                switch (a[3]) {

                  case 0x04: // MIDI Time Code
                    dat.msg = sxs.id[0x7e][a[2]][a[3]]
                    NRtCue(a) // // F0 7E <device ID> 04 <sub-ID 2> hr mn sc fr ff sl sm <add. info.> F7
                    break
                  
                  case 0x06: // General Information (sub-ID#1)
                    dat.msg = 'General Information'
                    if(a[4] == 1) dat.final = 'Identity Request' // Identity Request (sub-ID#2)
                    /*
                      F0 7E <device ID> 06 02 mm ff ff dd dd ss ss ss ss F7
                      F0 7E <device ID> Universal System Exclusive Non-real time header
                      06 General Information (sub-ID#1)
                      02 Identity Reply (sub-ID#2)
                      mm Manufacturers System Exclusive id code
                      ff ff Device family code (14 bits, LSB first)
                      dd dd Device family member code (14 bits, LSB first)
                      ss ss ss ss Software revision level. Format device specific
                      F7 EOX
                    */
                    if(a[4] == 2) {
                      dat.final = 'Identity Reply' // Identity Request (sub-ID#2)
                      dat.mm = a[5]
                      dat.ff = [a[6], a[7]]
                      dat.dd = [a[8], a[9]]
                      dat.ss = a.slice(10, a.length-1)
                      //dat.ss = [a[10],a[11],a[12],a[13]]

                    }
                    break

                  case 0x09:
                    switch (a[4]) {
                      case 0x01:
                        dat.msg = 'Turn General MIDI System On'
                        break
                      case 0x02:
                        dat.msg = 'Turn General MIDI System Off'
                        break
                      default:
                        dat.log = 'F0 7E DEV 09 catch all @TODO'
                    }
                    break
                  default:
                    dat.log = 'F0 7E DEV catch all @TODO'
                }

                break

              // Experimental or “Non-Commercial”, for internal use by research and educational institutions,
              // and not in any products that are allowedto be released to the public.
              case 0x7D:
                dat.txt = 'Experimental'
                switch (a[2]) {
                  default:
                    dat.log = 'F0 7D catch all @Experimental'
                }

                //dat.sub = ''
                //dat.val = a[]
                break

              /**
               * msg by vendor
               */
              case 0x00: // Manufac 0x00
                if(a[4] == 0x7F) dat.inf = 'Firmata EXTENDED_ID ??'
                dat.sub = 'dev'
                dat.man = vendor[a[1]][a[2]][a[3]] // assuming next 2 bytes @TODO read manuel
                //dat.inst = a[4]
                dat.dat = a.slice(4, a.length - 1)
                // is manufac. in device list
                //if(a[1] in dev) { // is id in instruments
                //  dat.inst = a[2] in dev[a[1]] ? dev[a[2]] : 'unknown'
                //} else {
                //  dat.inst = 'unknown'
                //}
                // dig deeper into man?
                //console.log('---> RX Sysex Manufac. TODO', DecToHexString(a), DecToHexStringArray(a), a)
                //console.log('Sysex Manufac.:', man[a[1]][a[2]][a[3]])
                break
              /* didnt work, moved to default
              case (a[1] > 0x00 && a[1] < 0x60): // Manufac 0x01-0x5F
                dat.sub = 'dev'
                dat.man = vendor[a[1]]
                dat.dat = a.slice(2, a.length - 1)
                // is manufac. in device list

                //if(a[1] in dev) { // is id in instruments
                //  dat.inst = a[2] in dev[a[1]] ? dev[a[2]] : 'unknown'
                //} else {
                //dat.inst = 'unknown'
                //}

                // if a[1] == 0x00, next man id? @TODO
                // instrument[a[3]]
                // else
                // instrument[a[2]]
                // cmd cat
                //console.log('---> RX Sysex Manufac.', man[a[1]], DecToHexString(a), DecToHexStringArray(a), a)
                //console.log('Sysex Manufac.:', man[a[1]])
                break*/
              case 0x69:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'analog mapping query'
                break

              case 0x6A:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'analog mapping response'
                break

              case 0x6B:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'CAPABILITY_QUERY'
                break

              case 0x6C:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'CAPABILITY_RESPONSE'
                break

              case 0x6D:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'pin state query'
                break

              case 0x6E:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'pin state response'
                break

              case 0x6F:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'extended analog message'
                break

              case 0x71:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'STRING_DATA'
                break

              case 0x79:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'queryFirmware'
                break
                
              case 0x7A:
                dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt
                dat.sub = 'firmata'
                dat.final = 'SAMPLING_INTERVAL'
                break

              default:
                if(a[1] > 0x00 && a[1] < 0x60) {
                  dat.sub = 'dev'
                  dat.man = vendor[a[1]]
                  dat.dat = a.slice(2, a.length - 1)
                //} else if() {

                } else {
                  dat.txt = '0x60-7C [Reserved for Other Uses]' // 7D - ; 7E - nrt; 7F - rt

                  //dat.log = '_F0 man catch all @TODO'
                  //dat.sub = 'todo'
                  //dat.val = 'val unknown'
                  //console.log('-- Sysex a[1] mfg:', a[1])
                  //console.log('_Sysex TODO sub 0x60-7 [Reserved for Other Uses]', a) // , DecToHexString(a), DecToHexStringArray(a),
                }
                break //??
            }
            break
          case 0xF1:
            dat.val = a[1]
            dat.cat = 'MIDI Time Code 1/4 Frame'
            RtTcQuarterFrame(a[1])
            break
          case 0xF2:
            dat.msb = a[1]
            dat.lsb = a[2]
            dat.cat = 'Song Position Pointer'
            dat.msg = '2byte (MSB, LSB)'
            break
          case 0xF3:
            dat.val = a[1]
            dat.cat = 'Song Select'
            dat.msg = '1byte (song number)'
            break
          case 0xF4:
            dat.msg = 'Undefined (Reserved)'
            break
          case 0xF5:
            dat.msg = 'Undefined (Reserved)'
            break
          case 0xF6:
            dat.msg = 'Tune Request'
            break
          //case 0xF7: //End of Exclusive
          /*
              F8H is Timing Clock, or just “Clock”. Timing Clocks are used to lock two or more MIDI devices to the
              same tempo. They are generated 24 times per quarter note, and they change with the tempo (unlike
              MIDI Time Code Quarter Frame messages, which can change with tape speed, but not tempo). A
              “master” device sends out Timing Clocks, and a “slave” follows them.
              Timing Clock is also called “MIDI Sync”, although that term (which doesn’t appear in the MIDI
              Specification) is more properly used in a broader sense, encompassing the Start, Stop, and Continue
              commands, and sometimes Song Position Pointer as well. Therefore, when we speak of a device like a
              sequencer or drum machine being “MIDI Sync compatible,” it means it responds to all of these
              commands.
            */
          case 0xF8:
            dat.msg = 'Timing Clock'
            break
          case 0xF9:
            dat.msg = 'Undefined (Reserved)'
            break
          // FAH is Start message. This tells a device to go to the beginning of its song and start playing, at the
          // tempo determined by the incoming Timing Clock messages that follow immediately.
          case 0xFA:
            dat.msg = 'Start'
            break
          // FBH is Continue message, which is similar to Start, except that the receiving device will play from
          // its current location, not (necessarily) from the beginning. It often follows a Song Position Pointer message.
          case 0xFB:
            dat.msg = 'Continue'
            break
          // FCH is Stop message. This tells a device to stop playing, and wait for a Start or Continue (not just a Timing Clock).
          case 0xFC:
            dat.msg = 'Stop'
            break
          case 0xFE:
            dat.msg = 'Active Sensing'
            break
          case 0xFF:
            dat.msg = 'System Reset'
            break
          //case 0xf:
          //  dat.msg = ''
          //  break
        }
        break
      case 0x90: // note on
        dat.cat = 'note'
        dat.sub = 'on'
        dat.ch = ch
        //dat.note = note[a[1]].n
        //dat.octv = note[a[1]].o
        dat.note = note[a[1]]
        dat.vel = a[2] // velocity
        break
      case 0x80: // note off
        dat.cat = 'note'
        dat.sub = 'off'
        dat.ch = ch
        dat.note = note[a[1]]
        dat.vel = a[2] // velocity
        break

      /**
         * AnH is Polyphonic Key Pressure, sometimes known as polyphonic (or just “poly”) aftertouch. It is
            similar to Channel Pressure, except that each note has an independent sensor, and can be addressed
            individually. It allows, for example, vibrato or a timbral change to be applied to one note in a chord but
            not the others. A Polyphonic Key Pressure command has two data bytes: the note number, and the
            amount of pressure.
            Polyphonic Key Pressure is somewhat rare in the world of MIDI, because it is highly data intensive,
            and the amount of data it uses can clog a conventional MIDI stream and cause delays or errors. But it is
            becoming more common as MIDI systems that use faster transports have become more available.
        */
      case 0xA0:
        dat.cat = 'Polyphonic Key Pressure' //get it of maps
        //dat.sub = ''
        dat.ch = ch
        dat.val = a[2]
        break
      case 0xB0: // cc
        dat.cat = 'cc'
        dat.sub = ccs[a[1]].txt
        dat.ch = ch
        dat.key = a[1]
        dat.val = a[2]
        /*
          switch(a[1]) {
            case 0x65:
              dat.sub = 'Registered Parameter MSB'
              ccMsb65h = a[2]
              break
            case 0x64:
              dat.sub = 'Registered Parameter LSB'
              ccMsb65h = a[2]
              switch(a[2]) {
                case 0x00:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
                
                case 0x01:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
                
                case 0x02:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
                
                case 0x03:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
  
                case 0x04:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
  
                case 0x05:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
                case 0x06:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
  
                case 0x00:
                  dat.msg = 'Pitch Bend Sensitivity'
                  break
              }
          }
  */
        break
      case 0xC0: // vox
        dat.cat = 'pc'
        dat.sub = 'vox'
        dat.ch = ch
        dat.val = a[1]
        break
      /**
         * DnH is Channel Pressure, sometimes known as “mono aftertouch,”
            or just “aftertouch.” Channel Pressure is a measure of how hard a key is
            pressed after it is struck and is at the bottom of its travel. Special
            sensors below the keyboard are used to detect this pressure, which is
            often used to add vibrato to a voice, or to change its timbre or pitch. It
            works on all notes on a Channel—if pressure is applied to one key, all
            the notes are affected. Channel Pressure has one Data byte: the pressure value.
         */
      case 0xD0:
        dat.cat = 'Channel Aftertouch'
        dat.sub = 'Channel Pressure'
        dat.ch = ch
        dat.val = a[2]
        break
      /*
        EnH is Pitch Bend. Pitch Bend is usually generated by a wheel, lever, or joystick, with a spring-
          loaded center return.
          Pitch Bend works both upwards and downwards, but there is no way to send negative numbers over
          MIDI. Therefore, a data value of 00 is considered maximum downward bend, and “no bend” is a value in
          the middle of the range (40H, or 64 decimal), while 7FH is maximum upward bend. Obviously, no
          command at all is also interpreted as “no bend.” The Reset All Controllers messages described above
          also resets Pitch Bend to the middle of its range (but not to zero).
          The amount that a sound’s pitch will change in response to a Pitch Bend command is determined by
          the receiving synthesizer: there will usually be a parameter in that device called “pitch bend range” or
          some equivalent, which will determine the pitch change, in half-steps, that will be effected when a Pitch
          Bend command of maximum (7FH) or minimum (00) value is received. If two MIDI synthesizers are
          expected to bend notes in concert, it is imperative that the pitch bend range in each of the synths is set
          to respond in the same manner. The pitchbend range parameter can often be set by a Control Change
          command.
          Pitch Bend takes two Data bytes, the first one being the Least Significant Byte (LSB) and the second
          being the Most Significant Byte (MSB). As with 14-bit controller pairs described earlier, this means that
          the number of possible Pitch Bend values is 16,384. It was set up this way in the Spec so that even at
          the highest pitch bend ranges, smooth-sounding pitch sweeps could still be accomplished.
          Practically speaking, however, as with 14-bit Controllers, the LSB is almost never used, and it is
          normally set either to zero, or to some arbitrary constant, or to the same value as the MSB. The MSB
          handles the entire range: 00 is maximum downward bend, 7FH is maximum upward bend, and 40H is no
          bend.
          Even though there aren't really any negative numbers, some sequencers and other devices display
          Pitch Bend messages as positive and negative numbers, with a range of -64 to +64 (or -8192 to +8192 if
          they take the LSB into account).
          Normally when you send a Pitch Bend command, all of the notes sounding on a Channel will be
          affected equally. However, some devices are smart enough to apply incoming pitch bend not to all notes,
          but just to notes being held down on the keyboard, and not notes being held with a sustain pedal.
          Therefore, if you play a chord and “latch” it with a sustain pedal, and then play a key and hold it down
          while you send a pitch bend command, the chord will not bend, but the single note you’re holding will.
          Since this can be used to simulate the bending of a single string within a guitar chord, it is sometimes
          called “Guitar mode”.
        */
      case 0xE0:
        dat.cat = 'Pitch Bend'
        dat.ch = ch
        dat.msb = a[1]
        dat.lsb = a[2]
        break
      default:
        /*
            Running Status Messages
            Normally, a MIDI message consists of a Command or Status byte and the appropriate Data bytes,
            which are then followed by the next message’s Command byte and so on. However, the MIDI
            Specification allows for a special condition in which a single Command byte can be followed by a long
            string of Data bytes.
            Imagine you are playing a key, and while you hold it down, you vary the Pressure to create vibrato.
            You start with no pressure, increase it to maximum, and then slowly release it. This action could produce
            a total of 254 different Channel Pressure messages—127 up and 127 down. Since the Command byte is
            always the same, and only the Data byte changes, if it were possible to send just the changing Data
            bytes, it would reduce the amount of data by 50 percent. As we have seen, the bandwidth of a MIDI
            cable is finite; so reducing the flow of bits can help to avoid butting up against those limits.
            "Running Status" allows you to do exactly this. It can be used with any of the messages described so
            far, whether they take one Data byte or two. Running Status is a “condition” of the MIDI data stream. It is
            invoked if a Command byte is received followed by a number of Data bytes that is higher than the normal
            number of Data bytes associated with the Command byte. The extra Data bytes are assumed to be
            associated with the last Command byte received, and are processed just as if the Command byte had
            been repeated. It is for this reason that a MIDI Note On with velocity 00 is considered a "note off": when
            Running Status is active, a note that is on can be turned off with just a note number and velocity 00 (2
            bytes) instead of a full Note Off command (3 bytes).
          */
        dat.cat = 'unknown'
        dat.sub = 'todo' //a[1]
        dat.val = 'unknown'
        //dat.val = a[2]
        //if(ch != 0 && cat != 0)
        console.log('TODO sub', ch.toString(16).padStart(2, 0), cat.toString(16).padStart(2, 0)) //, DecToHexStringArray[ch, cat]
    }

    return dat
  }
})
