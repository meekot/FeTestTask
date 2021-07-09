<template>
  <b-table
   :busy="loading" 
   :items="productList" 
   :fields="fields"
   striped
  >
    <template #table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle mr-2"/>
        <strong>Loading...</strong>
      </div>
    </template>
    <template #cell(vendorName)="data">
      {{data.item.vendor.name}}
    </template>
  </b-table>
</template>

<script>
import Vue from 'vue'
import { TablePlugin } from 'bootstrap-vue'
Vue.use(TablePlugin)

import productStore from '../productStore'

export default {
  name: 'ProductDataTable',
  data () {
    return {
      fields: ['id', 'sku', 'name', 'type', 'customerType', 'validValue', 'price', 'allowRecharge', 'rechargePrice' ,'vendorName']
    }
  },
  computed: {
    productList() {
      return productStore.$data.productList
    },
    loading () {
      return !productStore.$data.ready
    }
  }
}
</script>

<style>

</style>