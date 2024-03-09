const YamahaCorporation = () => import('./YamahaCorporation.vue')
const DX7 = () => import('./dx7/DX7.vue')

export default [{
  path: '/midi/yamaha', component: YamahaCorporation, name: 'yamaha',
  children: [
    { path: 'dx7', component: DX7, name: 'dx7', meta: { txt: 'DX7' }},
  ]
},
{ path: '/midi/yamaha/dx7', component: DX7, name: 'dx7', meta: { txt: 'DX7' }},
]
