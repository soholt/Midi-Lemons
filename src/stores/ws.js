/**
 * MiniDexed-Lemons - midi controller for MiniDexed
 * © 2024 Gintaras Valatka
 * 
 *  Store ws.js WebSocket
 * 
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWSStore = defineStore('ws', () => {
  /*
    0	CONNECTING	Socket has been created. The connection is not yet open.
    1	OPEN	The connection is open and ready to communicate.
    2	CLOSING	The connection is in the process of closing.
    3	CLOSED	The connection is closed or couldn't be opened.
  */
  const ws = ref({ readyState: 3 })
  const state = ref(3) //computed(() => ws.value.readyState)

  function wsClose(e) {
    console.log('wsClose', e)
    state.value = 3
  }
  function wsOpen(e) {
    console.warn('wsOpen', e)
    state.value = 1
  }
  function wsError(e) {
    console.error('wsError', e)
    //state.value = 1
  }
  /**
   * Connect
   */
  function open(path) {
    //console.log("window.location.hostname", hostname)
    ws.value = new WebSocket(path)
    //console.log("ws.value", ws.value)
    ws.value.open = wsOpen
    state.value = 1
    ws.value.onmessage = (event) => {
      // Vue data binding means you don't need any extra work to
      // update your UI. Just set the `time` and Vue will automatically
      // update the `<h2>`.
      // this.time = event.data;

      console.log('--> RX socket', event.data)
    }
    ws.value.close = wsClose
    ws.value.error = wsError
    //console.log('socket connect', socket.value)
  }

  function send(dat) {
    if (ws.value.readyState && ws.value.readyState === 1) {
      //  && ws.value.send
      ws.value.send(dat)
      //console.log('socket TX', dat)
    } else {
      console.warn('ws is not connected')
    }
  }

  function close() {
    ws.value.close()
  }

  return { ws, open, send, close, state }
})
