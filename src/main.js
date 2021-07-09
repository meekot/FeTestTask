import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import { ToastPlugin, SpinnerPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ToastPlugin)
Vue.use(SpinnerPlugin)

Vue.mixin({
  methods: {
    $showBsToastError (message) {
      if (!this.$bvToast) {
        throw new Error('BootstrapVue Toast not fined')
      }
      this.$bvToast
        .toast(
          this.$createElement(
            'div',
            [
              message + " ", 
              this.$createElement('a', {class: 'link', domProps: {href: '.'}}, 'Reload page')
            ]
          ),
          {
            title: "Error", 
            variant: "danger",
            noAutoHide: true,
            toaster: 'b-toaster-top-full'

          }
        )
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
