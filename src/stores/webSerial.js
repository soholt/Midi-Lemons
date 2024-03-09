/**
 * MiniDexed-Lemons - midi controller for MiniDexed
 * © 2024 Gintaras Valatka
 * 
 *  Store webSerial.js
 * got to chrome://flags/ and enable 'Experimental JavaScript'
 * @link https://developer.chrome.com/docs/capabilities/serial
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

//import fn from './fn' // Various functions

export const useWebSerialStore = defineStore('webSerial', () => {

  let Rx = function() {}
  function OnRx(f) {
    Rx = f
  }

  // Ib browser supported
  let supported = false
  if ('serial' in navigator) supported = true
  //const ports = ref([{serial:'ports'}])
  const baud = ref(57000)
  const rates = ref([9600, 31250, 57000, 115200])
  const port = ref(-1)
  const ports = ref({})
/*
  const list = ref()

  async function List() {

      list.value = await navigator.serial.getPorts();
      //console.log('List Ports', l)
    
    
    //navigator.serial.getPorts().then((ports) => {
      // Initialize the list of available ports with `ports` on page load.
      console.log('List Ports', list.value)
    //});
  }
  */
  /**
   * @TODO ERRORS to GUI
   */
  //async function _Open(port) {
    
    //const port = await navigator.serial.requestPort();
    // - Wait for the port to open.
    /*
      dataBits: The number of data bits per frame (either 7 or 8).
      stopBits: The number of stop bits at the end of a frame (either 1 or 2).
      parity: The parity mode (either "none", "even" or "odd").
      bufferSize: The size of the read and write buffers that should be created (must be less than 16MB).
      flowControl: The flow control mode (either "none" or "hardware").
    
    try {
    await port.open({ baudRate: 57000 });

    while (port.readable) {
      const reader = port.readable.getReader();
    
      
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            Rx(value)
            console.log(value);
          }
        }
      }
      } catch (error) {
        // TODO: Handle non-fatal read error.
      }
    

    ports.value.push(port)

    console.log('Open port', port, ' ports:',ports.value)*/
  //}

  // Bus 001 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)
  async function Listen(id) {
    
    while (ports.value[id].port.readable) {
      const reader = ports.value[id].port.readable.getReader();
    
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            Rx(Array.from(value))
            

            //console.log('---> Rx WebSerial', value)
            
          }
        }
      } catch (e) {
        console.error('Error reading from port:', port.value, e)
      }
    }
  }
  /**
   * @TODO promise
   * @param {*} e 
   * @returns {Promise}
   */
  async function Open(e={}) {
    //return new Promise((resolve) => {
    // Filter on devices with the Arduino Uno USB Vendor/Product IDs.
    const filters = [
      //{ usbVendorId: 0x2341, usbProductId: 0x0043 },
      //{ usbVendorId: 0x2341, usbProductId: 0x0001 }
      //{ usbVendorId: 0x2341 }
    ];
    try {
      // Prompt user to select an Arduino Uno device.
      const _port = await navigator.serial.requestPort({ filters });

      const { usbProductId, usbVendorId } = _port.getInfo();
      console.log('Select Port', baud.value, _port.getInfo())

      await _port.open({ baudRate: baud.value, bufferSize: 4098 });

      const id = Object.keys(ports.value).length
      ports.value[id] = { port: _port, vend: usbVendorId, prod: usbProductId }
      ports.value[id].port.onconnect = (e) => { console.log('onconnect ', e) }
      ports.value[id].port.ondisconnect = (e) => { Close(e) } // on unplug delete port from ports

      port.value = id
  
      console.log('Open port', port.value, ' ports:',ports.value, e)

      Listen(id)
      return id

    } catch (e) {
      console.warn('Connection failed, use cromium based browser and enable experimental ftrs?', e)
    }
  //})
  }

  async function Close(e={}) {
    const _port = port.value
    //const keys = Object.keys(ports.value)
    try {
      await ports.value[port.value].port.close()
      //if(keys.length == 1) {
        port.value = -1
      //} else if(keys.length > 1) {

      //}
      delete ports.value[_port]
      
      console.log('Close Port:', _port, e) // Event {isTrusted: true, type: 'disconnect', target: SerialPort, currentTarget: null, eventPhase: 0, …}
    } catch (e) {
      //port close failed
    }
    
  }

  async function Send(a) {
    if(port.value == -1) {
      const id = await Open()
      console.log('Send selected',id)
    }
    if(port.value > -1) {
      const writer = ports.value[port.value].port.writable.getWriter();

      const data = new Uint8Array(a); // [104, 101, 108, 108, 111] - hello
      await writer.write(data);

      // Allow the serial port to be closed later.
      writer.releaseLock();
      console.log('<--- Tx WebSerial, port:', port.value, a.map((d) => d.toString(16).padStart(2, '0').toUpperCase()), a)
    }// else {
      //await Open()
      //Send(a)
    //}
  }
/*
  // navigator.userAgent: "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  async function _Listen() {
    if ('serial' in navigator) {
      //const port = await navigator.serial.requestPort();
      // wait for approval, then list ports
      //console.log('wait for approval', port)
      //List()
      // @TODO move to connect
      navigator.serial.addEventListener("onconnect", (e) => {
        // Connect to `e.target` or add it to a list of available ports.
        //List() // refesh ports
        console.log('WebSerial connect:', e)
      });
      navigator.serial.addEventListener("ondisconnect", (e) => {
        // Remove `e.target` from the list of available ports.
        //List() // refesh ports
        console.log('WebSerial disconnect:', e)
      });
      console.log('Listen')
    } else {
      console.log('Web Serial is not supported on your browser')
    }
  }
  //_Listen()
  //console.log('navigator', navigator)
  */
  return { port, ports, open, Open, Close, Send, OnRx, Rx, baud, rates, supported } //, Con, Dis, List
})
