
import { default as lemons } from './lemons/routes.js'
import { default as diy } from './diy/routes.js'
import { default as behringer } from './behringer/routes.js'
import { default as yamaha } from './yamaha/routes.js'

const routes = {/*
  home: {
    vendor: {
      id: 0x00, // from sttore/maps/manufacturers; 0x00 if unknown
      txt: 'Home',
      name: 'home', // url name
      path: '/',
      view: '../views/MidiLemons.vue'
    },
    instruments: {}
  },*/
  lemons: lemons,
  diy: diy,
  behringer:behringer,
  //roland: roland,
  yamaha: yamaha,
  //brand: brand
}
//console.log('routes', routes)
export default routes
