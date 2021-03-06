import Vue from 'vue'

import { fetchProductList } from "./utils/api"


const store = new Vue({
  data: {
    productList: null,
    ready: false
  },
  methods: {
    async loadProductList () {
      this.ready = false 
      const productList = await fetchProductList()
      this.productList = productList
      this.ready = true
    },
    getLastProductId() {
      return this.productList[this.productList.length-1].id
    }
  }
})


export default store 