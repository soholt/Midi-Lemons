const BehringerGmbH = () => import('./BehringerGmbH.vue')
const DDX3216 = () => import('./ddx3216/DDX3216.vue')

export default [
  {
    path: '/midi/behringer',
    component: BehringerGmbH,
    name: 'behringer',
    children: [{ path: 'ddx3216', component: DDX3216, name: 'ddx3216', meta: { txt: 'DDX3216' } }]
  },
  { path: '/midi/behringer/ddx3216', component: DDX3216, name: 'ddx3216', meta: { txt: 'DDX3216' } }
]
