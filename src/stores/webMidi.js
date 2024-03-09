/**
 * © 2024 Gintaras Valatka
 * 
 *  Store webmidi.js
 * 
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

//import fn from './fn' // Various functions

export const useWebMidiStore = defineStore('webMidi', () => {

  const open = ref(false) // is midi open
  //let midi = null // global MIDIAccess object
  const midi = ref({}) //ref([])
  const _in = ref('') //ref([])
  const out = ref('') //ref([])
  const ins = ref([]) //ref([])
  const outs = ref([]) //ref([])

  let Rx = function() {}
  function OnRx(f) {
    Rx = f
  }

  function RX_WEB(dat) {
    let arr = []
    for (let i = 0; i < dat.data.byteLength; i++) {
      arr[i] = dat.data[i].toString(16).padStart(2, 0)
    }
    Rx(Array.from(dat.data))
    //console.log('--> RX_WEB', dat.target.name, arr, fn.Decode(Array.from(dat.data)))//, dat.data
    
  }

  function onMIDISuccess() {
    console.log('onMIDISuccess  MIDI ready!')
    
    // INS
    let i = 0
    let def = {} // default 0 input
    midi.value.inputs.forEach((input) => {
      
      //console.log('input', input); // inherited property from MIDIPort
      //if(input.name == 'MIDI Gadget:MIDI Gadget MIDI 1 32:0') {
      if(input.name.indexOf('Gadget') != -1) {
        //_in.value = input.id
        input.onmidimessage = RX_WEB
        
      }
      
      // if gadget not found, set to default 0
      if (i == 0) def = input
      if(_in.value === '' && ins.value[0] && ins.value[0].id) {
        _in.value = def.id
        def.onmidimessage = RX_WEB
      }
      
      i++
    });
/*
    i = 0
    midi.value.outputs.forEach((output) => {
      
      if(out.value === '' && outs.value[0] && outs.value[0].id) {
        out.value = output.id
      }
      
    });
*/
    // OUTS
    if(outs.value[0] && outs.value[0].id) {
      out.value = outs.value[0].id
    }
    //console.log('input/out', _in.value, out.value);
    /*
    // if no midi out selected, set it to the first aviailable if any available
    
    // connect ins
    if(ins.value[0] && ins.value[0].id) {
      _in.value = ins.value[0].id
    }
    */
    open.value = !open.value
  }

  function Close() {
    open.value = !open.value
    console.log('close')
  }
  function onMIDIFailure(msg) {
    console.error(`onMIDIFailure Failed to get MIDI access - ${msg}`)
  }
/*
  // Handling MIDI Input
  function onMIDIMessage(event) {
    let str = `--> RX_WEB MIDI @timestamp ${event.timeStamp} [${event.data.length} bytes]: `
    for (const character of event.data) {
      str += `0x${character.toString(16)} `
    }
    console.log(str)
  }

  function startLoggingMIDIInput(midiAccess) {
    midiAccess.inputs.forEach((entry) => {
      entry.onmidimessage = onMIDIMessage
    })
  }
*/
  function LsIo() { // listInputsAndOutputs

    //console.log('midiAccess',midiAccess)
    let i = 0
    //const ins = []
    for (const entry of midi.value.inputs) {
      //console.log('in entry',entry)
      const input = entry[1]
      ins.value[i] = { name:input.name, id:input.id, manufacturer:input.manufacturer, version:input.version }
      i++
      //console.log(`Input port [type:'${input.type}']` + ` id:'${input.id}'` + ` manufacturer:'${input.manufacturer}'` + ` name:'${input.name}'` + ` version:'${input.version}'`)
    }

    i = 0
    //const outs = []
    for (const entry of midi.value.outputs) {
      const output = entry[1]
      outs.value[i] = { name:output.name, id:output.id, manufacturer:output.manufacturer, version:output.version }
      i++
      //console.log(`Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`)
    }
    //console.log('webmidi ins', ins.value)
    //console.log('webmidi outs', outs.value)
    //return { ins:ins, outs:outs }
    
  }
  //function permChange(e) { console.log('permChange', e) }
  /**
   * @TODO ERRORS to GUI
   */
  function Open() {
    
    navigator.permissions.query({ name: 'midi', sysex: true }).then((result) => { //, onchange: permChange
      if (result.state === 'granted') {
        // Access granted.
      } else if (result.state === 'prompt') {
        // Using API will prompt for permission
      }
      // Permission was denied by user prompt or permission policy
      //console.log('webmidi open result', result)
    })

    navigator.requestMIDIAccess({ name: 'midi', sysex: true }).then((access) => {

      // Get lists of available MIDI controllers
      //const inputs = access.inputs.values();
      //const outputs = access.outputs.values();

      access.onstatechange = (event) => {
        console.log('webmidi onstatechange', event.port.name, event.port.state, event.port.id); // , event.port.manufacturer
      }
      /*
      Array.from(access.inputs).forEach((input) => {
        input[1].onmidimessage = (msg) => {
          console.log(msg);
        };
      });
      */
      midi.value = access // // doenst work in onMIDISuccess, Uncaught TypeError: midi.value is undefined
      //startLoggingMIDIInput(access)
      //listInputsAndOutputs(access)
      //console.log('access',access);
      LsIo()

    }).then(onMIDISuccess, onMIDIFailure)

    //console.log('midi', midi)
  }

  function Send(msg) {
    if(open.value == false) Open()
    //console.log('<-- TX_WEB', msg)
    //const noteOnMessage = [0x90, 60, 0x7f]; // note on, middle C, full velocity
    if(out.value != '') {
      const output = midi.value['outputs'].get(out.value);
      if(output != undefined) {
        output.send(msg); // sends the message.
        //console.log('<-- TX_WEB', msg, output)
      } else {
        console.warn('no web midi port')
      }
      //console.log('output', output)
    } else { console.warn('select web midi out port') }
  }
  


  return { open, Open, Close, Send, LsIo, OnRx, Rx, _in, out, ins, outs }
})
