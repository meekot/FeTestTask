<template>
  <div class="row">
    <div class="col-md-6">
      <div class="border">
        <input 
          type="text" 
          class="form-control disable-border" 
          placeholder="Search..."
          @input="filterListInput"
        >
        <div class="btn-group w-100" role="group">
          <button 
            type="button" 
            class="btn btn-light disable-border"
            @click="addAll"
          >&gt;&gt;</button>
          <button 
            type="button" 
            class="btn btn-light disable-border"
            @click="add"
          >&gt;</button>
        </div>
        <select 
          v-model="selected"
          multiple="true" 
          class="custom-select disable-border" 
          size="10"
        >
          <option 
            v-for="value in listFiltred" 
            :key="value[elementKeyName]"
            :value="value"
          >
            {{optionLabelFn(value)}}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div class="border">
        <input 
          type="text" 
          class="form-control disable-border" 
          placeholder="Search..."
          @input="filterListSelectedInput"
        >
        <div class="btn-group w-100" role="group">
          <button 
            type="button" 
            class="btn btn-light disable-border"
            @click="remove"  
          >&lt;</button>
          <button 
            type="button" 
            class="btn btn-light disable-border"
            @click="removeAll"
          >&lt;&lt;</button>
        </div>
        <select 
          v-model="selectedSelected"
          multiple="true" 
          class="custom-select disable-border" 
          size="10"
        >
          <option 
            v-for="value in listSelectedFiltred" 
            :key="value[elementKeyName]"
            :value="value"
          >
            {{optionLabelFn(value)}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>


<script>

import {debounce} from '../utils/helpers'

export default {
  name: 'AppDualListBox',
  props: {
    list: {
      required: true,
      type: Array
    },
    listSelected: {
      required: false,
      type: Array,
      default: () => ([])
    },
    elementKeyName: {
      required: true,
      type: String
    },
    optionLabelFn: {
      required: true,
      type: Function
    },
    filterFn: {
      required: true,
      type:Function
    }
  },
  data () {
    return {
      filterStrList: '',
      filterStrListSelected: '',
      selected: [],
      selectedSelected: [],

    }
  },
  computed: {
    listFiltred () {
      const filterStr = this.filterStrList.trim() 
      if (!filterStr) {
        return this.list
      }
      const filterRegexp = new RegExp(filterStr, 'i')
      return this.list.filter((el) => this.filterFn(el, filterRegexp))  
    },
    listSelectedFiltred () {
      const filterStr = this.filterStrListSelected.trim()
      if (!filterStr) {
        return this.listSelected
      }
      const filterRegexp = new RegExp(filterStr, 'i')
      return this.listSelected.filter((el) => this.filterFn(el, filterRegexp))
    }
  },
  methods: {
    filterListInput: debounce(function (e) {
      this.filterStrList = e.target.value 
    }),
    filterListSelectedInput: debounce(function (e) {
      this.filterStrListSelected = e.target.value
    }),
    addAll() {
      this.$emit('add', this.list)
    },
    add() {
      this.$emit('add', this.selected)
    },
    remove () {
      this.$emit('remove', this.selectedSelected)
    },
    removeAll () {
      this.$emit('remove', this.listSelected)
    }
  },
}
</script>
<style scoped>
  .disable-border:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;

  }
  .disable-border {
    border: none !important; 
  }
  .border {
    border: 1px solid #ced4da;
  }
  
</style>