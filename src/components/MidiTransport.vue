<script setup>
import { useMidiStore } from '../stores/midi'
const midi = useMidiStore()
/*
const props = defineProps({
  ch: {
    type: Number,
    required: false,
    default: 0 // ch = (ch - 1), always 1 less
  },
  dev: {
    type: Number,
    required: false,
    default: 0x7F
  },
})
*/
</script>

<template>
  <div>
    TODO 000|00|0000 | 
    TC <input class="btn lime" type="text" id="hh" name="hh" required minlength="1" maxlength="2" size="1" :value="String(midi.ses.tc.hh).padStart(2,'0')"/>:
    <input class="btn lime" type="text" id="mm" name="mm" required minlength="1" maxlength="2" size="1" :value="String(midi.ses.tc.mm).padStart(2,'0')"/>:
    <input class="btn lime" type="text" id="ss" name="ss" required minlength="1" maxlength="2" size="1" :value="String(midi.ses.tc.ss).padStart(2,'0')"/>
    FR<input class="btn sky" type="text" id="fr" name="fr" required minlength="1" maxlength="2" size="1" :value="String(midi.ses.tc.fr).padStart(2,'0')"/>
    FF<input class="btn" type="text" id="ff" name="ff" required minlength="1" maxlength="2" size="1" :value="String(midi.ses.tc.ff).padStart(2,'0')"/>
    FPS<input class="btn" type="text" id="fps" name="fps" required minlength="1" maxlength="2" size="1" :value="midi.ses.tc.fps"/>

    <button @click="midi.TP.e" :id="0x7F" :name="0x06" :value="0x05" class="btn orange" :class="midi.ses.tp.state == 'rew' ? 'on':''">&lt;&lt;</button>
    <button @click="midi.TP.e" :id="0x7F" :name="0x06" :value="0x01" class="btn lemon" :class="midi.ses.tp.state == 'stop' ? 'on':''">Stop</button>
    <!--<button @click="midi.Tp" :id="0x7F" :name="0x06" :value="0x09" class="btn lemon" :class="midi.ses.tp.state == 'pause' ? 'on':''">Pause</button>-->
    <button @click="midi.TP.e" :id="0x7F" :name="0x06" :value="0x02" class="btn lime" :class="midi.ses.tp.state == 'play' ? 'on':''">Play</button>
    <button @click="midi.TP.e" :id="0x7F" :name="0x06" :value="0x04" class="btn orange" :class="midi.ses.tp.state == 'ff' ? 'on':''">&gt;&gt;</button>
    <button @click="midi.TP.e" :id="0x7F" :name="0x06" :value="0x06" class="btn red" :class="midi.ses.tp.rec ? 'on':''">Rec</button>
  </div>
</template>
