<script setup>
import { onMounted, onUnmounted } from 'vue'

import { useMidiStore } from '../../stores/midi'
const midi = useMidiStore()
//console.log('KbdMap', midi.ses.conf.midi.kbd)

function KeyDown(e) {
  console.log('KeyDown', `'${e.key}'`)
}

//kbd: {
//  notes: { z:0x3C, s:0x3D, x:0x3E, d:0X3F, c:0x40, v:0x41, g:0x42, b:0x43, h:0X44, n:0x45, j:0x46, m:0x47, ',':0x48, l:0X49, '.':0x4A, ';':0X4B, '/':0x4C, },
//  tp: { ' ':'toggle', 'Home':'home', 'End':'end', 'ArrowLeft': 'rev', 'ArrowRight':'ff', 'ArrowUp':'ArrowUp', 'ArrowDown':'ArrowDown', 'Escape':'Escape', 'Tab':'Tab' } // transport
//},
function KeyUp(e) {
  switch (e.keyCode) {
    case 32: // space
      // e.preventDefault() @TODO prevent scrol
      midi.TP.Toggle()
      break
    case 37: //'ArrowLeft'
      //midi.TP.Stop()
      break
    case 39: //'ArrowRight'
      //midi.TP.Play()
      break

    // map keys 1-8 to midi chs
    case 192: // Backquote, before 1
      midi.Ch(15)
      break
    case 48: // 0
      //midi.Ch(15)
      break
    case 49: // 1
      midi.Ch(0)
      break
    case 50: // 2
      midi.Ch(1)
      break
    case 51: // 3
      midi.Ch(2)
      break
    case 52: // 4
      midi.Ch(3)
      break
    case 53: // 5
      midi.Ch(4)
      break
    case 54: // 6
      midi.Ch(5)
      break
    case 55: // 7
      midi.Ch(6)
      break
    case 56: // 8
      midi.Ch(7)
      break
    case 57: // 9
      //midi.Ch(8)
      break
  }
  //console.log('KeyUp', {code:e.code, keyCode:e.keyCode, key:`'${e.key}'`, e:e}, e)
}

onMounted(() => {
  //document.addEventListener('keydown', KeyDown)
  document.addEventListener('keyup', KeyUp)
})
onUnmounted(() => {
  //document.removeEventListener('keydown', KeyDown)
  document.removeEventListener('keyup', KeyUp)
})
</script>
<template><span></span></template>
