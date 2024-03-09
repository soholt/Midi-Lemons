# Midi-Lemons

## a MIDI tool box for artists and developers

## in Preview..
#### Many things to be decided and many things will change..

## Play: try it live @ https://soho.lt/midi

### Available
* midi.Tx() - send MIDI msg, will not change
* Session to store 16 MIDI CHs cc and other params (todo save/load)
* History by TX/RX :: MIDI CH :: at, cc, pc, pb, sx, notes - Grab sent/received notes etc per MIDI CH (needs beutification)
* Keyboard keys 1-8 switches MIDI Ch (back tick - ch 16 (left to 1)); Space toggles Play/Stop (@TODO arrow keys, home, end, piano); recommend more
* Decode MIDI msgs, includes manufacturers db

### In Porgress
* components will change, but basic CC will remain
* Completing SysEx rt & non-rt mapping
* Implement SysEx rt & non-rt msgs
* Fix broken tc

### Roadmap
* Docs
* Save/load session
* Set defaults: download session and config in .json to /midi folder(/public/midi if developing), so it can be loaded on refresh
* CSS knobs, knobs everywhere
* Parsing midi files
* Timeline

## Dev & Play:
* Install Nodejs 18+ and npm; run ./gen_ssl_cert.sh to generate certificates 
* ./dev to tinker
* ./build to build minified without comments, console.log(s) (/dist folder)
* ./preview to preview build (/dist folder)

If making your own device, please visit https://github.com/soholt/Unofficial-SysEx-id-registry-for-makers

### Naming and counting to remeber forever:
* function AnExample() {}
* const/var anExample = {}
* html id="an-example"
* views/components AnExample.vue - must contain min two capital letters
* all MIDI CHs, banks, voices etc count from 0, 0 = Midi Ch 1, (only when displayed + 1)
---

### Keywords to remeber forever:
* at - After Touch
* cc - Control change, (ccs - as in plural = array of cc params)
* pb - Pitch Bend
* pc - Program Change
* sx - SysEx
    * nrt- SysEx, non real time (sxs - as in plural = array of SysEx params)
    * rt - SysEx, real time (sxs - as in plural = array of SysEx params)
* tc - Time Code
* ts - Time Stamp
* tp - Trans Port
* a = array; o = object; s = string; i = number; k - key; v - value; m = nixed; f = function

### Built using Vue Store+Router (no external dependancies)
* The app does not load everything, the router loads only the parts required, the more you browse, the more ram lemons will use(*Currently not the case, need to sor out and reconfig the router)
* Built with user friendliness in mind,
* Copy src/vend/brand to your name, adapt the js and html to your liking and add your name to src/vend/routes.js
* Example controlls are there for you, ready for copy-pasta
* Eg: To display CC component, import it and set the cc ID <CC :cc="0x07" /> (very cutomizable, CC ctl will not chage, but the insides and the params will change)
* See how components work and read some docs @Vue https://vuejs.org/examples/#form-bindings
* Ref and quick 15 step tutorial https://vuejs.org/tutorial/#step-1
* Store https://pinia.vuejs.org/


Contains 0 Ai and 1 function from stack overflow

WARNING: Use it at your own risk, equipment or any other damages will NOT be accepted, use it at your own risk!
© 2024 Gintaras Valatka All Rights Reserved.

Personal use FREE FOREVER

Continuous paid gig/proguction use - buy a coffee

Anything else, contact

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
