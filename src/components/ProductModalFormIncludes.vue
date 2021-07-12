<template>
  <div v-if="ready">
    <div class="form-group">
      <label>Include type:</label>
      <app-dual-list-box
        :list="productListToInclude"
        :listSelected="productListIncluded"
        :elementKeyName="elementKeyName"
        :optionLabelFn="optionLabelFn"
        :filterFn="filterFn"
        @add="addIncludedProducts($event, 'INCLUDE')"
        @remove="removeIncludedProducts"
      />
    </div>
    <div class="form-group">
      <label>Pass type:</label>
      <app-dual-list-box
        :list="productListToInclude"
        :listSelected="productListPassed"
        :elementKeyName="elementKeyName"
        :optionLabelFn="optionLabelFn"
        :filterFn="filterFn"
        @add="addIncludedProducts($event, 'PASS')"
        @remove="removeIncludedProducts"
      />
    </div>
  </div>
</template>

<script>
import AppDualListBox from './appDualListBox.vue'

import productStore from '../productStore'

export default {
  name: 'ProductFormIncludes',
  components: {
    AppDualListBox 
  },
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      includesList: [],
      elementKeyName: 'id',
      filterFn: (product, filterRegexp) => product.name.search(filterRegexp) !== -1 || product.sku.search(filterRegexp) !== -1,
      optionLabelFn: (product) => product.name + ' ('+ product.sku +')' 
    }
  },
  computed: {
    productList () {
      return productStore.$data.productList
    },
    ready () {
      return productStore.$data.ready
    },
    productListToInclude () {
      return this.productList.filter((p) =>  !this.productListPassed.find(_p => _p.id === p.id) && !this.productListIncluded.find(_p => _p.id === p.id))
    },
    productListIncluded () {
      const filtred = this.includesList.filter(p => p.type === 'INCLUDE')
      return filtred.map(el => this.productList.find(p => p.id === el.connectedProduct.id))
    },
    productListPassed () {
      const filtred = this.includesList.filter(p => p.type === 'PASS')
      return filtred.map(el => this.productList.find(p => p.id === el.connectedProduct.id))
    },
  },
  methods: {
    addIncludedProducts (productList, type) {
      productList.forEach(p => {
        this.includesList.push({
          type,
          connectedProduct: {
            id: p.id
          }
        })
      });
    },
    removeIncludedProducts (productList) {
      this.includesList = this.includesList
        .filter((p) => !productList.find(_p => p.connectedProduct.id === _p.id))
    },
  },
  mounted () {
    this.includesList = [...this.value],
    this.$watch('includesList', (value) => {
      this.$emit('input', value)
    })
  }
}
</script>

<style>

</style>