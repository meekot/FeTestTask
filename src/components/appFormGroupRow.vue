<template>
  <div class="form-group row">
    <label :for="id" class="col-sm-3 col-form-label">{{label}}</label>
    <div class="col-sm-9">
      <slot :id="id" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFormGroupRow',
  props: {
    label: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      id: 'input' + this._uid
    }
  }
}
</script>

<style>

</style>