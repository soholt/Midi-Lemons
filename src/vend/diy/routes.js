const DIY = () => import('./DIY.vue')
const DINoctopus = () => import('./bjonnh/DINoctopus.vue')
const FirMata = () => import('./firmata/FirMata.vue')
//const MiniDexed = () => import('./probonopd/MiniDexed.vue')
const PicoDexed = () => import('./diyelectromusic/PicoDexed.vue')
//const MT32Pi = () => import('./dwhinham/MT32Pi.vue')
/*
import DIY from './DIY.vue'
import DINoctopus from './bjonnh/DINoctopus.vue'
import FirMata from './firmata/FirMata.vue'
import PicoDexed from './diyelectromusic/PicoDexed.vue'
import MT32Pi from './dwhinham/MT32Pi.vue'
*/
export default [
  {
  path: '/midi/diy', component: DIY, name: 'diy',
  children: [
    { path: 'dinoctopus', component: DINoctopus, name: 'dinoctopus', meta: { txt: 'DINoctopus' }},
    //{ path: 'minidexed', component: MiniDexed, name: 'minidexed', meta: { txt: 'MiniDexed' }},
    { path: 'picodexed', component: PicoDexed, name: 'picodexed', meta: { txt: 'PicoDexed' }},
    { path: 'firmata', component: FirMata, name: 'firmata', meta: { txt: 'Firmata' }},
    //{ path: '/midi/diy/mt32pi', component: MT32Pi, name: 'mt32pi', meta: { txt: 'MT32-Pi' }},
  ]},
  // children dont seem fo function.. The above get overwritten, due to having the same name, currently children array is used for making nav buttons
  //{ path: '/midi/diy/', component: DIY, name: 'diy', meta: { txt: 'DIY' } },
  { path: '/midi/diy/dinoctopus', component: DINoctopus, name: 'dinoctopus', meta: { txt: 'DINoctopus' } },
  //{ path: '/midi/diy/minidexed', component: MiniDexed, name: 'minidexed', meta: { txt: 'MiniDexed' } },
  { path: '/midi/diy/picodexed', component: PicoDexed, name: 'picodexed', meta: { txt: 'PicoDexed' } },
  { path: '/midi/diy/firmata', component: FirMata, name: 'firmata', meta: { txt: 'Firmata' } }
  //{ path: '/midi/diy/mt32pi', component: MT32Pi, name: 'mt32pi', meta: { txt: 'MT32-Pi' }},
]
