
/**
 * Actual demo
 */
Vue.config.devtools = true
let rootVue = new Vue({
  el: '#demo',

  data: {
    arrs: "aa"
  },

  created: function () {
    
  },
  methods: {
    pushData: function () {
      this.arrs.push("ccc")
    }
  }
})
