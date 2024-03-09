<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()

const matrix = [1,2,3,4,5]

// Typing shortener of global session
const ses = new Proxy(midi.ses.vend[midi.ses.vendor][midi.ses.device], {})

/**
 * Fill session with 0s
 */
for(let i=0; i < matrix.length; i++) {
  ses[i] = []
  for(let j=0; j < matrix.length; j++) {
    ses[i][j] = [0,0,0,0]
  }
}

console.log('---> ses:', ses, ' vend:', midi.ses.vend)

//let lastTxMsg = []
let lastTxType = 0x01 // to allow dump to load data into session
const dumpError = ref(false)


//const Rx = async function
function Rx(a) {
  
  const cmd = a[5]
  const dat = a.slice(6, -1)

  if(lastTxType == 0x01) { // load current state and set the session
    if(a.length == 102) {
      const dat = a.slice(1, -1)
      const nodes = []
      let key = 0
      for(let n=0; n < 100; n=n+4) {
        nodes[key] = [dat[n], dat[n+1], dat[n+2], dat[n+3]]
        key++
      }
      key = 0
      for(let i=0; i < matrix.length; i++) {
        for(let j=0; j < matrix.length; j++) {
          ses[i][j] = nodes[key]
          key++
        }
      }
      dumpError.value = false
    } else { dumpError.value = true }
    console.log('Decode Dump 0x01')
  }

  if(a.length == 3 && a[1] == 0x60) console.log('ACK')
  if(a.length == 3 && a[1] == 0x61) console.log('NACK')

  //console.log('Decode a.length:', a.length, ' cmd:', cmd, ' dat:', dat)
  switch(cmd) {

    case 0x03: // 0x03 	    Get the matrix element at i,j
      //if(lastTxType == 0x03) ses[lastTxMsg[6]][lastTxMsg[7]] = a
      console.log('Decode Get the matrix element at i,j', dat, a)//lastTxMsg[6], lastTxMsg[7]
      break

    //case 0x01: //l:100: // Dump the matrix
      
      //break

  }
}

/**
 * F0 44 49 4E 4F <command> [optional_data] F7
 *  Command 	Description 	                  Data
    0x00 	    Identity                        (Not implemented) 	
    0x01 	    Dump the matrix                 None
    0x02 	    Set the matrix 	                100 uint32/7 numbers (see below the format)
    0x03 	    Get the matrix element at i,j 	2 uint8 between 0 and 5 for the input and output
    0x04 	    Set the matrix element at i,j 	3 uint8 between 0 and 5 for the input, output and value as uint32/7
    0x05 	    Save in the EEPROM 	            None
    0x06 	    Load from the EEPROM 	          None
    0x07 	    Reset everything to 0 	        None

    All commands will return either : 0x60 (ACK) or 0x61 (NACK) except for 0x01 and 0x03 that are special.
 * @param {Number} id Command
 * @param {Array} dat Data array
 */
function Tx(id, dat = []) { midi.Tx([0xF0, 0x44, 0x49, 0x4E, 0x4F, id, ...dat, 0xF7]) }

/**
 * @param {Event} e to action
 */
function Sx(e) {
  const dat = []
  switch(e.target.name) {
    case 'id':
      lastTxType = 0x00
      Tx(0x00)
      break
    case 'dump':
      lastTxType = 0x01
      Tx(0x01)
      break
    case 'setMatrix':
      lastTxType = 0x02
      // @TODO dat
      Tx(0x02, dat)
      break
    case 'get':
      lastTxType = 0x03
      Tx(0x03, [parseInt(e.target.id), parseInt(e.target.value)])
      break
    case 'set':
      lastTxType = 0x04
      // @TODO dat
      //Tx(0x04, [parseInt(e.target.id), parseInt(e.target.value)], 1)
      // Dump to update session
      lastTxType = 0x01
      Tx(0x01)
      //ses[e.target.id][e.target.value] = [1,0,0,0]
      break
    case 'save':
      lastTxType = 0x05
      //Tx(0x05) @TODO
      break
    case 'load':
      lastTxType = 0x06
      Tx(0x06)
      // Dump to update session
      lastTxType = 0x01
      Tx(0x01)
      break
    case 'reset':
      lastTxType = 0x07
      Tx(0x07)
      // Dump to update session
      lastTxType = 0x01
      Tx(0x01)
      break
  }
}

onBeforeMount(() => {
  /**
   * To Receive MIDI msgs and to forward it to Rx() function above
   * @param {String} s 
   * @param {Function} f Rx() to receive midi
   */
  midi.RxQueueAdd('dinoctopus', Rx)
  Tx(0x01) // run dump, which loads current state //console.log('*DINoctopus.onBeforeMount')
})

// To Stop receiving and processing midi data when navigating away, comment it out to leave it running if needed
onUnmounted(() => {
  midi.RxQueueRm('dinoctopus') //console.log('*DINoctopus.onUnmounted')
})

</script>

<template>
  <h3>
    DINoctopus -- <a href="https://github.com/bjonnh/dinoctopus" target="_blank">https://github.com/bjonnh/dinoctopus</a> --
  </h3>

  <button name="id" @click="Sx" class="lime btn">Identity</button>
  <button name="dump" @click="Sx" class="lime btn">Dump the matrix</button>

  <button name="load" @click="Sx" class="lemon btn">Load from the EEPROM</button>

  <button name="save" @click="Sx" class="red btn">Save in the EEPROM</button>
  <button name="reset" @click="Sx" class="red btn">Reset everything to 0</button>
  <br />
  <button v-if="dumpError" name="load" @click="Sx" class="red btn">Can not read DINotopus! Connect it and click me to try again...</button>
  
  <table>
    <tr>
      <th>*</th><th v-for="(v,k) in matrix" :key="k">j {{ v }}</th>
    </tr>
    <tr v-for="(ii,i) in matrix" :key="i">
      <th>i {{ ii }}</th><td v-for="(jj,j) in matrix" :key="j"><button name="set" @click="Sx" :id="i" :value="j" class="orange btn" :class="ses[i][j][0] == 1 ? 'on':''">{{ ii }} :: {{ jj }}</button></td>
    </tr>
  </table>
  
  <div>
    Session debug: <div v-for="(v,k) in matrix" :key="k">i:{{ k }} {{ ses[k] }}</div>
    <br />
    Testing: No need for venv on Debian 12 (using Raspberry Pi5) sudo apt install python3-mido python3-rtmidi and run:<br />
    python3 test_sysex.py
  </div>
</template>
