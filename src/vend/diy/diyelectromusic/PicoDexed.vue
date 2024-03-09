<script setup>
import DX7 from '@midi/vend/yamaha/dx7/DX7.vue'
import { useMidiStore } from '@midi/stores/midi'
const midi = useMidiStore()
</script>

<template>
  <h3>
    -- PicoDexed -- <a href="https://github.com/diyelectromusic/picodexed" target="_blank">https://github.com/diyelectromusic/picodexed</a> --
    Blog -- <a href="https://diyelectromusic.wordpress.com/2024/01/09/raspberry-pi-pico-synth_dexed/" target="_blank">https://diyelectromusic.wordpress.com/2024/01/09/raspberry-pi-pico-synth_dexed/</a> --
  </h3>
  <DX7 :ch="midi.ses.ch" />
</template>
