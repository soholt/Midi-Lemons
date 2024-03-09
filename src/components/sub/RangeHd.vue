<script setup>
import { ref } from 'vue'
import fn from '../../stores/fn.js';

/**
 * @TODO datalist
 */
const props = defineProps({
  /**
   * @param {String} id Html element id
   */
  id: {
    type: String,
    required: true
  },
  /**
   * @param {Number} v param v=value
   */
  ch: {
    type: Number,
    required: false,
    default: -1
  },

  /**
   * @param {Number} v param v=value
   */
  v: {
    type: Object,
    required: false
  },

  /**
   * @param {Number} k param k=key
   */
  k: {
    type: Number,
    required: false
  },

  /**
   * @param {Object} p param p=properties
   */
  p: {
    // param props
    type: Object,
    required: true
  },

  /**
   * @param {Function} f function to call on param change
   */
  f: {
    type: Function,
    required: true
  },
  mouseup: {
    type: Function,
    required: false,
    default: () => {}
  },

  /**
   * @param {Object} o Extra o=options: styles, orientations etc
   */
  o: {
    type: Object,
    required: false,
    default: () => ({ style: '', orient: 'horizontal' })
  },
  /**
   * @param {Number} s step param for range, 128=only msb changes, 64=increase the resolution etc, 1 = 1:1
   */
  s: {
    type: Number,
    required: false,
    default: 1
  },
  debug: {
    type: Boolean,
    required: false,
    default: false
  }
})

//ccMap[i] = { cc: __cc, name: name, min:0, max:127, def:0, meta: d }
//console.log('props',props.v)

/**
 * Rst(e)
 * Reset param to default value
 * @param {Event} e target.value
 * @TODO on double click
 */
function Rst(e) {
  //e.target.value = props.o.def
  //props.f(e)
}

/**
 * Inc(e)
 * Increment param value by 1
 * @param {Event} e target.value
 */
function Inc(e) {
  //if (e.target.max > props.o.val) {
  e.target.value++
  Hd(e)
  //}
}

/**
 * Dec(e)
 * Decrement param value by 1
 * @param {Event} e target.value
 */
function Dec(e) {
  //if (e.target.min < props.o.val) {
  e.target.value--
  Hd(e)
  //}
}

/**
 * Wheel to Inc/Dec param value
 * @param {Event} e target.value
 */
function Wheel(e) {
  e.preventDefault()
  e.deltaY > 0 ? Dec(e) : Inc(e)
}

//const prop = { txt: 'param', name: 'cc', min: 0, max: 127, def: 0, type: 'range', show: true }

// 14 bit
const hd = ref({ msb: 100, lsb: 0, sum: 12800, key: props.k })

// Load defaults
hd.value.msb = props.p.msb.def
hd.value.lsb = props.p.lsb.def
hd.value.sum = (props.p.msb.def * (props.p.lsb.max + 1)) + props.p.lsb.def
//const sumDef = (props.p.msb.def * (props.p.msb.def + 1)) + props.p.lsb.def
const sumMax = (props.p.msb.max * (props.p.lsb.max + 1)) + props.p.lsb.max

console.log('hd', hd.value)

//@TODO move to midi or fn
function Hd(e) {//, msbMax = 0x7F, lsbMax = 0x7F, x = 0x7F + 1
  /*
  const val = parseInt(e.target.value)
  if (e.target.name == 'sum') {
    console.log('sum')
    hd.value.sum = val
    hd.value.msb = Math.floor(hd.value.sum / msbMax)
    hd.value.lsb = val - (hd.value.msb * (lsbMax+1))
  } else if (e.target.name == 'msb') {
    console.log('msb')
    hd.value.msb = val
    hd.value.sum = hd.value.msb * x + hd.value.lsb
  } else if (e.target.name == 'lsb') {
    console.log('lsb')
    hd.value.lsb = val
    hd.value.sum = hd.value.msb * x + val
  }
  props.f(hd.value) // send
  //console.log('B14', e.target.id, e.target.value, hd.value)
  */
  //const dat = fn.Hd(e, 0xa0, 0x40)
  const dat = fn.Hd(e, props.p.msb.max, props.p.lsb.max)
  dat.ch = props.ch
  props.f(dat) // send
  //console.log('HD', e.target.id, e.target.value, dat)
}
</script>
<template>
  <div>
    <span  v-if="p.show.txt">{{ p.txt }}<br /></span>
    <span v-if="debug"
      >14Bit ctl demo: MSB, LSB, SUM - coarse, fine, total, TODO UI
      <pre>{{ hd }}</pre>
    </span>
    <span v-if="p.show.msb" class="sliDecontainer">
      <input
        @input="Hd"
        :id="id + 'msb'"
        :list="id + '-msb'"
        name="msb"
        :min="p.msb.min"
        :max="p.msb.max"
        type="range"
        :value="hd.msb"
        style="width: 50%"
        :class="o.style"
        :orient="o.orient"
        @wheel="Wheel"
      />
      <datalist v-if="p.msb.dl != undefined && 'datalist' in p.msb" :id="id + '-msb'">
        <option v-for="(v, k) in p.msb.datalist" :key="k" :value="k" :label="v"></option>
      </datalist>
    </span>
    <span v-if="p.show.lsb" class="sliDecontainer">
      <input
        @input="Hd"
        :id="id + 'lsb'"
        :list="id + '-lsb'"
        name="lsb"
        :min="p.lsb.min"
        :max="p.lsb.max"
        type="range"
        :value="hd.lsb"
        style="width: 50%"
        :class="o.style"
        :orient="o.orient"
        @wheel="Wheel"
      />
      <datalist v-if="p.lsb.dl != undefined && 'datalist' in p.lsb.dl" :id="id + '-lsb'">
        <option v-for="(v, k) in p.lsb.datalist" :key="k" :value="k" :label="v"></option>
      </datalist>
    </span>
    <div v-if="p.show.sum" class="sliDecontainer">
      <input
        @input="Hd"
        :id="id + 'sum'"
        :list="id + '-sum'"
        name="sum"
        :min="p.sum.min"
        :max="sumMax"
        type="range"
        :value="hd.sum"
        style="width: 100%"
        :class="o.style"
        :orient="o.orient"
        :step="s"
        @wheel="Wheel"
        @mouseup="mouseup"
      />
      <datalist v-if="p.sum.dl != undefined && 'datalist' in p.sum.dl" :id="id + '-sum'">
        <option v-for="(v, k) in p.sum.datalist" :key="k" :value="k" :label="v"></option>
      </datalist>
    </div>
  </div>
</template>
