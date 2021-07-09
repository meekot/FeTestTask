<template>
  <div id="app">
    <div class="container">
      <div class="row my-4">
        <div class="col-6">
          <h3>Product List</h3>
        </div>
        <div class="col-6">
          <button 
            type="button" 
            class="btn btn-primary float-right"
          >
          Add new product
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <product-data-table />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productStore from './productStore'

import ProductDataTable from './components/ProductDataTable.vue'
export default {
  name: 'App',
  components: {
    ProductDataTable
  },
  created () {
    productStore.loadProductList()
    .catch((e) => {
      this.$showBsToastError("Products have not been loaded.")
      throw new Error(e)
    })
  }
}
</script>

<style>
