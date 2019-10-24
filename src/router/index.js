// import Vue from 'vue'
// import Router from 'vue-router'
// import Chat from '@/components/Chat'

// Vue.use(Router)
// // moduleのindexを参照している可能性あり

// export default new Router ({
//     routes: [
//         // 配列の中にオブジェクトを設定して、パスと名前付きルート、呼び出すコンポーネントを指定する
//         {
//             path: '/',
//             name: 'Chat',
//             component: Chat
//         }
//     ]
// })

// indexにRouter設定の記述も行っていく。


import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    }
  ]
})