<template>
  <b-modal 
    :id="modalId" 
    size="lg" 
    title="Add new product"
    ok-title="Create"
    @hidden="reset"
    @ok="saveProduct"
  >
    <form>
      <app-form-group-row 
        label="Sku:"
        v-slot="props"
      >
        <input 
          :id="props.id"
          v-model="product.sku"
          type="text" 
          class="form-control" 
        >
      </app-form-group-row>
      <app-form-group-row 
        label="Name:"
        v-slot="props"
      >
        <input 
          :id="props.id"
          v-model="product.name"
          type="text" 
          class="form-control" 
        >
      </app-form-group-row>
      <app-form-group-row 
        label="Type:"
        v-slot="props"
      >
        <select 
          :id="props.id"
          class="custom-select"
          v-model="product.type"
        >
          <option value=''>Open this select menu</option>
          <option 
            v-for="(value, inx) in productTypeSelectOptions" 
            :key="inx"
            :value="value"
          >
            {{value}}
          </option>
        </select>
      </app-form-group-row>
      <app-form-group-row 
        label="Customer Type:"
        v-slot="props"
      >
        <select 
          :id="props.id"
          class="custom-select"
          v-model="product.customerType"
        >
          <option value=''>Open this select menu</option>
          <option 
            v-for="(value, inx) in productCustomerTypeSelectOptions" 
            :key="inx"
            :value="value"
          >
            {{value}}
          </option>
        </select>
      </app-form-group-row>
      <app-form-group-row 
        label="Valid Value:"
        v-slot="props"
      >
        <input 
          :id="props.id"
          v-model="product.validValue"
          :disabled="product.type === 'BASIC_SINGLE'"
          type="text" 
          class="form-control" 
        >
      </app-form-group-row>
      <app-form-group-row 
        label="Price:"
        v-slot="props"
      >
        <input 
          :id="props.id"
          v-model="product.price"
          type="text" 
          class="form-control" 
        >
      </app-form-group-row>
      <div class="form-group row">
        <div class="col">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="allowRecharge" v-model="product.allowRecharge">
            <label class="form-check-label" for="allowRecharge">Allow recharge</label>
          </div>
        </div>
      </div>
      <app-form-group-row 
        label="Recharge price:"
        v-slot="props"
      >
        <input 
          :id="props.id"
          v-model="product.rechargePrice"
          :disabled="!product.allowRecharge"
          type="text" 
          class="form-control" 
        >
      </app-form-group-row>
      <div class="form-group">
        <label>Include type:</label>
        <app-dual-list-box
          v-if="ready"
          :list="productListToInclude"
          :listSelected="productListIncluded"
          :elementKeyName="'id'"
          :optionLabelFn="(product) => product.name + ' ('+ product.sku +')' "
          :filterFn="(product, filterRegexp) => product.name.search(filterRegexp) !== -1 || product.sku.search(filterRegexp) !== -1"
          @add="addIncludedProducts"
          @remove="removeIncludedProducts"
        />
      </div>
      <div class="form-group">
        <label>Pass type:</label>
        <app-dual-list-box
          v-if="ready"
          :list="productListToInclude"
          :listSelected="productListPassed"
          :elementKeyName="'id'"
          :optionLabelFn="(product) => product.name + ' ('+ product.sku +')' "
          :filterFn="(product, filterRegexp) => product.name.search(filterRegexp) !== -1 || product.sku.search(filterRegexp) !== -1"
          @add="addPassedProducts"
          @remove="removeIncludedProducts"
        />
      </div>
    </form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { ModalPlugin } from 'bootstrap-vue'
import AppFormGroupRow from './appFormGroupRow.vue'
import AppDualListBox from './appDualListBox.vue'
Vue.use(ModalPlugin)

import productStore from '../productStore'
import { download } from '../utils/helpers'


const ProductModel = {
  sku: '',
  name: '',
  type: '',
  customerType: '',
  validValue: '',
  price: 0,
  allowRecharge: false,
  rechargePrice: 0,
  includes: [],
}

export default {
  components: { 
    AppFormGroupRow,
    AppDualListBox 
  },
  name: 'ProductModalForm',
  data () {
    return {
      modalId: 'productModalForm',
      product:  JSON.parse(JSON.stringify(ProductModel)),
      productTypeSelectOptions: [
        'BASIC_SINGLE',
        'BASIC_VALID_HOURS',
        'PASS_LIMITED',
        'PASS_UNLIMITED'
      ],
      productCustomerTypeSelectOptions: [
        'ADULT',
        'CHILD'
      ]
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
      const filtred = this.product.includes.filter(p => p.type === 'INCLUDE')
      return filtred.map(el => this.productList.find(p => p.id === el.connectedProduct.id))
    },
    productListPassed () {
      const filtred = this.product.includes.filter(p => p.type === 'PASS')
      return filtred.map(el => this.productList.find(p => p.id === el.connectedProduct.id))
    },
  },
  methods: {
    show () {
      this.$bvModal.show(this.modalId)
    },
    addIncludedProducts (productList) {
      productList.forEach(p => {
        this.product.includes.push({
          type: "INCLUDE",
          connectedProduct: {
            ...p
          }
        })
      });
    },
    removeIncludedProducts (productList) {
      this.product.includes = this.product.includes
        .filter((p) => !productList.find(_p => p.connectedProduct.id === _p.id))
    },
    addPassedProducts (productList) {
      productList.forEach(p => {
        this.product.includes.push({
          type: "PASS",
          connectedProduct: {
            ...p
          }
        })
      });
    },
    saveProduct (e) {
      e.preventDefault()
      this.product.id = this.productList[this.productList.length-1].id + 1
      console.log("ok", this.product)
      download(JSON.stringify(this.product), 'newProduct.txt', 'text/plain')

    },
    reset() {
      this.product = JSON.parse(JSON.stringify(ProductModel))
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>