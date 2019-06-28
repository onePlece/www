import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/Home'
import apponintDoctor from '@/pages/appointments/apponintDoctor'
import appDocOrder from '@/pages/appointments/appDocorder'
import apponintDoctorh from '@/pages/apponintReff'
import tellPhone from '@/pages/tellePhone'
import operAtion from '@/pages/operAtion'
import moVie from '@/pages/moVie'
import consuLtation from '@/pages/consuLtation'
import hosPital from '@/pages/hospital/hosPital'
import hosPitalDetail from '@/pages/hospital/hosPitalDetail'
import Mall from '@/pages/Mall.vue'
import About from '@/pages/About.vue'
import Login from '@/pages/Login'
import Regester from '@/pages/regester'
import Forget from '@/pages/forget'
import Mine from '@/pages/mine/mine'
import minMessage from '@/pages/mine/minChildren/minMessage'
import minNum from '@/pages/mine/minChildren/minNum'
import minSet from '@/pages/mine/minChildren/minNumChild/minset'
import minPas from '@/pages/mine/minChildren/minNumChild/minpas'
import minImg from '@/pages/mine/minChildren/minNumChild/minimg'
import minAcc from '@/pages/mine/minChildren/minAcc'
import minHea from '@/pages/mine/minChildren/minHea'
import minOrder from '@/pages/mine/minChildren/minOrder'
import minOrderOne from '@/pages/mine/minChildren/minOrderChild/minOrderOne'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/apponintDoctor',
      name: 'apponintDoctor',
      component: apponintDoctor
    },
    {
      path: '/appDocOrder/:id',
      name: 'appDocOrder',
      component: appDocOrder
    },
    {
      path: '/apponintDoctorh',
      name: 'apponintDoctorh',
      component: apponintDoctorh
    },
    {
      path: '/tellPhone',
      name: 'tellPhone',
      component: tellPhone
    },
    {
      path: '/operAtion',
      name: 'operAtion',
      component: operAtion
    },
    {
      path: '/movie',
      name: 'movie',
      component: moVie
    },
    {
      path: '/consultation',
      name: 'consuLtation',
      component: consuLtation
    },
    {
      path: '/hospital',
      name: 'hosPital',
      component: hosPital
    },
    {
      path: '/hospital/hosPitalDetail/:hid',
      name: 'hosPitalDetail',
      component: hosPitalDetail
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regester',
      name: 'Regester',
      component: Regester
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/mine',
      component: Mine,
      children: [
        {
          path: '',
          component: minOrder
        },
        {
          path: 'minorder',
          component: minOrder,
          children: [
            {
              path: 'minorderone',
              component: minOrderOne
            }
          ]
        },
        {
          path: 'message',
          component: minMessage
        },
        {
          path: 'minnum',
          component: minNum,
          children: [
            {
              path: '',
              component: minSet
            },
            {
              path: 'minset',
              component: minSet
            },
            {
              path: 'minpas',
              component: minPas
            },
            {
              path: 'minimg',
              component: minImg
            }
          ]
        },
        {
          path: 'minacc',
          component: minAcc
        },
        {
          path: 'minhea',
          component: minHea
        }
      ]
    }
  ]
})
