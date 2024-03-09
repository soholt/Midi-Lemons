<script setup>
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()
//<button @click="midi.webSerial.List" class="btn sky">List</button>
//ObjectKeys(midi.webSerial.ports).length
/*

  <select v-if="true"> 0" v-model="midi.webSerial.ports" class="sky">
    <option v-for="(v, k) in midi.webSerial.ports" :key="k" :value="v.id">Serial Ports ---&gt;{{ k }} : {{ v }}</option>
  </select>{{ Object.keys(midi.webSerial.ports).length }}*/

//import vend from '../../stores/maps/usbVend.js'
//console.log('usb vendors',vend[0x1a86])
/*
let vendors = {}
async function Vendors() {
  const response = await fetch('/vendors/usbVendors.json');
  vendors = await response.json();
}
Vendors()
//await Vendors()
//console.log('vendors', vendors);


console.log('midi.Usb.Id(0x0042)', midi.Usb.Id(0x0042))

const usb = {
  id: {
    0x2341: { t: 'Arduino', txt: 'Arduino SA', 0x0042: { t: 'Mega 2560 R3', txt: 'Arduino SA Mega 2560 R3 (CDC ACM)' }, 0x003d: { t: 'Due Programming Port' }, 0x003e: { t: 'Due' } },
    0x1a86: {
      t: 'QinHeng Electronics', //1a86:7523 QinHeng Electronics CH340 serial converter
      0x7523: { t: 'CH340 serial converter' }
    }
  }
}
*/
//{{ v.vend in vendors ? vendors[v.vend] : v.vend }} :: {{ v.vend in usb.id && v.prod in usb.id[v.vend] ? usb.id[v.vend][v.prod].t : v.prod }}
</script>

<template>
  <div v-if="midi.webSerial.supported">
    <select name="baud" v-model="midi.webSerial.baud">
      <option v-for="(v, k) in midi.webSerial.rates" :key="k" :value="v">{{ v }}</option>
    </select>
    <button @click="midi.webSerial.Open" class="btn sky">Connect</button>
    <span v-if="midi.webSerial.port > -1">
      v.vend in usb.id ? usb.id[v.vend].t : v.vend
      <select v-model="midi.webSerial.port" class="sky">
        <option value="-1">Select Port</option>
        <option v-for="(v, k) in midi.webSerial.ports" :key="k" :value="k">{{ midi.Usb.Id(v.vend) }} :: {{ midi.Usb.Dev(v.vend, v.prod) }}</option>
      </select>
      <button @click="midi.webSerial.Close" class="lemon btn">Disconnect</button>
    </span>
    <br />
    midi.webSerial.ports: {{ midi.webSerial.ports }}
  </div>
  <div class="red" v-else>This browser does not support Web Serial, use chromium based browser,(enable experimental features?)</div>
</template>
<script>
/*
The latest way to use grep is with the -E option. This option treats the pattern you used as an extended regular expression.
grep -E 'pattern1|pattern2' fileName_or_filePath

gin@pi5:~/Downloads/arduino-1.8.19/hardware/arduino/avr $ grep 'pid\|vid' boards.txt 
yun.vid.0=0x2341
yun.pid.0=0x0041
yun.vid.1=0x2341
yun.pid.1=0x8041
yun.vid.2=0x2A03
yun.pid.2=0x0041
yun.vid.3=0x2A03
yun.pid.3=0x8041
yun.build.vid=0x2341
yun.build.pid=0x8041
uno.vid.0=0x2341
uno.pid.0=0x0043
uno.vid.1=0x2341
uno.pid.1=0x0001
uno.vid.2=0x2A03
uno.pid.2=0x0043
uno.vid.3=0x2341
uno.pid.3=0x0243
mega.vid.0=0x2341
mega.pid.0=0x0010
mega.vid.1=0x2341
mega.pid.1=0x0042
mega.vid.2=0x2A03
mega.pid.2=0x0010
mega.vid.3=0x2A03
mega.pid.3=0x0042
mega.vid.4=0x2341
mega.pid.4=0x0210
mega.vid.5=0x2341
mega.pid.5=0x0242
megaADK.vid.0=0x2341
megaADK.pid.0=0x003f
megaADK.vid.1=0x2341
megaADK.pid.1=0x0044
megaADK.vid.2=0x2A03
megaADK.pid.2=0x003f
megaADK.vid.3=0x2A03
megaADK.pid.3=0x0044
leonardo.vid.0=0x2341
leonardo.pid.0=0x0036
leonardo.vid.1=0x2341
leonardo.pid.1=0x8036
leonardo.vid.2=0x2A03
leonardo.pid.2=0x0036
leonardo.vid.3=0x2A03
leonardo.pid.3=0x8036
leonardo.build.vid=0x2341
leonardo.build.pid=0x8036
leonardoeth.vid.0=0x2a03
leonardoeth.pid.0=0x0040
leonardoeth.vid.1=0x2a03
leonardoeth.pid.1=0x8040
leonardoeth.build.vid=0x2a03
leonardoeth.build.pid=0x8040
micro.vid.0=0x2341
micro.pid.0=0x0037
micro.vid.1=0x2341
micro.pid.1=0x8037
micro.vid.2=0x2A03
micro.pid.2=0x0037
micro.vid.3=0x2A03
micro.pid.3=0x8037
micro.vid.4=0x2341
micro.pid.4=0x0237
micro.vid.5=0x2341
micro.pid.5=0x8237
micro.build.vid=0x2341
micro.build.pid=0x8037
esplora.vid.0=0x2341
esplora.pid.0=0x003C
esplora.vid.1=0x2341
esplora.pid.1=0x803C
esplora.vid.2=0x2A03
esplora.pid.2=0x003C
esplora.vid.3=0x2A03
esplora.pid.3=0x803C
esplora.build.vid=0x2341
esplora.build.pid=0x803c
LilyPadUSB.vid.0=0x1B4F
LilyPadUSB.pid.0=0x9207
LilyPadUSB.vid.1=0x1B4F
LilyPadUSB.pid.1=0x9208
LilyPadUSB.build.vid=0x1B4F
LilyPadUSB.build.pid=0x9208
robotControl.vid.0=0x2341
robotControl.pid.0=0x0038
robotControl.vid.1=0x2341
robotControl.pid.1=0x8038
robotControl.vid.2=0x2A03
robotControl.pid.2=0x0038
robotControl.vid.3=0x2A03
robotControl.pid.3=0x8038
robotControl.build.vid=0x2341
robotControl.build.pid=0x8038
robotMotor.vid.0=0x2341
robotMotor.pid.0=0x0039
robotMotor.vid.1=0x2341
robotMotor.pid.1=0x8039
robotMotor.vid.2=0x2A03
robotMotor.pid.2=0x0039
robotMotor.vid.3=0x2A03
robotMotor.pid.3=0x8039
robotMotor.build.vid=0x2341
robotMotor.build.pid=0x8039
gemma.vid.0=0x2341
gemma.pid.0=0x0c9f
circuitplay32u4cat.build.vid=0x239A
circuitplay32u4cat.build.pid=0x8011
circuitplay32u4cat.vid.0=0x239A
circuitplay32u4cat.pid.0=0x8011
yunmini.vid.0=0x2a03
yunmini.pid.0=0x0050
yunmini.vid.1=0x2a03
yunmini.pid.1=0x8050
yunmini.build.vid=0x2a03
yunmini.build.pid=0x8050
chiwawa.vid.0=0x2a03
chiwawa.pid.0=0x0056
chiwawa.vid.1=0x2a03
chiwawa.pid.1=0x8056
chiwawa.build.vid=0x2a03
chiwawa.build.pid=0x8056
one.vid.0=0x2a03
one.pid.0=0x0001
one.vid.1=0x2a03
one.pid.1=0x8001
one.build.vid=0x2a03
one.build.pid=0x8001
unowifi.vid.0=0x2A03
unowifi.pid.0=0x0057

*/
</script>
