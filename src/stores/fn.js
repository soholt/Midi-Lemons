// for Decode()
/*
import ccs from './maps/ccs'
import sxs from './maps/sxs'
import dev from './maps/dev'
import man from './maps/man'
import note from './maps/note'
*/
/**
 * Various parser functions
 */
const fn = {

  /**
   * Calc Used for Yamaha to check sum
   * @param {Array} a Array to calc check sum on
   * @returns {Number} 2's compliment sum
   */
  Crc: (a) => {
    let sum = 0;
    a.forEach( val => { sum += val })
    const crc = (~sum + 1) & 0x7F
    return crc
  },

  /**
   * 
   * @param {String} path to .json file 
   * @returns 
   */
  GetJson: async function (path) {
    // Files in the public directory are served at the root path.
    // Instead of /public/Midi-Lemons.json, use /Midi-Lemons.json. (x3)
    const response = await fetch(path)
    //console.log('GetJson response /', response)
    console.log('GetJson path', path)
    
    //const jsn = 
    return await response.json()

    //console.log('LoadJson response json /', response)
    //console.log('LoadJson from /', f, jsn.value)
    //return jsn
  },
/* https://stackoverflow.com/questions/45348955/using-await-within-a-promise

return (async (resolve, reject) => {
  const value = await somethingAsynchronous();
  if (value === something) {
    return 'It worked!';
  } else {
    throw 'Nope. Try again.';
  }
})();

return new Promise((resolve, reject) => {
  somethingAsynchronous().then((value) => {
      if (value === something) {
        return resolve('It worked!');
      } else {
        return reject('Nope. Try again.');
      }
  }, (error) => { reject(error); });
});

*/
  Hd: function (e, msbMax = 0x7f, lsbMax = 0x7f) {
    const hd = { msb: 0, lsb: 0, sum: 0 }
    const val = parseInt(e.target.value)
    if (e.target.name == 'sum') {
      //console.log('sum')
      hd.sum = val
      hd.msb = Math.floor(hd.sum / (lsbMax + 1))
      hd.lsb = val - hd.msb * (lsbMax + 1)
    } else if (e.target.name == 'msb') {
      //console.log('msb')
      hd.msb = val
      hd.sum = hd.msb * (lsbMax + 1) + hd.lsb
    } else if (e.target.name == 'lsb') {
      //console.log('lsb')
      hd.lsb = val
      hd.sum = hd.msb * (lsbMax + 1) + val
    }
    console.log('fn.Hd', msbMax, e.target.id, e.target.value, hd)
    return hd
  },
/*
  Hex: function (i) {
    //enc =
    //if number
    return i.toString(16).padStart(2, 0)
    //return Number(i).toString(16).padStart(2, 0)

    // if array
    // retrun array
  },
*/
  Notes: function (a) {
    //console.log('Generate notes to Id from', a)
    const notes = []
    let octv = 0
    for (octv; octv < 10; octv++) {
      let note = 0
      for (note; note < a.length; note++) {
        notes[octv * a.length + note] = { n: a[note], o: octv }
      }
    }
    // +7 more 121, 122 etc to 127
    for (let i = 120; i < 0x80; i++) {
      notes[i] = { n: a[i - 120], o: octv }
    }
    return notes
  },

  /**
   * Convert array of midi data from DEC to array of HEX strings, use in tools, debug
   * Implode a.toString(' ') by space to create VoiceData for DX7 performance.ini
   * @param {Array} a midi data array
   * @returns {String} array of HEX strings
   */
  //DecToHexString: function(a) { return a.map((d) => d.toString(16).padStart(2, '0')).join(' ').toUpperCase() },
  /**
   * Convert array of midi data from DEC to array of HEX strings, use in tools, debug
   * Implode a.toString(' ') by space to create VoiceData for DX7 performance.ini
   * @param {Array} a midi data array
   * @returns {Array} array of HEX strings
   */
  //DecToHexStringArray: function(a) { return a.map((d) => d.toString(16).padStart(2, '0')) },
  /**
   * Convert array of HEX strings to midi data DEC array
   * @param {Array} a midi data array
   * @returns {Array} array of HEX strings
   */
  //HexStringArrayToDec: function(a) { return a.map((d) => parseInt(d, 16)) },
  /*
  ParseMidiFile: function (f) {
    console.log('ParseMidiFile', f)
    return f
  }
  */
}
export default fn
