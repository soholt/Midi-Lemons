import { ref, toRaw } from 'vue' // , getCurrentInstance reactive,  isProxy,computed, 
import { defineStore } from 'pinia'

import ccs from './maps/ccs'
import sxs from './maps/sxs'
//import note from '@midi/stores/maps/note'


//console.log('new routes', routes)
/*
//let responseHeadders = {} // to detect pico w x- or localhost
async function getJson(conf) {
  const response = await fetch(conf)
  const dat = await response.json()
  //responseHeadders = response.headers
  //console.log(conf, dat);
  //console.log('response.headers',response.headers)
  return dat
}
//const _conf = await getJson('/assets/lemons.json')
*/

import { useConfStore } from './conf'
//const conf = useConfStore()

//import { useMidiStore } from '@midi/stores/midi'
//const midi = useMidiStore()

//console.log('conf', conf)

//import fn from './fn.js'
/*
async function MidiLemons() {
  // Files in the public directory are served at the root path.
  // Instead of /public/Midi-Lemons.json, use /Midi-Lemons.json. (x3)
  const response = await fetch("/Midi-Lemons.json");
  const midiLemons = await response.json();
  console.log('MidiLemons load .json from /public', midiLemons);
  return midiLemons
}
const Lemons = MidiLemons()
*/
//const Lemons = fn.LoadJson('/Midi-Lemons.json')
//console.log('ses.Lemons', Lemons)

export const useSesStore = defineStore('ses', () => {
  
  const conf = useConfStore()

  /**
   * Global session storage for vendor
   */
  const vend = ref({})

  /**
   * Nav defaults and .. used for other stuff
   */
  const vendor = ref(conf.midi.vendor)
  const device = ref(conf.midi.device)
  const view = ref('') //rm
  //console.log('ses', { vendor: vendor.value, device: device.value })



  /**
   * @TODO history by midi ch
   */
  //const history = ref({ rx: { cc: [], sx: [], note: [] }, tx: { cc: {}, sx: {}, note: {} } })

  /*
  function Hist(rxtx, a, decoded) {
    //console.log('--Hist', a)
    const ch = a[0] & 0x0f

    console.log('==Hist ch:', ch, decoded.cat)

    switch(decoded.cat) {
      case 'cc':
        ses.prop[ch][rxtx].cc.push(a)
        //Hist(a)
        break
      case 'pc':
        ses.prop[ch][rxtx].pc.push(a)
        //Hist(a)
        break
      case 'sx':
        ses.prop[ch][rxtx].sx.push(a)
        //Hist(a)
        break
      case 'note':
        ses.prop[ch][rxtx].note.push(a)
        //Hist(a)
        break
    }
  }
  */
  function Hist(a, dir) {
    // @TODO check and set conf store
    if(prop.value.view.hist.true) { // to log or not to log
    let cat = undefined
    if (a[0] == 0xf0) {
      // SysEx
      cat = 'sx'
    } else {
      switch (a[0] & 0xf0) {
        case 0xb0: // CC
          cat = 'cc'
          break
        case 0xc0: // PC
          cat = 'pc'
          break
        case 0x80: // NOTE
        case 0x90: // add atrer touch mod-wh etc or name it perf?
          cat = 'note'
      }
    }
    /*
    const entries = new Map([
      ['foo', 'bar'],
      ['baz', 42],
    ]);

    const obj = Object.fromEntries(entries);

    console.log(obj);
    // Expected output: Object { foo: "bar", baz: 42 }
    */

    //console.log('Hist', dir , cat, ' hex:',(a[0] & 0xF0).toString(16).padStart(2, '0').toUpperCase(), prop.value[ch.value][dir][cat])
    if (cat !== undefined) {
      //const d = Date.now()
      //const v = {}
      //v[d] = a
      prop.value[ch.value][dir][cat].push(a)
      prop.value[ch.value][dir + 'Ts'][cat].push(Date.now())
      //prop.value[ch.value][dir][cat].push(v)
      // Object.entries(o).length - how fast is it? should use arrays of objects?
      // Object.keys(o).length
      //const keys = Object.keys(prop.value[ch.value][dir][cat])
      if (conf.midi.history[dir][cat] < prop.value[ch.value][dir][cat].length) {
        prop.value[ch.value][dir][cat].shift()
        prop.value[ch.value][dir + 'Ts'][cat].shift()
      }
      //console.log('history push, length:', keys.length)
    }
  }
  }

  //if (conf.debug === false) console.log = function () {}

  //const conf = ref(_conf)

  /**
   * Currently selected midi ch
   */
  const ch = ref(conf.midi.ch)
  //function Ch() {
  //  console.log('set midi ch', ch)
  //}
  //const show = ref({ midi: false, keyboard: false }) // @TODO here or in the app?

  /**
   * Session params Object to store session values
   * midi_ch:{
   *  cc: {
   *    id:val
   *  }
   * }
   */
  const prop = ref({
    //reactive({
    /*
    0: { // midi ch
      cc: {}, // prop
      // To add your session vars globaly do: vendor.instrumnet.param.{ keys:vals, }
      // Do not add here, manage it from vendor/intrument logic
      // yamaha: { dx7: { ini:{}, voice:[], show:{ ini: true, voice: true } } }
    } // etc for ch 1..15
    */
    midi: {
      // global midi msg hostory
      rx: [], // last tx msg
      tx: [], // last rx msg
      io: 'webMidi',
    },
    //inst:{},//
    // moved one level up:vend: {}, // Vendor global session midi.ses.prop.vend.yamaha.dx7[key] = value
    view: {
      // show view = true:false
      io: { show: false },
      bank: { show: false, txt: 'Bank' },
      //vox: { show: true, txt: 'Voice' },
      midi: { show: false, txt: 'Midi' },
      mix: { show: false, txt: 'MiX' },
      ccs: { show: false, txt: 'CC' },
      kbd: { show: false, txt: 'Keyboard' },
      tp: { show: false, txt: 'Transport' },
      note: new Array(0x80).fill(0), // for note animation on RX, could be per ch if needed @TODO move to midi
      conf: { show: false },
      hist: {
        true: true, // enable
        show: false,
        txt: 'History',
        decode: false,
        ts: false,//show timestamp
        rx: { at: true, cc: true, pb: true, pc: true, sx: true, note: true },
        tx: { at: true, cc: true, pb: true, pc: true, sx: true, note: true }
      },
    }
  })

  /**
   * Reset session var to default
   * Generates session vars for keeping the current state of the params
   * @param {Array} a of default vals, length 128?
   * @returns
   */
  function Reset() {
    const sxTotal = Object.keys(sxs).length

    // Session var for each midi ch

    // Add to session n ch with defaults
    for (let ch = 0; ch < conf.midi.chs; ch++) {
      //dat.cc[0]=i
      prop.value[ch] = {
        //at: 0, // after touch
        pb: {m:0,l:0}, // Pitch Bend for animation on RX
        pc: 0, // program chage
        cc: new Array(0x80), // control change
        //ccShow: new Uint8Array(0x80),
        mute: new Array(0x80).fill(0), //new Uint8Array(conf.midi.chs),
        sx: { val: new Uint8Array(sxTotal), show: new Uint8Array(sxTotal) },
        //_sx: { vol: {}, pan: {} },
        //midi: {
        dev: 0x7F, // device id; 0x7F broadcast to all
        type: 'gm1', // inst:0x00,//0x01=gm. 0x02=gs etc??
        gm1: { cats: false, drums: false, on: false},

        //rx: [], // last tx msg, needed per ch?
        //tx: [], // last rx msg, needed per ch?
        //},
        //bank: { msb: 0, lsb: 0, show: true },
        //vox: { msb: 0, show: true },
        //hist: {
        // DATA
        rx: { at: [], cc: [], pb: [], pc: [], sx: [], note: [] }, // history
        tx: { at: [], cc: [], pb: [], pc: [], sx: [], note: [] }, // history
        rxTs: { at: [], cc: [], pb: [], pc: [], sx: [], note: [] }, // history timestamps
        txTs: { at: [], cc: [], pb: [], pc: [], sx: [], note: [] }, // history timestamps
        //}
        vend: {} // Vendor session per midi ch midi.ses.prop[midi.ses.ch].vend.yamaha.dx7[key] = val
      }

      /*
      Set CC Defaults
    */
      for (let key = 0; key < 0x80; key++) {
        //prop.value[i].cc.push(ccs[i].def)
        prop.value[ch].cc[key] = ccs[key].def //dat.cc.val[i] = ccs[i].def

        //**
        // * @TODO optimize? attach theme? 0 - do not show, 1 - default theme, 2-255 custom themes
        // *
        //      prop.value[i].ccShow[i] = ccs[i].show === true ? 1 : 0//dat.cc.show[i] = ccs[i].show === true ? 1 : 0
      }
      /**
   * @TODO split into const and var msgs
    Set SX Defaults
  */
      //for (let i = 0; i < sxTotal; i++) {
      //      prop.value[i].sx.val[i] = ccs[i].def
      //      prop.value[i].sx.show[i] = ccs[i].show === true ? 1 : 0
      //}
    }
    //console.log('--prop', toRaw(prop.value))
  }

  /**
   * Create vendor per MIDI Ch, so devices can save session data
   * @param {Object} o session data
   * @param {String} s vendor name( or device id or if you want to use diff or shorten name )
   * @TODO ifs, to not owerwrite session data and other devices
   */ 
  function CreateCh(o = {}, _ch = ch.value, s = '') {
    let vend = vendor.value
    if(s != '') vend = s
    prop.value[_ch].vend[vend] = o //JSON.parse(JSON.stringify(o)) // @TODO shalow copy Object.create(o)
    //console.log('CreateCh for vendor:', vend)
  }
  function CreateChs(o = {}, s = '') {
    let vend = vendor.value
    if(s != '') vend = s
    for (let ch = 0; ch < conf.midi.chs; ch++) {
      prop.value[ch].vend[vend] = JSON.parse(JSON.stringify(o)) // @TODO shalow copy Object.create(o)
    }
    //console.log('CreateCh for:', vendor)
  }
  /**
   * Global ses by vendor, for storing non data vars, like views etc
   * @param {String} s vendor name
   * @param {Object} o session data
   * @TODO ifs, to not owerwrite session data and other devices
   *//*
  function CreateGlobal(o = {}) {
    if(vendor.value != '' && device.value != '') {

      vend.value[vendor.value][device.value] = o
      console.log('CreateGlobal', vend.value[vendor.value][device.value] = o)
      return new Proxy(vend.value[vendor.value][device.value], {})
    } else {
      console.error('Cant create global session, missing vendor and/or device')
      return {}
    }
  }*/
  /**
   * Show Vendor views /vendor/views
   * Views must be defined in ses before calling it
   * @param {Event} e
   */
  function Show(e) {
    const id = e.target.id
    const name = e.target.name
    if (vendor.value in prop.value.vendor && name in prop.value[vendor.value]) {
      prop.value[vendor.value][name].show = !prop.value[vendor.value][name].show
    }
    console.log('Show', id, name, prop.value[vendor.value][name].show)
  }


  /**
   * Lemons Views
   * @param {Event} e
   */
  function View(e, level = undefined) {
    const id = e.target.id
    const name = e.target.name
    if (level == undefined) {
      prop.value.view[name].show = !prop.value.view[name].show
      //console.log('View', name, prop.value.view[name].show)
    } else {
      prop.value.view[level][id][name] = !prop.value.view[level][id][name]
      console.log('View+', level, id, name, prop.value.view[level][id][name])
    }
  }

  // Time Code
  const tc = ref({
    fps: 0,
    hh: 0,
    mm: 0,
    ss: 0,
    fr: 0, // frame
    ff: 0, // frame fraction
  })
  const tp = { // Transport state
    state: 'stop',// should be in tp=transport
    rec: false
  }

  // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
  function SaveFile(filename, dataObjToWrite) {
    const blob = new Blob([JSON.stringify(dataObjToWrite, null, 0)], { type: "text/json" });//, undefined, 2
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
  }

  /**
   * Save Session
   */
  function Save() {
    SaveFile("Midi-Lemons.json", {conf:conf.midi, prop:prop.value, vendor:vendor.value, device: device.value, vend:vend.value} );
    console.log('Save', toRaw({conf:conf.midi, prop:prop.value, vendor:vendor.value, device: device.value, vend:vend.value}) )
  }
  //function Log() {
  //  console.log('Save', {conf:conf.midi, prop:prop.value, vendor:vendor.value, device: device.value, vend:vend.value} )
  //}

  /**
   * Load Session
   * @TODO
   */
  function Load(type, file, dat) {
    // Sort uploads
    switch(type) {
      case 'ses':
        //
        break
    }
    console.log('Load', {type:type, file:file, dat:dat})
    return {type:type, file:file, dat:dat}
  }

  /**
   * File upload
   * @param {Event} e 
   */
  function Upload(e) {
    // 0: File { lastModified: 1701798754000, name: "performance.ini", size: 5089, type: "text/plain", webkitRelativePath: "" }
    const [file] = e.target.files
    const reader = new FileReader()
    //reader.addEventListener( 'load', () => { Load(e.target.name, file, reader.result) }, false )
    reader.addEventListener( 'load', () => { return {name:e.target.name, file:file, dat:reader.result} }, false )
    //if (file) {
      //reader.readAsArrayBuffer(file)
      //reader.readAsDataURL(file)
    //  reader.readAsText(file)
    //}
  }

  const port = ref(0) // port id serial/midi port id


  // Begin with running reset to defaults
  //console.log('prop.value', prop.value)
  //if ( prop.value === undefined ) { Reset() }//
  if (0 in prop.value === false) {
    Reset()
  }

  return {
    ch,
    port,
    conf, //midi, // stores
    prop,
    ccs,
    sxs, // might aswell export it or do it in midi for shorter typing?
    //show,
    history,
    vendor, device,
    //vendors, devices,
    view,
    vend, // vendor global session
    CreateCh, CreateChs, //CreateGlobal,
    //instrumentId, vendorId,
    //routes,
    //Ch,
    Hist,
    Reset,
    View,
    Show,
    Save, Load, Upload,
    tc, tp,

  }
})
