/**
 * @TODO
 * @TODO split into const and var msgs
 */
//??
const id = {
  /**
   * Non Real Time 7E
   */
  0x7e: { txt: 'Non-Real Time', // sx
  	//0x00: { txt: 'Unused' },
	0x01: { txt: 'Sample Dump Header', hex: '7E 01' }, // @TODO hex?
	0x02: { txt: 'Sample Data Packet', hex: '7E 02' },
	0x03: { txt: 'Sample Dump Request', hex: '7E 03' },
	0x04: { txt: 'MIDI Time Code', hex: '7E 04',
		0x00: {txt:'Special', hex: '7E 04 00'},
		0x01: {txt:'Punch In Points', hex: '7E 04 01'},
		0x02: {txt:'Punch Out Points', hex: '7E 04 02'},
		0x03: {txt:'Delete Punch In Point', hex: '7E 04 03'},
		0x04: {txt:'Delete Punch Out Point', hex: '7E 04 04'},
		0x05: {txt:'Event Start Point', hex: '7E 04 05'},
		0x06: {txt:'Event Stop Point', hex: '7E 04 06'},
		0x07: {txt:'Event Start Points with additional info', hex: '7E 04 07'},
		0x08: {txt:'Event Stop Points with additional info', hex: '7E 04 08'},
		0x09: {txt:'Delete Event Start Point', hex: '7E 04 09'},
		0x0A: {txt:'Delete Event Stop Point', hex: '7E 04 0A'},
		0x0B: {txt:'Cue Points', hex: '7E 04 0B'},
		0x0C: {txt:'Cue Points with additional info', hex: '7E 04 0C'},
		0x0D: {txt:'Delete Cue Point', hex: '7E 04 0D'},
		0x0E: {txt:'Event Name in additional info', hex: '7E 04 0E'},
	},
	0x05: { txt: 'Sample Dump Extensions',
		0x01: {txt:'Loop Points Transmission'},
		0x02: {txt:'Loop Points Request'},
		0x03: {txt:'Sample Name Transmission'},
		0x04: {txt:'Sample Name Request'},
		0x05: {txt:'Extended Dump Header'},
		0x06: {txt:'Extended Loop Points Transmission'},
		0x07: {txt:'Extended Loop Points Request'},
	},
	0x06: { txt: 'General Information',
		0x01: { txt: 'Identity Request' },
		0x02: { txt: 'Request Reply' }
	},
	0x07: { txt: 'File Dump',
		0x01: { txt: 'Header' },
		0x02: { txt: 'Data Packet' },
		0x03: { txt: 'Request' }
	},
	0x08: { txt: 'MIDI Tuning Standard (Non-Real Time)',
		0x00: { txt: 'Bulk Dump Request' },
		0x01: { txt: 'Bulk Dump Reply' },
		0x03: { txt: 'Tuning Dump Request' },
		0x04: { txt: 'Key-Based Tuning Dump' },
		0x05: { txt: 'Scale/Octave Tuning Dump, 1 byte format' },
		0x06: { txt: 'Scale/Octave Tuning Dump, 2 byte format' },
		0x07: { txt: 'Single Note Tuning Change with Bank Select' },
		0x08: { txt: 'Scale/Octave Tuning, 1 byte format' },
		0x09: { txt: 'Scale/Octave Tuning, 2 byte format' },
	},
	0x09: { txt: 'General MIDI',
		0x01: { txt: 'General MIDI 1 System On' },
		0x02: { txt: 'General MIDI System Off' },
		0x03: { txt: 'General MIDI 2 System On' },
	},
	0x0A: { txt: 'Downloadable Sounds',
		0x01: { txt: 'Turn DLS On' },
		0x02: { txt: 'Turn DLS Off' },
		0x03: { txt: 'Turn DLS Voice Allocation Off' },
		0x04: { txt: 'Turn DLS Voice Allocation On' },
	},
	0x0B: { txt: 'File Reference Message',
		// 0x00: { txt: 'reserved (do not use)' },
		0x01: { txt: 'Open File' },
		0x02: { txt: 'Select or Reselect Contents' },
		0x03: { txt: 'Open File and Select Contents' },
		0x04: { txt: 'Close File' },
		// 05-7F	 	reserved (do not use)
	},
	0x0C: { txt: 'MIDI Visual Control', msg: '00-7F MVC Commands (See MVC Documentation)',
		//@TODO
	},
	0x0D: { txt: 'MIDI Capability Inquiry', msg: '00-7F Inquiry/Response Messages (See Documentation)',
		//@TODO
	},
	0x7B: { txt: 'End of File' },
	0x7C: { txt: 'Wait' },
	0x7D: { txt: 'Cancel' },
	0x7E: { txt: 'NAK' },
	0x7F: { txt: 'ACK' },
  },


  /**
   * Real Time 7F
   */
  0x7f: { txt: 'Real Time',
  	//0x00: { txt: 'Unused' },
	0x01: { txt: 'MIDI Time Code',
		0x01: { txt: 'Full Message',
  			//parse: function(a){return {p:a}}}
		},
		0x02: { txt: 'User Bits' },
	},
	0x02: { txt: 'MIDI Show Control',
		0x00: { txt: 'MSC Extensions', msg: '01-7F MSC Commands (see MSC Documentation)' },
		// @TODO 01-7F	 	MSC Commands (see MSC Documentation)
	},
	0x03: { txt: 'Notation Information',
		0x01: { txt: 'Bar Number' },
		0x02: { txt: 'Time Signature (Immediate)' },
		0x42: { txt: 'Time Signature (Delayed)' },
	},
	/**
	 * @TODO include vals?
	 * 
	 * 
	 */
	0x04: { txt: 'Device Control',
		0x01: { txt: 'Master Volume' },
		0x02: { txt: 'Master Balance' },
		0x03: { txt: 'Master Fine Tuning' },
		0x04: { txt: 'Master Coarse Tuning' },
		0x05: { txt: 'Global Parameter Control' },
	},
	/*
		Real Time MIDI Cueing Set-Up Messages (8 bytes plus any additional information):

		Real Time MTC Cueing essentially duplicates the bulk of the Non-Real time MTC Cueing
		messages in the Universal Real-Time area.
		Note that the time field has been dropped. With this message the time would be “as soon as you
		receive this.” All of the Delete messages plus many of the Special messages have been
		excluded – they were intended for remote-editing of a cue list and are not needed for real-time
		response.
		The format and definitions of all other messages remains the same, as do their sub ID #2
		definitions (in order to match one-on-one with their Non-Real Time counterparts).
		Refer to the Non-Real Time MTC definitions (above) for more detailed information.
	*/
	0x05: { txt: 'Real Time MTC Cueing',
		0x00: { txt: 'Special' },
		0x01: { txt: 'Punch In Points' },
		0x02: { txt: 'Punch Out Points' },
		0x03: { txt: '(Reserved)' },
		0x04: { txt: '(Reserved)' },
		0x05: { txt: 'Event Start points' },
		0x06: { txt: 'Event Stop points' },
		0x07: { txt: 'Event Start points with additional info' },
		0x08: { txt: 'Event Stop points with additional info' },
		0x09: { txt: '(Reserved)' },
		0x0A: { txt: '(Reserved)' },
		0x0B: { txt: 'Cue points' },
		0x0C: { txt: 'Cue points with additional info' },
		0x0D: { txt: '(Reserved)' },
		0x0E: { txt: 'Event Name in additional info' },
	// sl, sm - Event Number (LSB first)
	// <add. info.> nibblized as per the MTC Cueing Specification
	// F7 EOX
	},
	/**
	 * @TODO
	 */
	0x06: { txt: 'MIDI Machine Control Commands',
		// 00-7F MMC Commands (See MMC Documentation)
		0x00: {txt: 'reserved for extensions'},
		0x01: {txt: 'STOP'},
		0x02: {txt: 'PLAY'},
		0x03: {txt: 'DEFERRED PLAY'},
		0x04: {txt: 'FAST FORWARD'},
		0x05: {txt: 'REWIND'},
		0x06: {txt: 'RECORD STROBE'},
		0x07: {txt: 'RECORD EXIT'},
		0x08: {txt: 'RECORD PAUSE'},
		0x09: {txt: 'PAUSE'},
		0x0a: {txt: 'EJECT'},
		0x0b: {txt: 'CHASE'},
		0x0c: {txt: 'COMMAND ERROR RESET'},
		0x0d: {txt: 'MMC RESET'},

		0x40: {txt: 'WRITE'},
		0x41: {txt: 'MASKED WRITE'},
		0x42: {txt: 'READ'},
		0x43: {txt: 'UPDATE'},
		0x44: {txt: 'LOCATE'},
		0x45: {txt: 'VARIABLE PLAY'},
		0x46: {txt: 'PLSEARCHAY'},
		0x47: {txt: 'SHUTTLE'},
		0x48: {txt: 'STEP'},
		0x49: {txt: 'ASSIGN SYSTEM MASTER'},
		0x4a: {txt: 'GENERATOR COMMAND'},
		0x4b: {txt: 'MIDI TIME CODE COMMAND'},
		0x4c: {txt: 'MOVE'},
		0x4d: {txt: 'ADD'},
		0x4e: {txt: 'SUBTSRACT'},
		0x4f: {txt: 'DROP FRAME ADJUST'},
		0x50: {txt: 'PROCEDURE'},
		0x51: {txt: 'EVENT'},
		0x52: {txt: 'GROUP'},
		0x53: {txt: 'COMMAND SEGMENT'},
		0x54: {txt: 'DEFERRED VARIABLE PLAY'},
		0x55: {txt: 'RECORD STROBE VARIABLE'},

		0x7c: {txt: 'WAIT'},
		0x7f: {txt: 'RESUME'},
	},
	0x07: { txt: 'Machine Control Responses',
		// 00-7F MMC Responses (See MMC Documentation)
	},
	0x08: { txt: 'MIDI Tuning Standard (Real Time)',
		0x02: { txt: 'Single Note Tuning Change' },
		0x07: { txt: 'Single Note Tuning Change with Bank Select' },
		0x08: { txt: 'Scale/Octave Tuning, 1 byte format' },
		0x09: { txt: 'Scale/Octave Tuning, 2 byte format' },
	},
	0x09: { txt: 'Controller Destination Setting', // (See GM2 Documentation)
		0x01: { txt: 'Channel Pressure (Aftertouch)' },
		0x02: { txt: 'Polyphonic Key Pressure (Aftertouch)' },
		0x03: { txt: 'Controller (Control Change)' },
	},
	0x0A: { txt: 'Key-based Instrument Control',
		0x01: { txt: 'Key-based Instrument Control' }
	},
	0x0B: { txt: 'Scalable Polyphony MIDI MIP Message',
		0x01: { txt: 'Scalable Polyphony MIDI MIP Message' }
	},
	0x0C: { txt: 'Mobile Phone Control Message',
		0x00: { txt: 'Mobile Phone Control Message' }
	},
	0x7f: { txt: 'TODO 7F', // when ardour cursor moved
		0x01: { txt:'TODO 01 TC?' }
		//
	},
  }
}
// fill in data
/*
for(let i=0x00; i < 0x80; i++) {
	// sx
	id[0x7e][0x0C][i] = { txt: 'VC #' + i }
	id[0x7e][0x0D][i] = { txt: 'CI #' + i }
	// rt
	id[0x7f][0x06][i] = { txt: 'MCC #' + i }
	id[0x7f][0x07][i] = { txt: 'MCR #' + i }
}
for(let i=0x01; i < 0x80; i++) {
	// rt count from 1
	id[0x7f][0x02][i] = { txt: 'SC #' + i }
}



const sx = {

  0x7e: { //txt: 'Non-Real Time',
  // 0x00: { txt: 'Unused' },
	0x01: { txt: 'Sample Dump Header' },
	0x02: { txt: 'Sample Data Packet' },
	0x03: { txt: 'Sample Dump Request' },
	0x04: { txt: 'MIDI Time Code' },
	0x05: { txt: 'Sample Dump Extensions' },
	0x06: { txt: 'General Information' },
	0x07: { txt: 'File Dump' },
	0x08: { txt: 'MIDI Tuning Standard (Non-Real Time)' },
	0x09: { txt: 'General MIDI' },
	0x0A: { txt: 'Downloadable Sounds' },
	0x0B: { txt: 'File Reference Message' },
	0x0C: { txt: 'MIDI Visual Control' },
	0x0D: { txt: 'MIDI Capability Inquiry' },
  },
  0x7f: { //txt: 'Real Time',
  	// 0x00: { txt: 'Unused' },
	0x01: { txt: 'MIDI Time Code' },
	0x02: { txt: 'MIDI Show Control' },
	0x03: { txt: 'Notation Information' },
	0x04: { txt: 'Device Control' },
	0x05: { txt: 'Real Time MTC Cueing' },
	0x06: { txt: 'MIDI Machine Control Commands' },
	0x07: { txt: 'Machine Control Responses' },
	0x08: { txt: 'MIDI Tuning Standard (Real Time)' },
	0x09: { txt: 'Controller Destination Setting' },
	0x0A: { txt: 'Key-based Instrument Control' },
	0x0B: { txt: 'Scalable Polyphony MIDI MIP Message' },
	0x0C: { txt: 'Mobile Phone Control Message' }
  }
}
*/
const sxs = {
  // SysEx'es ny id
  id: id,

  // RT Frame fps map, Full Message - (10 bytes) F0 7F <device ID> 01 <sub-ID 2> hr mn sc fr F7
  fps: { // hours and type byte 5: 0 yy zzzzz, yy = fps
	0: '24 Frames/Second',
	1: '25 Frames/Second',
	2: '30 Frames/Second (drop frame)',
	3: '30 Frames/Second (non-drop frame)',
  },
  type: { // needed?
  // Real Time
  /*
		04	nn	Device Control
		01	 	Master Volume
		02	 	Master Balance
		03	 	Master Fine Tuning
		04	 	Master Coarse Tuning
		05	 	Global Parameter Control

		0xF0  SysEx
		0x7F  Realtime
		0x7F  The SysEx channel. Could be from 0x00 to 0x7F. Here we set it to "disregard channel".
		0x04  Sub-ID -- Device Control
		0x01  Sub-ID2 -- Master Volume
		0xLL  Bits 0 to 6 of a 14-bit volume
		0xMM  Bits 7 to 13 of a 14-bit volume
		0xF7  End of SysEx
	*/
	volume: [0xf0, 0x7f, 0xff, 0x04, 0x01, 0xff, 0xff, 0xf7],
	balance: [0xf0, 0x7f, 0xff, 0x04, 0x02, 0xff, 0xff, 0xf7]
  }
}
export default sxs //{ sxs, sx, id }

/** https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages


MIDI 1.0 Universal System Exclusive Messages
The following table lists all currently defined MIDI 1.0 Universal System Exclusive Messages.
Universal System Exclusive Messages are defined as Real Time or Non-Real Time,
and are used for extensions to MIDI that are NOT intended to be manufacturer exclusive (despite the name).

@TODO Many of these messages are defined in Specifications and Recommended Practice documentation that is available on this web site.

@TODO WARNING! Details about implementing these messages can dramatically impact compatibility with other products. We strongly recommend consulting the appropriate MMA Specification
or Recommended Practice for additional information.

Table 4: Defined Universal System Exclusive Messages
Non-Real Time (7EH)	 	 
SUB-ID #1	SUB-ID #2	
DESCRIPTION

00	 	Unused
01	 	
Sample Dump Header

02	 	
Sample Data Packet

03	 	
Sample Dump Request

04	nn	MIDI Time Code
 	00	 	Special
 	01	 	Punch In Points
 	02	 	Punch Out Points
 	03	 	Delete Punch In Point
 	04	 	Delete Punch Out Point
 	05	 	Event Start Point
 	06	 	Event Stop Point
 	07	 	Event Start Points with additional info.
 	08	 	Event Stop Points with additional info.
 	09	 	Delete Event Start Point
 	0A	 	Delete Event Stop Point
 	0B	 	Cue Points
 	0C	 	Cue Points with additional info.
 	0D	 	Delete Cue Point
 	0E	 	Event Name in additional info.
05	nn	Sample Dump Extensions
 	01	 	Loop Points Transmission
 	02	 	Loop Points Request
 	03	 	Sample Name Transmission
 	04	 	Sample Name Request
 	05	 	Extended Dump Header
 	06	 	Extended Loop Points Transmission
 	07	 	Extended Loop Points Request
06	nn	General Information
 	01	 	Identity Request
 	02	 	Identity Reply
07	nn	File Dump
 	01	 	Header
 	02	 	Data Packet
 	03	 	Request
08	nn	MIDI Tuning Standard (Non-Real Time)
 	00	 	Bulk Dump Request
 	01	 	Bulk Dump Reply
 	03	 	Tuning Dump Request
 	04	 	Key-Based Tuning Dump
 	05	 	Scale/Octave Tuning Dump, 1 byte format
 	06	 	Scale/Octave Tuning Dump, 2 byte format
 	07	 	Single Note Tuning Change with Bank Select
 	08	 	Scale/Octave Tuning, 1 byte format
 	09	 	Scale/Octave Tuning, 2 byte format
09	nn	General MIDI
 	01	 	General MIDI 1 System On
 	02	 	General MIDI System Off
 	03	 	General MIDI 2 System On
0A	nn	Downloadable Sounds
 	01	 	Turn DLS On
 	02	 	Turn DLS Off
 	03	 	Turn DLS Voice Allocation Off
 	04	 	Turn DLS Voice Allocation On
0B	nn	File Reference Message
 	00	 	reserved (do not use)
 	01	 	Open File
 	02	 	Select or Reselect Contents
 	03	 	Open File and Select Contents
 	04	 	Close File
 	05-7F	 	reserved (do not use)
0C	nn	MIDI Visual Control
 	00-7F	 	MVC Commands (See MVC Documentation)
0D	nn	MIDI Capability Inquiry
 	00-7F	 	 Inquiry/Response Messages (See Documentation)
7B	--	End of File
7C	--	Wait
7D	--	Cancel
7E	--	NAK
7F	--	ACK
 	 	 	 
Real Time (7FH)	 	 
SUB-ID #1	SUB-ID #2	
DESCRIPTION

00	--	Unused
01	nn	MIDI Time Code
 	01	 	Full Message
 	02	 	User Bits
02	nn	MIDI Show Control
 	00	 	MSC Extensions
 	01-7F	 	MSC Commands (see MSC Documentation)
03	nn	Notation Information
 	01	 	Bar Number
 	02	 	Time Signature (Immediate)
 	42	 	Time Signature (Delayed)
04	nn	Device Control
 	01	 	Master Volume
 	02	 	Master Balance
 	03	 	Master Fine Tuning
 	04	 	Master Coarse Tuning
 	05	 	Global Parameter Control
05	nn	Real Time MTC Cueing
 	00	 	Special
 	01	 	Punch In Points
 	02	 	Punch Out Points
 	03	 	(Reserved)
 	04	 	(Reserved)
 	05	 	Event Start points
 	06	 	Event Stop points
 	07	 	Event Start points with additional info.
 	08	 	Event Stop points with additional info.
 	09	 	(Reserved)
 	0A	 	(Reserved)
 	0B	 	Cue points
 	0C	 	Cue points with additional info.
 	0D	 	(Reserved)
 	0E	 	Event Name in additional info.
06	nn	MIDI Machine Control Commands
 	00-7F	 	MMC Commands (See MMC Documentation)
07	nn	MIDI Machine Control Responses
 	00-7F	 	MMC Responses (See MMC Documentation)
08	nn	MIDI Tuning Standard (Real Time)
 	02	 	Single Note Tuning Change
 	07	 	Single Note Tuning Change with Bank Select
 	08	 	Scale/Octave Tuning, 1 byte format
 	09	 	Scale/Octave Tuning, 2 byte format
09	nn	Controller Destination Setting (See GM2 Documentation)
 	01	 	Channel Pressure (Aftertouch)
 	02	 	Polyphonic Key Pressure (Aftertouch)
 	03	 	Controller (Control Change)
0A	01	Key-based Instrument Control
0B	01	Scalable Polyphony MIDI MIP Message
0C	00	Mobile Phone Control Message
 	 	 	 
*/
