import { createRouter, createWebHistory } from 'vue-router'
import MidiLemons from '../components/MidiLemons.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/midi'
      //path: '/',
      //name: 'home',
      //component: MidiLemons
    },
    {
      path: '/midi',
      name: 'midi',
      component: MidiLemons
    },
    {
      path: '/midi/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
/*
const DIY = () => import('@midi/vend/diy/DIY.vue')
const DINoctopus = () => import('@midi/vend/diy/bjonnh/DINoctopus.vue')
const FirMata = () => import('@midi/vend/diy/firmata/FirMata.vue')
const PicoDexed = () => import('@midi/vend/diy/diyelectromusic/PicoDexed.vue')
const MT32Pi = () => import('@midi/vend/diy/dwhinham/MT32Pi.vue')
const diy = {
  path: '/midi/diy', component: DIY, name: 'diy',
  children: [
    { path: 'dinoctopus', component: DINoctopus, name: 'dinoctopus', meta: { txt: 'DINoctopus' }},
    { path: 'minidexed', component: PicoDexed, name: 'minidexed', meta: { txt: 'MiniDexed' }},
    { path: 'picodexed', component: PicoDexed, name: 'picodexed', meta: { txt: 'PicoDexed' }},
    { path: 'firmata', component: FirMata, name: 'firmata', meta: { txt: 'Firmata' }},
    { path: 'mt32pi', component: MT32Pi, name: 'mt32pi', meta: { txt: 'MT32-Pi' }},
  ]
}
router.addRoute(diy)*/
/**
 * Import and add vendors routes
 */
import { default as routes } from '../vend/routes.js'
//for(let i in routes) { router.addRoute(routes[i]) } // For Objects //console.log('routess.lemons',routes.lemons)
for(let i in routes) { routes[i].map((r) => router.addRoute(r)) } //console.log('routess.lemons',routes.lemons)

//import { default as routesA } from '../vend/diy/routesA.js'
//routesA.map((r) => router.addRoute(r))



//console.log('router.routes',router.getRoutes())

//import routes from '../vend/routes.js'
//const vendors = Object.keys(routes)
//vendors.map((vendor) => routes[vendor].map((r) => router.addRoute(r)))

//router.addRoute(routess.lemons)
/*
addRoute: ƒ addRoute(parentOrRoute, route)
afterEach: ƒ add(handler)
back: () => go(-1)
beforeEach: ƒ add(handler)
beforeResolve: ƒ add(handler)
currentRoute: RefImpl {__v_isShallow: true, dep: Map(30), __v_isRef: true, _rawValue: {…}, _value: {…}}
forward: () => go(1)
getRoutes: ƒ getRoutes()
go: (delta) => routerHistory.go(delta)
hasRoute: ƒ hasRoute(name)
install: install(app) { const router2 = this; app.component("RouterLink", RouterLink); app.component("RouterView", RouterView); app.config.globalProperties.$router = router2; Object.defineProperty(app.config.globalProperties, "$route", { enumerable: true, get: () => {…}
isReady: ƒ isReady()
listening: true
onError: ƒ add(handler)
options: {history: {…}, routes: Array(4)}
push: ƒ push(to)
removeRoute: ƒ removeRoute(name)
replace: ƒ replace(to)
resolve: ƒ resolve(rawLocation, currentLocation)
*/

/**
 * Build routes from configs
 */
/*
import { default as routes } from '../vend/configs.js'

const path = {
  midi: '..' //'../../../Midi-Lemons/src'
}
for(let k in routes) {

  const parent = path.midi + '/vend/' + k + '/'
  const parentView = parent + routes[k].vendor.view*/
  /////////routes[k].vendor.component = () => import(/* @vite-ignore */routes[k].vendor.view)

  //routes[k].vendor.component = () => import(/* @vite-ignore */parentView)
  /*
  routes[k].vendor.name = 'midi-' + routes[k].vendor.name
  routes[k].vendor.path = pre + routes[k].vendor.path
  router.addRoute(routes[k].vendor)
*/
  /**
   * @TODO make children
   */
  /*
  if('devices' in routes[k]) {
    for(let i in routes[k].devices) {
      const child = parent + i + '/' + routes[k].devices[i].view
      //const child = routes[k].vendor.path + '/' + routes[k].devices[i].view
      //console.log('child', routes[k].vendor.name, child)*/
      ////routes[k].devices[i].component = () => import(/* @vite-ignore */routes[k].devices[i].view)
      
      //routes[k].devices[i].component = () => import(/* @vite-ignore */child)
/*
      //routes[k].devices[i].name = k + '-' + routes[k].devices[i].name
      routes[k].devices[i].path = pre + routes[k].devices[i].path
      router.addRoute(routes[k].devices[i])
      //console.log('new routes inst', child)
    }
  }
  //console.log('new routes', parentView, routes[k])
}*/
export default router
