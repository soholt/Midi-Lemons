//export default
console.log('load dx7.js')
const map = {
  // from DX7E1.pdf
  
    banks:{
      rom1a:['BRASS   1 ','BRASS   2 ','BRASS   3 ','STRINGS 1 ','STRINGS 2 ','STRINGS 3 ','ORCHESTRA ','PIANO   1 ','PIANO   2 ','PIANO   3 ','E.PIANO 1 ','GUITAR  1 ','GUITAR  2 ','SYN-LEAD 1','BASS    1 ','BASS    2 ','E.ORGAN 1 ','PIPES   1 ','HARPSICH 1','CLAV    1 ','VIBE    1 ','MARIMBA   ','KOTO      ','FLUTE   1 ','ORCH-CHIME','TUB BELLS ','STEEL DRUM','TIMPANI   ','REFS WHISL','VOICE   1 ','TRAIN     ','TAKE OFF  '],
      rom1b:['PIANO   4 ','PIANO   5 ','E.PIANO 2 ','E.PIANO 3 ','E.PIANO 4 ','PIANO 5THS','CELESTE   ','TOY PIANO ','HARPSICH 2','HARPSICH 3','CLAV    2 ','CLAV    3 ','E.ORGAN 2 ','E.ORGAN 3 ','E.ORGAN 4 ','E.ORGAN 5 ','PIPES   2 ','PIPES   3 ','PIPES   4 ','CALIOPE   ','ACCORDION ','SITAR     ','GUITAR  3 ','GUITAR  4 ','GUITAR  5 ','GUITAR  6 ','LUTE      ','BANJO     ','HARP    1 ','HARP    2 ','BASS    3 ','BASS    4 '],
      rom2a:['PICCOLO   ','FLUTE   2 ','OBOE      ','CLARINET  ','SAX BC    ','BASSOON   ','STRINGS 4 ','STRINGS 5 ','STRINGS 6 ','STRINGS 7 ','STRINGS 8 ','BRASS   4 ','BRASS   5 ','BRASS 6 BC','BRASS   7 ','BRASS   8 ','RECORDER  ','HARMONICA1','HRMNCA2 BC','VOICE   2 ','VOICE   3 ','GLOKENSPL ','VIBE    2 ','XYLOPHONE ','CHIMES    ','GONG    1 ','GONG    2 ','BELLS     ','COW BELL  ','BLOCK     ','FLEXATONE ','LOG DRUM  '],
      rom2b:['SYN-LEAD 2','SYN-LEAD 3','SYN-LEAD 4','SYN-LEAD 5','SYN-CLAV 1','SYN-CLAV 2','SYN-CLAV 3','SYN-PIANO ','SYNBRASS 1','SYNBRASS 2','SYNORGAN 1','SYNORGAN 2','SYN-VOX   ','SYN-ORCH  ','SYN-BASS 1','SYN-BASS 2','HARP-FLUTE','BELL-FLUTE','E.P-BRS BC','T.BL-EXPA ','CHIME-STRG','B.DRM-SNAR','SHIMMER   ','EVOLUTION ','WATER GDN ','WASP STING','LASER GUN ','DESCENT   ','OCTAVE WAR','GRAND PRIX','ST.HELENS ','EXPLOSION '],
      rom3a:['FLUTE   1 ','HARPSICH 1','STRG ENS 1','BRIGHT BOW','BRASSHORNS','BR TRUMPET','MARIMBA   ','E.PIANO 1 ','PIANO   1 ','PIPES   1 ','E.ORGAN 1 ','E.BASS  1 ','CLAV    1 ','HARMONICA1','JAZZ GUIT1','PRC SYNTH1','SAX BC    ','FRETLESS 1','HARP    1 ','TIMPANI   ','HEAVYMETAL','STEEL DRUM','SYN-LEAD 1','VOICES BC ','CLAV ENS  ','LASERSWEEP','TUB ERUPT ','GRAND PRIX','REFS WHISL','TRAIN     ','BRASS S H ','TAKE OFF  '],
      rom3b:['PIANO   2 ','E.GRAND 1 ','E.GRAND 2 ','HONKY TONK','E.PIANO 2 ','E.PIANO 3 ','E.PIANO 4 ','CELESTE   ','FUNK CLAV ','CLAV ENS 2','PERC CLAV ','HARPSICH 2','E.ORGAN 2 ','E.ORGAN 3 ','60-S ORGAN','PIPES   2 ','PIPES   3 ','CALIOPE   ','ACCORDION ','TOY PIANO ','SITAR     ','KOTO      ','JAZZ GUIT2','SPANISHGTR','FOLK GUIT ','LUTE      ','BANJO     ','CLAS.GUIT ','HARP    2 ','E.BASS  2 ','FRETLESS 2','PLUCK BASS'],
      rom4a:['PICCOLO   ','FLUTE   2 ','OBOE      ','CLARINET  ','BASSOON   ','PAN FLUTE ','LEAD BRASS','HORNS     ','SOLO TBONE','BRASS BC  ','BRASS 5THS','SYNTHBRASS','STRG QRT 1','STRG ENS 2','VIOLA SECN','STRGS LOW ','HIGH STRGS','PIZZ STGS ','STG CRSNDO','STGS 5THS ','BELLS     ','TUB BELLS ','RECORDERS ','CHIMES    ','VOICES    ','XYLOPHONE ','COWBELL   ','WOOD BLOCK','FLEXATONE ','LOG DRUM  ','GLOKENSPL ','VIBE      '],
      rom4b:['CLAV-E.PNO','PERC BRASS','PRC SYNTH2','HARPSI-STG','CHIME-STRG','HARP-FLUTE','BELL-FLUTE','STRG-CHIME','STRG-MARIM','STRG-PIZZT','ORCHESTRA ','LEAD GUITR','PIANO-BRS ','BRS-CHIME ','B.DRM-SNAR','E.P-BRS BC','ORG-BRS BC','CLV-BRS BC','WHISTLES  ','FILTER SWP','FUNKY RISE','WILD BOAR ','SHIMMER   ','EVOLUTION ','WATER GDN ','WASP STING','MULTI NOTE','DESCENT   ','OCTAVE WAR','..GOTCHA..','ST.HELENS ','EXPLOSION ']
    },
  ini: {
    fx: {
      // * TG FX
      ReverbSize: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbSize', txt: 'RevSize', show: true, type: 'range' },
      ReverbHighDamp: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbHighDamp', txt: 'RevHDamp', show: true, type: 'range' },
      ReverbLowDamp: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLowDamp', txt: 'RevLDamp', show: true, type: 'range' },
      ReverbLowPass: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLowPass', txt: 'RevLPass', show: true, type: 'range' },
      ReverbDiffusion: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbDiffusion', txt: 'RevDiff', show: true, type: 'range' },
      ReverbLevel: { ctl: 'cc', key: 0xff, min: 0, max: 127, def: 100, name: 'ReverbLevel', txt: 'RevLevl', show: true, type: 'range' },
      CompressorEnable: { ctl: 'cc', key: 0xff, name: 'CompressorEnable', txt: 'CompEn', show: false, type: 'button' },
      ReverbEnable: { ctl: 'cc', key: 0xff, name: 'ReverbEnable', txt: 'RevEn', show: true, type: 'button' }
    },
    pan: {
      Pan: { ctl: 'cc', key: 0x0a, min: 0, max: 127, def: 64, name: 'Pan', txt: 'Pan', type: 'range' } //Pan#':64		# 0 .. 127,
    },
    params: {
      /* 
          
          vox: { show: true, name: 'Bank:Voice' },
          
          
          from mididevice.cpp
      
          #define MIDI_NOTE_OFF		0b1000
          #define MIDI_NOTE_ON		0b1001
          #define MIDI_AFTERTOUCH		0b1010			// TODO
          #define MIDI_CHANNEL_AFTERTOUCH 0b1101   // right now Synth_Dexed just manage Channel Aftertouch not Polyphonic AT -> 0b1010
          #define MIDI_CONTROL_CHANGE	0b1011
            #define MIDI_CC_BANK_SELECT_MSB		0
            #define MIDI_CC_MODULATION			1
            #define MIDI_CC_BREATH_CONTROLLER	2 
            #define MIDI_CC_FOOT_PEDAL 		4
            #define MIDI_CC_VOLUME				7
            #define MIDI_CC_PAN_POSITION		10
            #define MIDI_CC_BANK_SELECT_LSB		32
            #define MIDI_CC_BANK_SUSTAIN		64
            #define MIDI_CC_RESONANCE			71
            #define MIDI_CC_FREQUENCY_CUTOFF	74
            #define MIDI_CC_REVERB_LEVEL		91
            #define MIDI_CC_DETUNE_LEVEL		94
            #define MIDI_CC_ALL_SOUND_OFF		120
            #define MIDI_CC_ALL_NOTES_OFF		123
          #define MIDI_PROGRAM_CHANGE	0b1100
          #define MIDI_PITCH_BEND		0b1110
      
          #define MIDI_SYSTEM_EXCLUSIVE_BEGIN	0xF0
          #define MIDI_SYSTEM_EXCLUSIVE_END	0xF7
          #define MIDI_TIMING_CLOCK	0xF8
          #define MIDI_ACTIVE_SENSING	0xFE
      
          */
      // * TG
      // Do not add cc to BankNumber and VoiceNumber
      /**
       * Do BankNumber and Voice number in sysex [msb][lsb][voice]
       */
      //BankNumber: {ctl:'cc', key: 0xff, min: 0, max: 127, def: 1, name: 'BankNumber', txt: 'Bank', show: true, type: 'select' }, //,ctl:'cc', key: 0x00 BankNumber#':0		# 0 .. 127,
      //VoiceNumber: {ctl:'cc', key: 0xff, min: 0, max: 127, def: 1, name: 'VoiceNumber', txt: 'Voice', show: true, type: 'select' }, //PROGRAM CHANGE VoiceNumber#':1		# 1 .. 32,

      //is in the mix Volume: {ctl:'cc', key: 0x07, min: 0, max: 127, def: 100, name: 'Volume', txt: 'TG - Vol', type: 'range' }, //Volume#':100		# 0 .. 127,
      //Pan: {ctl:'cc', key: 0x0a, min: 0, max: 127, def: 64, name: 'Pan', txt: 'Pan', type: 'range' }, //Pan#':64		# 0 .. 127,
      // remove Panas it is in pan:{}

      Detune: { ctl: 'cc', key: 0x5e, min: 0, max: 127, def: 0, name: 'Detune', txt: 'De- tune', type: 'range' }, //Detune#':0		# -99 .. 99,
      Cutoff: { ctl: 'cc', key: 0x4a, min: 0, max: 99, def: 99, name: 'Cutoff', txt: 'Cut Off', type: 'range' }, //Cutoff#':99		# 0 .. 99,
      Resonance: { ctl: 'cc', key: 0x47, min: 0, max: 99, def: 0, name: 'Resonance', txt: 'Reso- nance', type: 'range' }, //Resonance#':0		# 0 .. 99,
      ReverbSend: { ctl: 'cc', key: 0x5b, min: 0, max: 99, def: 0, name: 'ReverbSend', txt: 'Rvbr Send', type: 'range' }, //ReverbSend#':0		# 0 .. 99,

      // there is detune(7: Center) in PCED 0..14
      //MIDIChannel: { ctl:'sx', key:0, min: 0, max: 16, def: 1, name: 'MIDIChannel', txt: 'Midi', type: 'range' }, //MIDIChannel#':1		# 1 .. 16, 0: off, >16: omni mode,
      //NoteLimitLow: { ctl: 'sx', key: 0, min: 0, max: 127, def: 0, name: 'NoteLimitLow', txt: 'Note LmtLo', type: 'range' }, //NoteLimitLow#':0	# 0 .. 127, C-2 .. G8,
      //NoteLimitHigh: { ctl: 'sx', key: 0, min: 0, max: 127, def: 127, name: 'NoteLimitHigh', txt: 'Note LmtHi', type: 'range' }, //NoteLimitHigh#':127	# 0 .. 127, C-2 .. G8,
      //NoteShift: { ctl: 'sx', key: 0, min: -24, max: 24, def: 0, name: 'NoteShift', txt: 'Note Shft', type: 'range' }, //NoteShift#':0		# -24 .. 24,
      // Note shift 0..48 from TX802 man

      // ACED g=2 Function Parameter
      0: { ctl: 'sx', key: 64, min: 0, max: 1, def: 0, name: 'MonoMode', txt: 'Mono Mode', t: 'Mono', type: 'button' }, //MonoMode#':0 # 0-off .. 1-On,
      1: { ctl: 'sx', key: 65, min: 0, max: 12, def: 2, name: 'PitchBendRange', txt: 'PtchBnd Range', type: 'range' }, //PitchBendRange#':2 # 0 .. 12,
      2: { ctl: 'sx', key: 66, min: 0, max: 12, def: 0, name: 'PitchBendStep', txt: 'PtchBnd Step', type: 'range' }, //PitchBendStep#':0 # 0 .. 12,
      3: { ctl: 'sx', key: 67, min: 0, max: 1, def: 0, name: 'PortamentoMode', txt: 'Protm Mode', t: 'Portamento', type: 'button' }, //PortamentoMode#':0 # 0 .. 1,
      4: { ctl: 'sx', key: 68, min: 0, max: 1, def: 0, name: 'PortamentoGlissando', txt: 'Portm Glis', t: 'P.Glissando', type: 'button' }, //PortamentoGlissando#':0 # 0 .. 1,
      5: { ctl: 'sx', key: 69, min: 0, max: 99, def: 0, name: 'PortamentoTime', txt: 'Portm Time', type: 'range' }, //PortamentoTime#':0 # 0 .. 99,
      6: { ctl: 'sx', key: 70, min: 0, max: 99, def: 99, name: 'ModulationWheelRange', txt: 'MdWhl Range', type: 'range' }, //ModulationWheelRange#':99 # 0..99,
      7: { ctl: 'sx', key: 71, min: 0, max: 7, def: 1, name: 'ModulationWheelTarget', txt: 'MdWhl Target', type: 'range' }, //ModulationWheelTarget#':1 # 0..7,
      8: { ctl: 'sx', key: 72, min: 0, max: 99, def: 99, name: 'FootControlRange', txt: 'FootC Range', type: 'range' }, //FootControlRange#':99 # 0..99,
      9: { ctl: 'sx', key: 73, min: 0, max: 7, def: 0, name: 'FootControlTarget', txt: 'FootC Target', type: 'range' }, //FootControlTarget#':0 # 0..7,
      10: { ctl: 'sx', key: 74, min: 0, max: 99, def: 99, name: 'BreathControlRange', txt: 'Breth Range', type: 'range' }, //BreathControlRange#':99 # 0..99,
      11: { ctl: 'sx', key: 75, min: 0, max: 7, def: 0, name: 'BreathControlTarget', txt: 'Breth Target', type: 'range' }, //BreathControlTarget#':0 # 0..7,
      12: { ctl: 'sx', key: 76, min: 0, max: 99, def: 99, name: 'AftertouchRange', txt: 'AftTch Range', type: 'range' }, //AftertouchRange#':99 # 0..99,
      13: { ctl: 'sx', key: 77, min: 0, max: 7, def: 0, name: 'AftertouchTarget', txt: 'AftTch Target', type: 'range' } //AftertouchTarget#':0 # 0..7,

      //VoiceData: '', //VoiceData#': # space separated hex numbers of 156 voice parameters. Example: 5F 1D 14 32 63 [....] 20 55 ,
    }
  },
  vox: {
    // g=0
    op: {
      // Operator
      0: { def: 0, min: 0, max: 99, t: 'rate 1', type: 'range' },
      1: { def: 0, min: 0, max: 99, t: 'rate 2', type: 'range' },
      2: { def: 0, min: 0, max: 99, t: 'rate 3', type: 'range' },
      3: { def: 0, min: 0, max: 99, t: 'rate 4', type: 'range' },
      4: { def: 0, min: 0, max: 99, t: 'level 1', type: 'range' },
      5: { def: 0, min: 0, max: 99, t: 'level 2', type: 'range' },
      6: { def: 0, min: 0, max: 99, t: 'level 3', type: 'range' },
      7: { def: 0, min: 0, max: 99, t: 'level 4', type: 'range' },
      8: { def: 0, min: 0, max: 99, t: 'KBD LEV SCL BRK PT', type: 'range' }, //check max
      9: { def: 0, min: 0, max: 99, t: 'LFT DEPTH', type: 'range' }, //check max
      10: { def: 0, min: 0, max: 99, t: 'RHT DEPTH', type: 'range' }, //check max
      11: { def: 0, min: 0, max: 3, t: 'LFT CURVE', type: 'range' }, // --
      12: { def: 0, min: 0, max: 3, t: 'RHT CURVE', type: 'range' },
      13: { def: 0, min: 0, max: 7, t: 'KBD RATE SCALING', type: 'range' },
      14: { def: 0, min: 0, max: 3, t: 'AMP_MOD_SENSITIVITY', type: 'range' },
      15: { def: 0, min: 0, max: 7, t: 'KEY VEL SENSITIVITY', type: 'range' },
      16: { def: 0, min: 0, max: 99, t: 'OP OUTPUT LEVEL', type: 'range' },
      17: { def: 0, min: 0, max: 1, t: 'OSC MODE', type: 'range' }, // --
      18: { def: 0, min: 0, max: 31, t: 'OSC FREQ COARSE', type: 'range' },
      19: { def: 0, min: 0, max: 99, t: 'OSC FREQ FINE', type: 'range' },
      20: { def: 0, min: 0, max: 14, t: 'OSC DETUNE', type: 'range' }
    },
    props: {
      0: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 1' },
      1: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 2' },
      2: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 3' },
      3: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 4' },
      4: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 1' },
      5: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 2' },
      6: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 3' },
      7: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 4' },
      8: { def: 0, min: 0, max: 31, t: 'ALGORITHM' },
      9: { def: 0, min: 0, max: 7, t: 'FEEDBACK' },
      10: { def: 0, min: 0, max: 1, t: 'OSCILLATOR SYNC' },
      11: { def: 0, min: 0, max: 99, t: 'LFO SPEED' },
      12: { def: 0, min: 0, max: 99, t: 'DELAY' },
      13: { def: 0, min: 0, max: 99, t: 'PITCH MOD DEPTH' },
      14: { def: 0, min: 0, max: 99, t: 'AMP MOD DEPTH' },
      15: { def: 0, min: 0, max: 1, t: 'LFO SYNC' },
      16: { def: 0, min: 0, max: 5, t: 'WAVEFORM' },
      17: { def: 0, min: 0, max: 7, t: 'PITCH MOD SENSITIVITY' },
      18: { def: 0, min: 0, max: 48, t: 'TRANSPOSE' },

      // same as above diff index @TODO remove one
      126: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 1', type: 'range' },
      127: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 2', type: 'range' },
      128: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 3', type: 'range' },
      129: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 4', type: 'range' },
      130: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 1', type: 'range' },
      131: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 2', type: 'range' },
      132: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 3', type: 'range' },
      133: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 4', type: 'range' },
      134: { def: 0, min: 0, max: 31, t: 'ALGORITHM', type: 'range' },
      135: { def: 0, min: 0, max: 7, t: 'FEEDBACK', type: 'range' },
      136: { def: 0, min: 0, max: 1, t: 'OSCILLATOR SYNC', type: 'range' },
      137: { def: 0, min: 0, max: 99, t: 'LFO SPEED', type: 'range' },
      138: { def: 0, min: 0, max: 99, t: 'DELAY', type: 'range' },
      139: { def: 0, min: 0, max: 99, t: 'PITCH MOD DEPTH', type: 'range' },
      140: { def: 0, min: 0, max: 99, t: 'AMP MOD DEPTH', type: 'range' },
      141: { def: 0, min: 0, max: 1, t: 'LFO SYNC', type: 'range' },
      142: { def: 0, min: 0, max: 5, t: 'WAVEFORM', type: 'range' },
      143: { def: 0, min: 0, max: 7, t: 'PITCH MOD SENSITIVITY', type: 'range' },
      144: { def: 0, min: 0, max: 48, t: 'TRANSPOSE', type: 'range' },

      // Name
      145: '',
      146: '',
      147: '',
      148: '',
      149: '',
      150: '',
      151: '',
      152: '',
      153: '',
      154: '',

      // On/Off
      155: { def: 0b00111111, t: 'OPERATOR ON/OFF', type: 'special' }
      /*
        0: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 1' },
        1: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 2' },
        2: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 3' },
        3: { def: 0, min: 0, max: 99, t: 'PITCH EG RATE 4' },
        4: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 1' },
        5: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 2' },
        6: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 3' },
        7: { def: 0, min: 0, max: 99, t: 'PITCH EG LEVEL 4' },
        8: { def: 0, min: 0, max: 31, t: 'ALGORITHM' },
        9: { def: 0, min: 0, max: 7, t: 'FEEDBACK' },
        10: { def: 0, min: 0, max: 1, t: 'OSCILLATOR SYNC' },
        11: { def: 0, min: 0, max: 99, t: 'LFO SPEED' },
        12: { def: 0, min: 0, max: 99, t: 'DELAY' },
        13: { def: 0, min: 0, max: 99, t: 'PITCH MOD DEPTH' },
        14: { def: 0, min: 0, max: 99, t: 'AMP MOD DEPTH' },
        15: { def: 0, min: 0, max: 1, t: 'LFO SYNC' },
        16: { def: 0, min: 0, max: 5, t: 'WAVEFORM' },
        17: { def: 0, min: 0, max: 7, t: 'PITCH MOD SENSITIVITY' },
        18: { def: 0, min: 0, max: 48, t: 'TRANSPOSE' }
        */
    },
    name: (a) => {
      /*
        const name = dat.value.slice(145, 155) // 10
        let _voiceName = new Uint8Array(name) // 10
        _voiceName = new TextDecoder().decode(_voiceName)*/
      //console.log('Name', a, new Uint8Array(a))
      return new TextDecoder().decode(new Uint8Array(a))
    }

    //},
    //state: {}
    // expat from VoiceEdit.vue
    //VCED: {},
    //PCED: {}
  },
  crc: (a) => { // @TODO move to fn?
    let sum = 0
    a.forEach((val) => {
      sum += val
    })
    const crc = (~sum + 1) & 0x7f
    //const crc = ~sum + 1 >>> 0
    //const crc = 256 - sum
    console.log('crc', { sum: sum, crc: crc })
    return crc
  },
  g2: {},
  //ctl: 'sx',
  //key: {}
}
