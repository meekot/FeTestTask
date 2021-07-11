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
            @click="openProductModalForm"
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
    <product-modal-form ref="productModalForm" />
  </div>
</template>
<script>
import productStore from './productStore'

import ProductDataTable from './components/ProductDataTable.vue'
import ProductModalForm from './components/ProductModalForm.vue'
export default {
  name: 'App',
  components: {
    ProductDataTable,
    ProductModalForm
  },
  methods: {
    openProductModalForm () {
      this.$refs.productModalForm.show()
    }
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
