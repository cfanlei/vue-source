
/**
 * Actual demo
 */
 let Comp= Vue.component('comp',{
  template:`<div><div v-for="i in 10">{{name}}:i<span>我的</span></div></div>`,
  data(){
    return {
      name:'sssss'
    }
  }
})
let App= Vue.component('App',{
  template:`<comp></comp>`,
  components:{
    Comp
  },
  data(){
    return {
      name:'sssss'
    }
  }
})
// new Vue({
//   el: '#demo',
//   render:h => h(App)
// })
new Vue({
  el: "#demo",
  render:(h)=>{
    return h('div',{
      cData: "wocfanlei"
    })
  },
  data:{
    name:"cfanlei"
  }
})
