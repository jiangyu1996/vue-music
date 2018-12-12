import Vue from 'vue'
import Router from 'vue-router'


const Recommend = (resolve) => {
  import('components/recommend/Recommend').then((moudle) => {
    resolve(moudle)
  })
}
const Singer = (resolve) => {
  import('components/singer/Singer').then((moudle) => {
    resolve(moudle)
  })
}
const Rank = (resolve) => {
  import('components/rank/Rank').then((moudle) => {
    resolve(moudle)
  })
}
const Search = (resolve) => {
  import('components/search/Search').then((moudle) => {
    resolve(moudle)
  })
}
const SingerDetial= (resolve) => {
  import('components/singer-detial/singer-detial').then((moudle) => {
    resolve(moudle)
  })
}
const Disc = (resolve) => {
  import('components/disc/Disc').then((moudle) => {
    resolve(moudle)
  })
}
const TopList = (resolve) => {
  import('components/top-list/TopList').then((moudle) => {
    resolve(moudle)
  })
}
const UserCenter = (resolve) => {
  import('components/user-center/UserCenter').then((moudle) => {
    resolve(moudle)
  })
}



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/Recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/Singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetial
      }]
    },
    {
      path: '/Rank',
      component: Rank,
      children: [{
        path: ':id',
        component: TopList
      }]
    },
    {
      path: '/Search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetial
      }]
    },
    {
      path: '/User-Center',
      component: UserCenter
    }
  ]
})
