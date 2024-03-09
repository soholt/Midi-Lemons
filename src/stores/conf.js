import { ref } from 'vue'
import { defineStore } from 'pinia'

// Does it need to be a store
export const useConfStore = defineStore('conf', () => {
  const debug = ref(true)
  //const onLoad = '/midi/lemons/cc' // or /midi/lemons/cc or other view to load on start as default
  const midi = ref({
    ch: 0, // default ch
    chs: 16, // # ch to display
    nav: true, // Display NavBar if hidden, @TODO go to https://localhost:5173/midi/config to enable it back
    vendor: '',//'lemons', // default vendor onLoad or '' @TODO
    device: '',//'cc', // default view (device/instrument) from vendor from above or an empty string for vendor default view. onLoad or '' @TODO
    webSerial: true,
    webMidi: true,
    webMidiUart: true,
    srv: {
      ws: { midi: true, port:3000, ssl: true }, // Midi over Web Socket
      uart: { midi: true, port:'/dev/tty0', baud: 115200 }, // Midi over Web Socket -> Uart Serial
    },

    // Length of TX & RX PER MIDI CH per type, timestamped, x chs:16 from above !!!
    history: {
      rx: {
        cc: 10,
        pb: 8,
        pc: 10,
        sx: 20,
        note: 2000, // so 2000 x (timestamp + 3 byte note array x 2 for note on/off) x number of MIDI CHs
        log: { // To Log Or Not To Log? Mirror above
          cc: true,
          pb: true,
          pc: true,
          sx: true,
          note: true
        }
      },
      tx: {
        cc: 8,
        pb: 8,
        pc: 8,
        sx: 8,
        note: 8, // @TODO 0 - unlimited?
        log: {
          cc: true,
          pb: true,
          pc: true,
          sx: true,
          note: true
        }
      }
    },
    notes: ['C','C#','D','Eb','E','F','F#','G','G#','A','Bb','B'],
    kbd: {
      notes: { z:0x3C, s:0x3D, x:0x3E, d:0X3F, c:0x40, v:0x41, g:0x42, b:0x43, h:0X44, n:0x45, j:0x46, m:0x47, ',':0x48, l:0X49, '.':0x4A, ';':0X4B, '/':0x4C, },
      tp: { ' ':'toggle', 'Home':'home', 'End':'end', 'ArrowLeft': 'rev', 'ArrowRight':'ff', 'ArrowUp':'ArrowUp', 'ArrowDown':'ArrowDown', 'Escape':'Escape', 'Tab':'Tab' } // transport
    },
  })

  return { debug, midi }//, onLoad
})
