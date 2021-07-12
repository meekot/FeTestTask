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
      <product-modal-form-includes 
        v-model="product.includes"
      />
    </form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { ModalPlugin } from 'bootstrap-vue'
import AppFormGroupRow from './appFormGroupRow.vue'

import productStore from '../productStore'

Vue.use(ModalPlugin)

import { download } from '../utils/helpers'
import ProductModalFormIncludes from './ProductModalFormIncludes.vue'


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
    ProductModalFormIncludes
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
  methods: {
    show () {
      this.$bvModal.show(this.modalId)
    },
    saveProduct (e) {
      e.preventDefault()
      this.product.id = productStore.getLastProductId()  + 1
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