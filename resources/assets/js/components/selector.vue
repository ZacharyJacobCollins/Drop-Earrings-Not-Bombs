<template>
  <div class="form-group">
      <label for="sizes">{{ title }}</label>
      <select class="form-control">
        <!-- TODO --> 
        <option v-for="item in available" :value="item" @click="">{{ item.value }}</option>
      </select>
  </div>
</template>

<script>
export default {
  props: ['available', 'title'],
}
</script>
