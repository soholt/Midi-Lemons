<script setup>
import { ref } from 'vue'
import WebSerial from '../../../components/sub/WebSerial.vue'

import { useMidiStore } from '../../../stores/midi'
const midi = useMidiStore()

//midi.ses.View({target:{name:'io'}})
const info = ref({fw:{},cap:{}})
function ToBytes(a) {
  let ii = 0
  const bytes = []
  for(let i=0; i < a.length; i=i+2) {
    //bytes[ii] = [a[i], a[i+1]]
    bytes[ii] = String.fromCharCode((a[i] | a[i+1]))
    ii++
  }
  return bytes.join('')
}
/*
EXTENDED_ID                 0x00 // A value of 0x00 indicates the next 2 bytes define the extended ID
RESERVED               0x01-0x0F // IDs 0x01 - 0x0F are reserved for user defined commands
ANALOG_MAPPING_QUERY        0x69 // ask for mapping of analog to pin numbers
ANALOG_MAPPING_RESPONSE     0x6A // reply with mapping info
CAPABILITY_QUERY            0x6B // ask for supported modes and resolution of all pins
v CAPABILITY_RESPONSE         0x6C // reply with supported modes and resolution
PIN_STATE_QUERY             0x6D // ask for a pin's current mode and state (different than value)
PIN_STATE_RESPONSE          0x6E // reply with a pin's current mode and state (different than value)
EXTENDED_ANALOG             0x6F // analog write (PWM, Servo, etc) to any pin
STRING_DATA                 0x71 // a string message with 14-bits per char
v REPORT_FIRMWARE             0x79 // report name and version of the firmware
SAMPLING_INTERVAL           0x7A // the interval at which analog input is sampled (default = 19ms)
SYSEX_NON_REALTIME          0x7E // MIDI Reserved for non-realtime messages
SYSEX_REALTIME              0X7F // MIDI Reserved for realtime messages
*/

let aa = []
let rxTmp = []
function Rx(a) {

  console.log()//, midi.Decode(a)
  if(a[0] == 0xF0) rxTmp = a  // 0xF0 Begin rxTmp array
  if(rxTmp[rxTmp.length-1] != 0xF7) { // xAny Add to rxTmp array
    rxTmp.push(...a)
    console.log('---> Firmata Rx part, length:', a.length)
  }
  if(rxTmp[0] == 0xF0 && rxTmp[rxTmp.length-1] == 0xF7) { // 0xF7 Process data
    let ii = 0
    let raw = []
    const tmp = []
    console.log('---> Firmata Rx length:', rxTmp.length, a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()), midi.Decode(rxTmp))
    switch(rxTmp[1]) {
    case 0x79:
      info.value.fw = {maj:rxTmp[2],min:rxTmp[3],txt:ToBytes(rxTmp.slice(4,-1))}
      break
    case 0x6C:
      raw = rxTmp.slice(2,-1)
      info.value.cap = {}//raw: raw, 
      for(let i=0; i < raw.length; i++) {
        
        if(raw[i] == 0x7F) {
          info.value.cap[ii] = tmp
          //console.log('tmp:',tmp)
          //aa[ii] = tmp
          tmp.length = 0
          ii++
        } else {
          tmp.push(raw[i])
        }
        //console.log('tmp:',tmp)
        //info.value.cap.dat[ii] = tmp
      }
      break
    }
    //rxTmp = []
  }
  //console.log('aa:',aa)
}
/**
 * Receive MIDI msgs and forward it to sorting
 * @param {Array} a 
 */
midi.RxSerialQueueAdd('firmata', Rx)

function Uart(e) {
  console.log('midi.webSerial.port',midi.webSerial.port, e.target.value)
  switch(e.target.value) {
    case 'firmware':
      midi.webSerial.Send([0xF0, 0x79, 0xF7])
      console.log('Send', midi.Decode([0xF0, 0x79, 0xF7]))
      break
    case 'capability':
      midi.webSerial.Send([0xF0, 0x6B, 0xF7])
      console.log('Send', midi.Decode([0xF0, 0x6B, 0xF7]))
      break
  }
}

//const info = ref({firmware:{},capabilities:{}})
//if(value[1] == 0x79) info.firmware = {major:value[2], minor:value[3]}
//if(value[1] == 0x6D) info.capabilities = {major:value[2], minor:value[3]}

//v-if="midi.webSerial.port > -1"
</script>

<template>
  <h3>
    Firmata -- <a href="https://github.com/firmata/arduino" target="_blank">https://github.com/firmata/arduino</a> -- <a href="https://github.com/firmata/protocol/blob/master/protocol.md" target="_blank">https://github.com/firmata/protocol/blob/master/protocol.md</a>
  </h3>@TODO port {{ midi.webSerial.port }}
  <WebSerial />
  <div v-if="midi.webSerial.supported">
    <button value="firmware" @click="Uart" class="orange btn">Firmware</button>
    <button value="capability" @click="Uart" class="orange btn">Capability</button>
    <hr />
    <pre>{{ info }}</pre>
    @TODO
  </div>
</template>
