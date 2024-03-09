<script setup>
/**
 * @TODO datalist
 */

const props = defineProps({
  /**
   * @param {String} id Html element id
   */
  id: {
    String,
    required: true
  },

  ch: {
    Number,
    required: false,
    default: -1
  },

  /**
   * Value
   * @param {Number} v param v=value
   */
  v: {
    type: Number,
    required: false
  },

  /**
   * Key
   * @param {Number} k param k=key
   */
  k: {
    type: Number,
    required: false
  },

  /**
   * Props
   * @param {Object} p param p=properties
   */
  p: {
    // param props
    type: Object,
    required: true
  },

  /**
   * Function
   * @param {Function} f function to call on param change
   */
  f: {
    type: Function,
    required: true
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
   * array value key
   */
  i: {
    type: Number,
    required: false
  },
  lsb: {
    type: Object,
    required: false,
    default: undefined
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
  e.target.value = props.p.def
  props.f(e)
}

/**
 * Inc(e)
 * Increment param value by 1
 * @param {Event} e target.value
 */
function Inc(e) {
  if (e.target.max > props.v) {
    e.target.value++
    props.f(e)
  }
}

/**
 * Dec(e)
 * Decrement param value by 1
 * @param {Event} e target.value
 */
function Dec(e) {
  if (e.target.min < props.v) {
    e.target.value--
    props.f(e)
  }
}

/**
 * Wheel to Inc/Dec param value
 * @param {Event} e target.value
 */
function Wheel(e) {
  e.preventDefault()
  e.deltaY > 0 ? Dec(e) : Inc(e)
}


//import { useMidiStore } from '../stores/midi'
//const midi = useMidiStore()


//:orient="o.orient"
</script>
<template>
  <!--<span  v-if="o.show">-->
  <div v-if="p.type == 'range'" class="sliDecontainer"><!-- && p.res == 7 to enambe hd+cahnge below p.res == 140 to 14-->
    <label :for="id + k"></label>
    <input
      :list="id + k"
      @input="f"
      :id="id + k"
      :data-ch="ch"
      :data-id="id"
      :data-key="k"
      :min="p.min"
      :max="p.max"
      :type="p.type"
      :name="p.name"
      :value="v"
      :class="o.style"
      @wheel="Wheel"
      :orient="o.orient"
    />
    <!-- @TODO v-if;v-else can be outside the loop, put it in maps/cc.js https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
    <datalist v-if="'datalist' in o" :id="id + k">
      <option v-for="(v,k) in o.datalist" :key="k" :value="k" :label="v"></option>
    </datalist>
  </div>

  <div v-if="p.type == 'range' && p.res == 140 && p.msb === true" class="sliDecontainer">
    <label :for="id + k"></label>
    <input
      :list="id + k"
      @input="f"
      :id="id + k"
      :data-ch="ch"
      :data-id="id"
      :data-key="k"
      :min="p.min"
      :max="p.max"
      :type="p.type"
      :name="p.name"
      :value="v"
      :class="o.style"

      :orient="o.orient"
      @wheel="Wheel"
    />
    <!-- @TODO v-if;v-else can be outside the loop, put it in maps/cc.js https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
    <datalist v-if="'datalist' in o" :id="id + k">
      <option v-for="(v,k) in o.datalist" :key="k" :value="k" :label="v"></option>
    </datalist>

    <span v-if="lsb !== undefined">
      <label :for="id + lsb.id"></label>
      <input
        :list="id + lsb.id"
        @input="f"
        :id="id + lsb.id"
        :data-ch="ch"
        :data-id="id"
        :data-key="lsb.id"
        :min="lsb.min"
        :max="lsb.max"
        :type="lsb.type"
        :name="lsb.name"
        :value="lsb.def"
        @wheel="Wheel"
      /><!-- @TODO value, :class="lsb.o.style"-->
      <!-- @TODO v-if;v-else can be outside the loop, put it in maps/cc.js https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
      <datalist v-if="'datalist' in o" :id="id + lsb.id">
        <option v-for="(v,k) in o.datalist" :key="k" :value="k" :label="v"></option>
      </datalist>
    </span>
  </div>
  <button v-if="p.type == 'button'" class="btn sky" :id="id + k" :data-ch="ch" :data-id="id" :data-key="k" :value="p.min" @click="f" type="button">{{ p.t }}</button>
  <button v-if="p.type == 'checkbox'" class="btn orange" :id="id + k" :data-ch="ch" :data-id="id" :data-key="k" :min="p.min" :max="p.max" :value="p.def" @click="f" :class="v == p.max ? 'on':''">{{ p.t }}</button>
  
  <!--
  <button
    :name="o.txt"
    :value="o.def"
    @click="rst"
    type="button"
    :class="true != o.def ? 'fix btn btn-success' : 'fix btn btn-outline-success'"
  >
  {{ i }}
  </button>
    -->
  <!--
  {{ o.name }}
  </span>
--></template>

<style scoped>
/*
datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 200px;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 200px;
  margin: 0;
}









*/
/*
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: #05051a;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.wrapper {
  position: relative;
  height: 20rem;
  width: 3rem;

  &::before,
  &::after {
    display: block;
    position: absolute;
    z-index: 99;
    color: #fff;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1;
    padding: .75rem 0;
    pointer-events: none;
  }

  &::before {
    content: "+";
  }

  &::after {
    content: "−";
    bottom: 0;
  }
}

input[type="range"] {
  -webkit-appearance: none;
  background-color: rgba(#fff, .2);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 18rem;
  height: 2.5rem;
  transform: translate(-50%, -50%) rotate(-90deg);
  border-radius: 1rem;
  overflow: hidden;
  cursor: row-resize;
  
  &[step]{
    background-color: transparent;
    background-image: repeating-linear-gradient(to right, rgba(#fff, .2), rgba(#fff, .2) calc(12.5% - 1px), #05051a 12.5%);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem rgba(#fff, 0.2);
  }

  &::-moz-range-thumb {
    border: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem rgba(#fff, 0.2);
  }
}
*/
</style>
