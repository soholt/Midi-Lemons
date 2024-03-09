<script setup>
/**
 * CCs component for midi, sits after bank/voice, before keyboard
 */
import { ref } from 'vue'
import CC from '../CC.vue'
//import { useMidiStore } from '../stores/midi'
//const midi = useMidiStore()
const extra = ref(false)
</script>

<template>
  <table>
      <tr>
        <td><CC :cc="0x40" /></td>
        <td><CC :cc="0x41" /></td>
        <td><CC :cc="0x42" /></td>
        <td><CC :cc="0x43" /></td>
        <td><CC :cc="0x44" /></td>
        <td><CC :cc="0x45" /></td>
        <td><CC :cc="0x7A" /></td>
      </tr>
    </table>
    <table>
      <tr>
        <td><CC :cc="0x7C" /></td>
        <td><CC :cc="0x7D" /></td>
        <td><CC :cc="0x7E" /></td>
        <td><CC :cc="0x7F" /></td>
        <td><CC :cc="0x7B" /></td>
        <td><CC :cc="0x78" /></td>
        <td><CC :cc="0x79" /></td>
        <td><button class="btn lemon" :class="extra ? 'on' : ''" @click="extra = !extra">+</button></td>
      </tr>
    </table>

    <div v-if="extra">
        CCs 7/14 bit sw
    </div>

</template>