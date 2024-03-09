//import { ref } from 'vue'
//import { defineStore } from 'pccsa'

const _ccs = [
  // CCs
  {
    name: 'Bank Select',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Modulation Wheel or Lever',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Breath Controller',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Foot Controller',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Portamento Time',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Data Entry MSB',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Channel Volume (formerly Main Volume)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Balance',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Pan',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Expression Controller',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Effect Control 1',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Effect Control 2',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 1',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 2',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 3',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 4',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'LSB for Control 0 (Bank Select)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 1 (Modulation Wheel or Lever)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 2 (Breath Controller)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 3 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 4 (Foot Controller)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 5 (Portamento Time)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 6 (Data Entry)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 7 (Channel Volume, formerly Main Volume)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 8 (Balance)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 9 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 10 (Pan)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 11 (Expression Controller)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 12 (Effect control 1)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 13 (Effect control 2)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 14 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 15 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 16 (General Purpose Controller 1)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 17 (General Purpose Controller 2)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 18 (General Purpose Controller 3)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 19 (General Purpose Controller 4)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 20 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 21 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 22 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 23 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 24 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 25 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 26 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 27 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 28 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 29 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 30 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'LSB for Control 31 (Undefined)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Damper Pedal on/off (Sustain)',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 off, ≥64 on', '---'],
    show: true
  },
  {
    name: 'Portamento On/Off',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 off, ≥64 on', '---'],
    show: true
  },
  {
    name: 'Sostenuto On/Off',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 off, ≥64 on', '---'],
    show: true
  },
  {
    name: 'Soft Pedal On/Off',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 off, ≥64 on', '---'],
    show: true
  },
  {
    name: 'Legato Footswitch',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 Normal, ≥64 Legato', '---'],
    show: true
  },
  {
    name: 'Hold 2',
    min: 63,
    max: 64,
    def: 63,
    type: 'checkbox',
    meta: [null, null, null, null, '≤63 off, ≥64 on', '---'],
    show: true
  },
  {
    name: 'Sound Controller 1 (default: Sound Variation)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 2 (default: Timbre/Harmonic Intens.)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 3 (default: Release Time)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 4 (default: Attack Time)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 5 (default: Brightness)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 6 (default: Decay Time - see MMA RP-021)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 8 (default: Vibrato Depth - see MMA RP-021)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 9 (default: Vibrato Delay - see MMA RP-021)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Sound Controller 10 (default undefined - see MMA RP-021)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 5',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 6',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 7',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'General Purpose Controller 8',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Portamento Control',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'High Resolution Velocity Prefix',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Effects 1 Depth',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '| (default: Reverb Send Level - see MMA RP-023) (formerly External Effects Depth)', '0-127', '---'],
    show: true
  },
  {
    name: 'Effects 2 Depth',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '(formerly Tremolo Depth)', '0-127', '---'],
    show: true
  },
  {
    name: 'Effects 3 Depth',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '| (default: Chorus Send Level - see MMA RP-023) (formerly Chorus Depth)', '0-127', '---'],
    show: true
  },
  {
    name: 'Effects 4 Depth (formerly Celeste [Detune] Depth)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', '---'],
    show: true
  },
  {
    name: 'Effects 5 Depth (formerly Phaser Depth)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', '---'],
    show: true
  },
  {
    name: 'Data Increment (Data Entry +1) (see MMA RP-018)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, 'N/A', '---'],
    show: true
  },
  {
    name: 'Data Decrement (Data Entry -1) (see MMA RP-018)',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, 'N/A', '---'],
    show: true
  },
  {
    name: 'Non-Registered Parameter Number (NRPN) - LSB',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Non-Registered Parameter Number (NRPN) - MSB',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Registered Parameter Number (RPN) - LSB*',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'LSB'],
    show: true
  },
  {
    name: 'Registered Parameter Number (RPN) - MSB*',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0-127', 'MSB'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '---', '---'],
    show: true
  },
  {
    name: 'Undefined',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [
      null,
      null,
      null,
      null,
      '---',
      '---',
      '| Note:',
      "Controller numbers 120-127 are reserved for Channel Mode Messages, which rather than controlling sound parameters, affect the channel's operating mode. (See also Table 1.)"
    ],
    show: true
  },
  {
    name: '[Channel Mode Message] All Sound Off',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] Reset All Controllers (See MMA RP-015)',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] Local Control On/Off',
    min: 0,
    max: 127,
    def: 0,
    type: 'range',
    meta: [null, null, null, null, '0 off, 127 on', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] All Notes Off',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] Omni Mode Off (+ all notes off)',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] Omni Mode On (+ all notes off)',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  },
  {
    name: '[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '| Note: This equals the number of channels, or zero if the number of channels equals the number of voices in the receiver.'],
    show: true
  },
  {
    name: '[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)',
    min: 0,
    max: 1,
    def: 0,
    type: 'button',
    meta: [null, null, null, null, '0', '---'],
    show: true
  }
]

/**
 * @TODO implement Table 3a: Registered Parameter Numbers and other params
 * @TODO convert _cc to ccs json so no parsing needed on load
 */

// raw from www

const _cc = [
  '0	00000000	00	Bank Select	0-127	MSB',
  '1	00000001	01	Modulation Wheel or Lever	0-127	MSB',
  '2	00000010	02	Breath Controller	0-127	MSB',
  '3	00000011	03	Undefined	0-127	MSB',
  '4	00000100	04	Foot Controller	0-127	MSB',
  '5	00000101	05	Portamento Time	0-127	MSB',
  '6	00000110	06	Data Entry MSB	0-127	MSB',
  '7	00000111	07	Channel Volume (formerly Main Volume)	0-127	MSB',
  '8	00001000	08	Balance	0-127	MSB',
  '9	00001001	09	Undefined	0-127	MSB',
  '10	00001010	0A	Pan	0-127	MSB',
  '11	00001011	0B	Expression Controller	0-127	MSB',
  '12	00001100	0C	Effect Control 1	0-127	MSB',
  '13	00001101	0D	Effect Control 2	0-127	MSB',
  '14	00001110	0E	Undefined	0-127	MSB',
  '15	00001111	0F	Undefined	0-127	MSB',
  '16	00010000	10	General Purpose Controller 1	0-127	MSB',
  '17	00010001	11	General Purpose Controller 2	0-127	MSB',
  '18	00010010	12	General Purpose Controller 3	0-127	MSB',
  '19	00010011	13	General Purpose Controller 4	0-127	MSB',
  '20	00010100	14	Undefined	0-127	MSB',
  '21	00010101	15	Undefined	0-127	MSB',
  '22	00010110	16	Undefined	0-127	MSB',
  '23	00010111	17	Undefined	0-127	MSB',
  '24	00011000	18	Undefined	0-127	MSB',
  '25	00011001	19	Undefined	0-127	MSB',
  '26	00011010	1A	Undefined	0-127	MSB',
  '27	00011011	1B	Undefined	0-127	MSB',
  '28	00011100	1C	Undefined	0-127	MSB',
  '29	00011101	1D	Undefined	0-127	MSB',
  '30	00011110	1E	Undefined	0-127	MSB',
  '31	00011111	1F	Undefined	0-127	MSB',
  '32	00100000	20	LSB for Control 0 (Bank Select)	0-127	LSB',
  '33	00100001	21	LSB for Control 1 (Modulation Wheel or Lever)	0-127	LSB',
  '34	00100010	22	LSB for Control 2 (Breath Controller)	0-127	LSB',
  '35	00100011	23	LSB for Control 3 (Undefined)	0-127	LSB',
  '36	00100100	24	LSB for Control 4 (Foot Controller)	0-127	LSB',
  '37	00100101	25	LSB for Control 5 (Portamento Time)	0-127	LSB',
  '38	00100110	26	LSB for Control 6 (Data Entry)	0-127	LSB',
  '39	00100111	27	LSB for Control 7 (Channel Volume, formerly Main Volume)	0-127	LSB',
  '40	00101000	28	LSB for Control 8 (Balance)	0-127	LSB',
  '41	00101001	29	LSB for Control 9 (Undefined)	0-127	LSB',
  '42	00101010	2A	LSB for Control 10 (Pan)	0-127	LSB',
  '43	00101011	2B	LSB for Control 11 (Expression Controller)	0-127	LSB',
  '44	00101100	2C	LSB for Control 12 (Effect control 1)	0-127	LSB',
  '45	00101101	2D	LSB for Control 13 (Effect control 2)	0-127	LSB',
  '46	00101110	2E	LSB for Control 14 (Undefined)	0-127	LSB',
  '47	00101111	2F	LSB for Control 15 (Undefined)	0-127	LSB',
  '48	00110000	30	LSB for Control 16 (General Purpose Controller 1)	0-127	LSB',
  '49	00110001	31	LSB for Control 17 (General Purpose Controller 2)	0-127	LSB',
  '50	00110010	32	LSB for Control 18 (General Purpose Controller 3)	0-127	LSB',
  '51	00110011	33	LSB for Control 19 (General Purpose Controller 4)	0-127	LSB',
  '52	00110100	34	LSB for Control 20 (Undefined)	0-127	LSB',
  '53	00110101	35	LSB for Control 21 (Undefined)	0-127	LSB',
  '54	00110110	36	LSB for Control 22 (Undefined)	0-127	LSB',
  '55	00110111	37	LSB for Control 23 (Undefined)	0-127	LSB',
  '56	00111000	38	LSB for Control 24 (Undefined)	0-127	LSB',
  '57	00111001	39	LSB for Control 25 (Undefined)	0-127	LSB',
  '58	00111010	3A	LSB for Control 26 (Undefined)	0-127	LSB',
  '59	00111011	3B	LSB for Control 27 (Undefined)	0-127	LSB',
  '60	00111100	3C	LSB for Control 28 (Undefined)	0-127	LSB',
  '61	00111101	3D	LSB for Control 29 (Undefined)	0-127	LSB',
  '62	00111110	3E	LSB for Control 30 (Undefined)	0-127	LSB',
  '63	00111111	3F	LSB for Control 31 (Undefined)	0-127	LSB',
  '64	01000000	40	Damper Pedal on/off (Sustain)	≤63 off, ≥64 on	---',
  '65	01000001	41	Portamento On/Off	≤63 off, ≥64 on	---',
  '66	01000010	42	Sostenuto On/Off	≤63 off, ≥64 on	---',
  '67	01000011	43	Soft Pedal On/Off	≤63 off, ≥64 on	---',
  '68	01000100	44	Legato Footswitch	≤63 Normal, ≥64 Legato	---',
  '69	01000101	45	Hold 2	≤63 off, ≥64 on	---',
  '70	01000110	46	Sound Controller 1 (default: Sound Variation)	0-127	LSB',
  '71	01000111	47	Sound Controller 2 (default: Timbre/Harmonic Intens.)	0-127	LSB',
  '72	01001000	48	Sound Controller 3 (default: Release Time)	0-127	LSB',
  '73	01001001	49	Sound Controller 4 (default: Attack Time)	0-127	LSB',
  '74	01001010	4A	Sound Controller 5 (default: Brightness)	0-127	LSB',
  '75	01001011	4B	Sound Controller 6 (default: Decay Time - see MMA RP-021)	0-127	LSB',
  '76	01001100	4C	Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)	0-127	LSB',
  '77	01001101	4D	Sound Controller 8 (default: Vibrato Depth - see MMA RP-021)	0-127	LSB',
  '78	01001110	4E	Sound Controller 9 (default: Vibrato Delay - see MMA RP-021)	0-127	LSB',
  '79	01001111	4F	Sound Controller 10 (default undefined - see MMA RP-021)	0-127	LSB',
  '80	01010000	50	General Purpose Controller 5	0-127	LSB',
  '81	01010001	51	General Purpose Controller 6	0-127	LSB',
  '82	01010010	52	General Purpose Controller 7	0-127	LSB',
  '83	01010011	53	General Purpose Controller 8	0-127	LSB',
  '84	01010100	54	Portamento Control	0-127	LSB',
  '85	01010101	55	Undefined	---	---',
  '86	01010110	56	Undefined	---	---',
  '87	01010111	57	Undefined	---	---',
  '88	01011000	58	High Resolution Velocity Prefix	0-127	LSB',
  '89	01011001	59	Undefined	---	---',
  '90	01011010	5A	Undefined	---	---',
  '91	01011011	5B	Effects 1 Depth	| (default: Reverb Send Level - see MMA RP-023) (formerly External Effects Depth)	0-127	---',
  '92	01011100	5C	Effects 2 Depth	(formerly Tremolo Depth)	0-127	---',
  '93	01011101	5D	Effects 3 Depth	| (default: Chorus Send Level - see MMA RP-023) (formerly Chorus Depth)	0-127	---',
  '94	01011110	5E	Effects 4 Depth (formerly Celeste [Detune] Depth)	0-127	---',
  '95	01011111	5F	Effects 5 Depth (formerly Phaser Depth)	0-127	---',
  '96	01100000	60	Data Increment (Data Entry +1) (see MMA RP-018)	N/A	---',
  '97	01100001	61	Data Decrement (Data Entry -1) (see MMA RP-018)	N/A	---',
  '98	01100010	62	Non-Registered Parameter Number (NRPN) - LSB	0-127	LSB',
  '99	01100011	63	Non-Registered Parameter Number (NRPN) - MSB	0-127	MSB',
  '100	01100100	64	Registered Parameter Number (RPN) - LSB*	0-127	LSB',
  '101	01100101	65	Registered Parameter Number (RPN) - MSB*	0-127	MSB',
  '102	01100110	66	Undefined	---	---',
  '103	01100111	67	Undefined	---	---',
  '104	01101000	68	Undefined	---	---',
  '105	01101001	69	Undefined	---	---',
  '106	01101010	6A	Undefined	---	---',
  '107	01101011	6B	Undefined	---	---',
  '108	01101100	6C	Undefined	---	---',
  '109	01101101	6D	Undefined	---	---',
  '110	01101110	6E	Undefined	---	---',
  '111	01101111	6F	Undefined	---	---',
  '112	01110000	70	Undefined	---	---',
  '113	01110001	71	Undefined	---	---',
  '114	01110010	72	Undefined	---	---',
  '115	01110011	73	Undefined	---	---',
  '116	01110100	74	Undefined	---	---',
  '117	01110101	75	Undefined	---	---',
  '118	01110110	76	Undefined	---	---',
  "119	01110111	77	Undefined	---	---	| Note:	Controller numbers 120-127 are reserved for Channel Mode Messages, which rather than controlling sound parameters, affect the channel's operating mode. (See also Table 1.)",
  '120	01111000	78	[Channel Mode Message] All Sound Off	0	---',
  '121	01111001	79	[Channel Mode Message] Reset All Controllers (See MMA RP-015)	0	---',
  '122	01111010	7A	[Channel Mode Message] Local Control On/Off	0 off, 127 on	---',
  '123	01111011	7B	[Channel Mode Message] All Notes Off	0	---',
  '124	01111100	7C	[Channel Mode Message] Omni Mode Off (+ all notes off)	0	---',
  '125	01111101	7D	[Channel Mode Message] Omni Mode On (+ all notes off)	0	---',
  '126	01111110	7E	[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)	| Note: This equals the number of channels, or zero if the number of channels equals the number of voices in the receiver.',
  '127	01111111	7F	[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)	0	---'
]
const ccs = []

/**
 * All CCs are created equaly! (from copy paste http://)
 * Some are more equal, so overload below
 */

for (let i = 0; i < 0x80; i++) {
  const d = _cc[i].split('\t')
  //console.log(d)
  const txt = d[3]
  delete d[0]
  delete d[1]
  delete d[2]
  delete d[3]

  //ccs[i] = { cc: __cc, name: name, min:0, max:127, def:0, type:'range', meta: d }
  ccs[i] = { id:i, t: '', txt: txt, ctl: 'cc', res: 7, bit: 0, min: 0, max: 127, def: 0, type: 'range', show: true }//, meta: d
  //val.value[i] = 0
}
//console.log('cc', ccs)

ccs[0x07].def = 100 // Volume
ccs[0x07].txt = 'Channel Volume'

/* RP-036 Details:
The default desired synthesizer response to CC#10 – Pan for AMEI/MMA specifications shall be as follows, and shall override
all previous recommended practices, including, but not limited to, GM1, GM2, DLS1, and DLS2.

[CC#10: Pan]

Default Value: 64 (40H)
[Note] 64 (40H) is Center.
Sets the stereo position for notes of the specified channel. This message causes subsequent notes on that channel to be
positioned anywhere in the stereo field from hard left (value 0,1) to hard right (value 127). It is not necessary to pan a note
that is currently sounding. However, if a currently sounding note is panned, the panning shall be done without audible
artifacts, clicks or “zipper” noise.
[Note] Since MIDI controller values range from 0 to 127, the exact center of the range, 63.5, cannot be represented.
Therefore, the effective range for CC#10 is modified to be 1 to 127, and values 0 and 1 both pan hard left. The
recommended method is to subtract 1 from the value of CC#10, and saturate the result to be non-negative.
The following formulas are recommended:
Left Channel Gain [dB] = 20*log (cos (Pi/2* max(0,CC#10 – 1)/126))
Right Channel Gain [dB] = 20*log (sin (Pi /2* max(0,CC#10 – 1)/126))
The General MIDI 2 Specification (RP-024) is amended by this RP.
*/
ccs[0x0A].def = 64 // Pan

// pair msb/lsb controllers
for(let i=0; i < 32; i++) {
  ccs[i].res = 14       // 0 Bank
  ccs[i].msb = true
  ccs[i].lsb = i + 0x20
  ccs[i + 0x20].res = 14// 0x20 Bank
  ccs[i + 0x20].msb = i // LSB
}


ccs[0x40].def = 63
ccs[0x40].min = 63
ccs[0x40].max = 64
ccs[0x40].type = 'checkbox'
ccs[0x40].t = 'Sustain (Damper Pedal)'

ccs[0x41].def = 63
ccs[0x41].min = 63
ccs[0x41].max = 64
ccs[0x41].type = 'checkbox'
ccs[0x41].t = 'Portamento'

ccs[0x42].def = 63
ccs[0x42].min = 63
ccs[0x42].max = 64
ccs[0x42].type = 'checkbox'
ccs[0x42].t = 'Sostenuto'

ccs[0x43].def = 63
ccs[0x43].min = 63
ccs[0x43].max = 64
ccs[0x43].type = 'checkbox'
ccs[0x43].t = 'Soft Pedal'

ccs[0x44].def = 63
ccs[0x44].min = 63
ccs[0x44].max = 64
ccs[0x44].type = 'checkbox'
ccs[0x44].t = 'Legato Footswitch'

ccs[0x45].def = 63
ccs[0x45].min = 63
ccs[0x45].max = 64
ccs[0x45].type = 'checkbox'
ccs[0x45].t = 'Hold 2'

ccs[0x78].def = 0
ccs[0x78].min = 0
ccs[0x78].max = 0 // no on/off state, just a push button
ccs[0x78].type = 'button'
ccs[0x78].t = 'All Sound Off'

ccs[0x79].def = 0
ccs[0x79].min = 0
ccs[0x79].max = 0 // no on/off state, just a push button
ccs[0x79].type = 'button'
ccs[0x79].t = 'Reset All Controllers'

ccs[0x7a].def = 0
ccs[0x7a].min = 0
ccs[0x7a].max = 127
ccs[0x7a].type = 'checkbox'
ccs[0x7a].t = 'Local Control'

ccs[0x7b].def = 0
ccs[0x7b].min = 0
ccs[0x7b].max = 0 // no on/off state, just a push button
ccs[0x7b].type = 'button'
ccs[0x7b].t = 'All Notes Off'

ccs[0x7c].def = 0
ccs[0x7c].min = 0
ccs[0x7c].max = 0 // no on/off state, just a push button
ccs[0x7c].type = 'button'
ccs[0x7c].t = 'Omni Mode Off'

ccs[0x7d].def = 0
ccs[0x7d].min = 0
ccs[0x7d].max = 0 // no on/off state, just a push button
ccs[0x7d].type = 'button'
ccs[0x7d].t = 'Omni Mode On'

ccs[0x7e].def = 0
ccs[0x7e].min = 0
ccs[0x7e].max = 0 // no on/off state, just a push button
ccs[0x7e].type = 'button'
ccs[0x7e].t = 'Mono Mode On'

ccs[0x7f].def = 0
ccs[0x7f].min = 0
ccs[0x7f].max = 0 // no on/off state, just a push button
ccs[0x7f].type = 'button'
ccs[0x7f].t = 'Poly Mode On'

const registeredParameter = {
  0x00: { txt: 'Registered Parameter',
    0x00: { txt: 'Pitch Bend Sensitivity', msg: 'MSB = +/- semitones, LSB =+/--cents' },
    0x01: { txt: 'Channel Fine Tuning', msg: 'Resolution 100/8192 cents, 00H 00H = -100 cents, 40H 00H = A440, 7FH 7FH = +100 cents' },
    0x02: { txt: 'Channel Coarse Tuning', msg: 'Only MSB used, Resolution 100 cents, 00H = -6400 cents, 40H = A440, 7FH = +6300 cents' },
    0x03: { txt: 'Tuning Program Change', msg: 'Tuning Program Number' },
    0x04: { txt: 'Tuning Bank Select', msg: 'Tuning Bank Number' },
    0x05: { txt: 'Modulation Depth Range', msg: 'For GM2, de ned in GM2 Specification. For other systems, defined by manufacturer' },
    0x06: { txt: 'MPE Configurarion Message', msg: 'See MPE Speci cation' },
  },
  0x3d: { txt: 'Three Dimensional Sound Controllers',
    0x00: { txt: 'AZIMUTH ANGLE', msg: 'See RP-049' },
    0x01: { txt: 'ELEVATION ANGLE', msg: 'See RP-049' },
    0x02: { txt: 'GAIN', msg: 'See RP-049' },
    0x03: { txt: 'DISTANCE RATIO', msg: 'See RP-049' },
    0x04: { txt: 'MAXIMUM DISTANCE', msg: 'See RP-049' },
    0x05: { txt: 'GAIN AT MAXIMUM DISTANCE', msg: 'See RP-049' },
    0x06: { txt: 'REFERENCE DISTANCE RATIO', msg: 'See RP-049' },
    0x07: { txt: 'PAN SPREAD ANGLE', msg: 'See RP-049' },
    0x08: { txt: 'ROLL ANGLE', msg: 'See RP-049' },
  },
  // 0x3e-0x7e All RESERVED for future MMA De nition
  0x7f: { txt: 'Null Function Number for RPN/NRPN',
    0x7f: { txt: 'Null Function Number for RPN/NRPN', msg: 'Setting RPN to 7FH,7FH will disable the data entry, data increment, and data decrement controllers until a new RPN or NRPN is selected.' },
  },
}

export default ccs
/*
To set or change the value of a Registered Parameter:

1. Send two Control Change messages using Control Numbers 101 (65H) and 100 (64H) to select the
desired Registered Parameter Number, as per the following table.

2. To set the selected Registered Parameter to a speci c value, send a Control Change messages to the
Data Entry MSB controller (Control Number 6). If the selected Registered Parameter requires the LSB to be
set, send another Control Change message to the Data Entry LSB controller (Control Number 38).

3. To make a relative adjustment to the selected Registered Parameter's current value, use the Data
Increment or Data Decrement controllers (Control Numbers 96 and 97).

Parameter Number            Parameter Function      Data Entry Value
MSB: Control  LSB: Control
101 (65H)     100 (64H)
Value         Value
00H           00H           Pitch Bend Sensitivity  MSB = +/- semitones LSB =+/--cents
Resolution 100/8192
01H
Channel Fine Tuning
(formerly Fine Tuning - see MMA RP-022)
cents
00H 00H = -100 cents
40H 00H = A440
7FH 7FH = +100 cents
Only MSB used
02H
Channel Coarse Tuning
(formerly Coarse Tuning - see MMA RP-022)
Resolution 100 cents
00H = -6400 cents
40H = A440
7FH = +6300 cents
03HTuning Program Change
04HTuning Bank Select
Tuning Program
Number
Tuning Bank Number
For GM2, de ned in
05H
Modulation Depth Range
(see MMA General MIDI Level 2 Speci cation)
GM2 Speci cation.
For other systems,
de ned by
manufacturer
/06H
...
...
MPE Con gurarion Message (see MPE Speci cation)
All RESERVED for future MMA De nition
See MPE Speci cation
...
Three Dimensional Sound Controllers
3DH (61)
...
00HAZIMUTH ANGLESee RP-049
01HELEVATION ANGLESee RP-049
02HGAINSee RP-049
03HDISTANCE RATIOSee RP-049
04HMAXIMUM DISTANCESee RP-049
05HGAIN AT MAXIMUM DISTANCESee RP-049
06HREFERENCE DISTANCE RATIOSee RP-049
07HPAN SPREAD ANGLESee RP-049
08HROLL ANGLESee RP-049
...All RESERVED for future MMA De nition...
Setting RPN to
7FH,7FH will disable
the data entry, data
7FH
7FH
Null Function Number for RPN/NRPN
increment, and data
decrement controllers
until a new RPN or
NRPN is selected.
*/



/*
export const useCCStore = defineStore('cc', () => {

  const ccs = {}
  const val = ref({})

  const midi_hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  function midi_debug(dat) {
    let arr = []
    for(let i=0; i < dat.byteLength; i++) {
      arr[i] = dat[i].toString(16).padStart(2, 0)
    }
    return arr
  }
  
  const ch = ref(1) // midi ch
  const ccCh = ref(0xb1)
  function midi(e) {
    ch.value = e.target.value
    ccCh.value = parseInt('0xB' + midi_hex[ch.value])
  }
  function CC(e) {

    const id = e.target.id
    const ch = ccCh.value
    const cc = id // cc = id = ccid :D
    const val = e.target.value

    const payload = new Uint8Array(3)
    payload[0] = parseInt(ch) // ch
    payload[1] = parseInt(cc) // cc
    payload[2] = parseInt(val)// val
    
    //ws.send(payload)
    console.log('- CC', midi_debug(payload))
  }
  function inc(k) { console.log('inc', k)
    const max = parseInt(ccs[k].max)
    if(val[k] < max) val[k] = val[k] + 1
  }
  
  function dec(k) { console.log('dec', k)
    const min = parseInt(ccs[k].min)
    if(val[k] > min) val[k] = val[k] - 1
  }
  
  return { ccs, val, CC, ch, midi, ccCh, inc, dec }
})
*/
/* https://midi.org/specifications/midi-reference-tables/midi-1-0-control-change-messages-data-bytes-2

MIDI 1.0 Control Change Messages (Data Bytes)
Login to Download
Table 3 - Control Change Messages and RPNs

The following table lists all currently defined MIDI 1.0 Control Change messages and Channel Mode messages, in control number order (adapted from "MIDI by the Numbers" by D. Valenti-Electronic Musician 2/88, and updated by the MIDI Manufacturers Association.) This table is intended as an overview of MIDI, and is by no means complete.

WARNING! Details about implementing these messages can dramatically impact compatibility with other products. We strongly recommend consulting the official MMA Detailed MIDI Specification for additional information.

Registered Parameter Numbers (RPNs) are an extension to the Control Change message for setting additional parameters. Appended at the bottom is a table of all currently defined RPNs.

WARNING! Details about implementing these messages can dramatically impact compatibility with other products. We strongly recommend consulting the official MMA Detailed MIDI Specification for additional information.

Table 3: Control Changes and Mode Changes
(Status Bytes 176-191)
Control Number
(2nd Byte Value)	Control Function	3rd Byte Value
Decimal	Binary	Hex	Value	Used As
0	00000000	00	Bank Select	0-127	MSB
1	00000001	01	Modulation Wheel or Lever	0-127	MSB
2	00000010	02	Breath Controller	0-127	MSB
3	00000011	03	Undefined	0-127	MSB
4	00000100	04	Foot Controller	0-127	MSB
5	00000101	05	Portamento Time	0-127	MSB
6	00000110	06	Data Entry MSB	0-127	MSB
7	00000111	07	Channel Volume (formerly Main Volume)	0-127	MSB
8	00001000	08	Balance	0-127	MSB
9	00001001	09	Undefined	0-127	MSB
10	00001010	0A	Pan	0-127	MSB
11	00001011	0B	Expression Controller	0-127	MSB
12	00001100	0C	Effect Control 1	0-127	MSB
13	00001101	0D	Effect Control 2	0-127	MSB
14	00001110	0E	Undefined	0-127	MSB
15	00001111	0F	Undefined	0-127	MSB
16	00010000	10	General Purpose Controller 1	0-127	MSB
17	00010001	11	General Purpose Controller 2	0-127	MSB
18	00010010	12	General Purpose Controller 3	0-127	MSB
19	00010011	13	General Purpose Controller 4	0-127	MSB
20	00010100	14	Undefined	0-127	MSB
21	00010101	15	Undefined	0-127	MSB
22	00010110	16	Undefined	0-127	MSB
23	00010111	17	Undefined	0-127	MSB
24	00011000	18	Undefined	0-127	MSB
25	00011001	19	Undefined	0-127	MSB
26	00011010	1A	Undefined	0-127	MSB
27	00011011	1B	Undefined	0-127	MSB
28	00011100	1C	Undefined	0-127	MSB
29	00011101	1D	Undefined	0-127	MSB
30	00011110	1E	Undefined	0-127	MSB
31	00011111	1F	Undefined	0-127	MSB
32	00100000	20	LSB for Control 0 (Bank Select)	0-127	LSB
33	00100001	21	LSB for Control 1 (Modulation Wheel or Lever)	0-127	LSB
34	00100010	22	LSB for Control 2 (Breath Controller)	0-127	LSB
35	00100011	23	LSB for Control 3 (Undefined)	0-127	LSB
36	00100100	24	LSB for Control 4 (Foot Controller)	0-127	LSB
37	00100101	25	LSB for Control 5 (Portamento Time)	0-127	LSB
38	00100110	26	LSB for Control 6 (Data Entry)	0-127	LSB
39	00100111	27	LSB for Control 7 (Channel Volume, formerly Main Volume)	0-127	LSB
40	00101000	28	LSB for Control 8 (Balance)	0-127	LSB
41	00101001	29	LSB for Control 9 (Undefined)	0-127	LSB
42	00101010	2A	LSB for Control 10 (Pan)	0-127	LSB
43	00101011	2B	LSB for Control 11 (Expression Controller)	0-127	LSB
44	00101100	2C	LSB for Control 12 (Effect control 1)	0-127	LSB
45	00101101	2D	LSB for Control 13 (Effect control 2)	0-127	LSB
46	00101110	2E	LSB for Control 14 (Undefined)	0-127	LSB
47	00101111	2F	LSB for Control 15 (Undefined)	0-127	LSB
48	00110000	30	LSB for Control 16 (General Purpose Controller 1)	0-127	LSB
49	00110001	31	LSB for Control 17 (General Purpose Controller 2)	0-127	LSB
50	00110010	32	LSB for Control 18 (General Purpose Controller 3)	0-127	LSB
51	00110011	33	LSB for Control 19 (General Purpose Controller 4)	0-127	LSB
52	00110100	34	LSB for Control 20 (Undefined)	0-127	LSB
53	00110101	35	LSB for Control 21 (Undefined)	0-127	LSB
54	00110110	36	LSB for Control 22 (Undefined)	0-127	LSB
55	00110111	37	LSB for Control 23 (Undefined)	0-127	LSB
56	00111000	38	LSB for Control 24 (Undefined)	0-127	LSB
57	00111001	39	LSB for Control 25 (Undefined)	0-127	LSB
58	00111010	3A	LSB for Control 26 (Undefined)	0-127	LSB
59	00111011	3B	LSB for Control 27 (Undefined)	0-127	LSB
60	00111100	3C	LSB for Control 28 (Undefined)	0-127	LSB
61	00111101	3D	LSB for Control 29 (Undefined)	0-127	LSB
62	00111110	3E	LSB for Control 30 (Undefined)	0-127	LSB
63	00111111	3F	LSB for Control 31 (Undefined)	0-127	LSB
64	01000000	40	Damper Pedal on/off (Sustain)	≤63 off, ≥64 on	---
65	01000001	41	Portamento On/Off	≤63 off, ≥64 on	---
66	01000010	42	Sostenuto On/Off	≤63 off, ≥64 on	---
67	01000011	43	Soft Pedal On/Off	≤63 off, ≥64 on	---
68	01000100	44	Legato Footswitch	≤63 Normal, ≥64 Legato	---
69	01000101	45	Hold 2	≤63 off, ≥64 on	---
70	01000110	46	Sound Controller 1 (default: Sound Variation)	0-127	LSB
71	01000111	47	Sound Controller 2 (default: Timbre/Harmonic Intens.)	0-127	LSB
72	01001000	48	Sound Controller 3 (default: Release Time)	0-127	LSB
73	01001001	49	Sound Controller 4 (default: Attack Time)	0-127	LSB
74	01001010	4A	Sound Controller 5 (default: Brightness)	0-127	LSB
75	01001011	4B	Sound Controller 6 (default: Decay Time - see MMA RP-021)	0-127	LSB
76	01001100	4C	Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)	0-127	LSB
77	01001101	4D	Sound Controller 8 (default: Vibrato Depth - see MMA RP-021)	0-127	LSB
78	01001110	4E	Sound Controller 9 (default: Vibrato Delay - see MMA RP-021)	0-127	LSB
79	01001111	4F	Sound Controller 10 (default undefined - see MMA RP-021)	0-127	LSB
80	01010000	50	General Purpose Controller 5	0-127	LSB
81	01010001	51	General Purpose Controller 6	0-127	LSB
82	01010010	52	General Purpose Controller 7	0-127	LSB
83	01010011	53	General Purpose Controller 8	0-127	LSB
84	01010100	54	Portamento Control	0-127	LSB
85	01010101	55	Undefined	---	---
86	01010110	56	Undefined	---	---
87	01010111	57	Undefined	---	---
88	01011000	58	High Resolution Velocity Prefix	0-127	LSB
89	01011001	59	Undefined	---	---
90	01011010	5A	Undefined	---	---
91	01011011	5B	Effects 1 Depth
(default: Reverb Send Level - see MMA RP-023)
(formerly External Effects Depth)	0-127	---
92	01011100	5C	Effects 2 Depth (formerly Tremolo Depth)	0-127	---
93	01011101	5D	Effects 3 Depth
(default: Chorus Send Level - see MMA RP-023)
(formerly Chorus Depth)	0-127	---
94	01011110	5E	Effects 4 Depth (formerly Celeste [Detune] Depth)	0-127	---
95	01011111	5F	Effects 5 Depth (formerly Phaser Depth)	0-127	---
96	01100000	60	Data Increment (Data Entry +1) (see MMA RP-018)	N/A	---
97	01100001	61	Data Decrement (Data Entry -1) (see MMA RP-018)	N/A	---
98	01100010	62	Non-Registered Parameter Number (NRPN) - LSB	0-127	LSB
99	01100011	63	Non-Registered Parameter Number (NRPN) - MSB	0-127	MSB
100	01100100	64	Registered Parameter Number (RPN) - LSB*	0-127	LSB
101	01100101	65	Registered Parameter Number (RPN) - MSB*	0-127	MSB
102	01100110	66	Undefined	---	---
103	01100111	67	Undefined	---	---
104	01101000	68	Undefined	---	---
105	01101001	69	Undefined	---	---
106	01101010	6A	Undefined	---	---
107	01101011	6B	Undefined	---	---
108	01101100	6C	Undefined	---	---
109	01101101	6D	Undefined	---	---
110	01101110	6E	Undefined	---	---
111	01101111	6F	Undefined	---	---
112	01110000	70	Undefined	---	---
113	01110001	71	Undefined	---	---
114	01110010	72	Undefined	---	---
115	01110011	73	Undefined	---	---
116	01110100	74	Undefined	---	---
117	01110101	75	Undefined	---	---
118	01110110	76	Undefined	---	---
119	01110111	77	Undefined	---	---
Note:	Controller numbers 120-127 are reserved for Channel Mode Messages, which rather than controlling sound parameters, affect the channel's operating mode. (See also Table 1.)
120	01111000	78	[Channel Mode Message] All Sound Off	0	---
121	01111001	79	[Channel Mode Message] Reset All Controllers
(See MMA RP-015)	0	---
122	01111010	7A	[Channel Mode Message] Local Control On/Off	0 off, 127 on	---
123	01111011	7B	[Channel Mode Message] All Notes Off	0	---
124	01111100	7C	[Channel Mode Message] Omni Mode Off (+ all notes off)	0	---
125	01111101	7D	[Channel Mode Message] Omni Mode On (+ all notes off)	0	---
126	01111110	7E	[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)	
Note: This equals the number of channels, or zero if the number of channels equals the number of voices in the receiver.

---
127	01111111	7F	[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)	0	---

Table 3a: Registered Parameter Numbers

To set or change the value of a Registered Parameter:

1. Send two Control Change messages using Control Numbers 101 (65H) and 100 (64H) to select the desired Registered Parameter Number, as per the following table.

2. To set the selected Registered Parameter to a specific value, send a Control Change messages to the Data Entry MSB controller (Control Number 6). If the selected Registered Parameter requires the LSB to be set, send another Control Change message to the Data Entry LSB controller (Control Number 38).

3. To make a relative adjustment to the selected Registered Parameter's current value, use the Data Increment or Data Decrement controllers (Control Numbers 96 and 97).

Parameter Number	Parameter Function	Data Entry Value
MSB: Control 101 (65H) Value	LSB: Control 100 (64H) Value
00H	00H	Pitch Bend Sensitivity	MSB = +/- semitones
LSB =+/--cents
01H	Channel Fine Tuning
(formerly Fine Tuning - see MMA RP-022)	Resolution 100/8192 cents
00H 00H = -100 cents
40H 00H = A440
7FH 7FH = +100 cents
02H	Channel Coarse Tuning
(formerly Coarse Tuning - see MMA RP-022)	Only MSB used
Resolution 100 cents
00H = -6400 cents
40H = A440
7FH = +6300 cents
03H	Tuning Program Change	Tuning Program Number
04H	Tuning Bank Select	Tuning Bank Number
05H 	Modulation Depth Range
(see MMA General MIDI Level 2 Specification)	For GM2, defined in GM2 Specification.
For other systems, defined by manufacturer
06H 	
MPE Configurarion Message (see MPE Specification)

See MPE Specification
 ...	 ...	 All RESERVED for future MMA Defccstion	 ...
3DH (61)	Three Dimensional Sound Controllers
00H	AZIMUTH ANGLE 	See RP-049
01H	ELEVATION ANGLE 	See RP-049
02H	GAIN 	See RP-049
03H	DISTANCE RATIO 	See RP-049
04H	MAXIMUM DISTANCE 	See RP-049
05H	GAIN AT MAXIMUM DISTANCE 	See RP-049
06H	REFERENCE DISTANCE RATIO 	See RP-049
07H	PAN SPREAD ANGLE 	See RP-049
08H	ROLL ANGLE 	See RP-049
 ...	 ...	 All RESERVED for future MMA Defccstion	 ...
7FH	7FH	Null Function Number for RPN/NRPN	Setting RPN to 7FH,7FH will disable the data entry, data increment, and data decrement controllers until a new RPN or NRPN is selected.
x
PLEASE LOGIN TO DOWNLOAD DOCUMENT
Do not have an account Register 
*/
