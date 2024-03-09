const LeMons = () => import('./LeMons.vue')
const CCS = () => import('./cc/CCS.vue')
const SXS = () => import('./sx/SXS.vue')
const TooLs = () => import('./tools/TooLs.vue')

export default [
  {
    path: '/midi/lemons',
    component: LeMons,
    name: 'lemons',
    children: [
      //{ path: '', component: LeMons },
      { path: 'cc', component: CCS, name: 'cc', meta: { txt: 'Control Change' } },
      { path: 'sx', component: SXS, name: 'sx', meta: { txt: 'SysEx' } },
      { path: 'tools', component: TooLs, name: 'tools', meta: { txt: 'Tools' } }
    ]
  },
  { path: '/midi/lemons/cc', component: CCS, name: 'cc', meta: { txt: 'Control Change' } },
  { path: '/midi/lemons/sx', component: SXS, name: 'sx', meta: { txt: 'SysEx' } },
  { path: '/midi/lemons/tools', component: TooLs, name: 'tools', meta: { txt: 'Tools' } }
]
