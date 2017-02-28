<template>
  <div>
    <a href="#"
      v-for="color in availableColors"
      :value="color.value"
      :style="'background-color: '+color.value"
      @click="updateColor(layername, color.value)"
      >
      &nbsp;
    </a>
  </div>
</template>

</template>

<script>
  export default {
    props: ["layername"],
    data () {
      return {
        availableColors: availableColors
      }
    },
    methods: {
      updateColor (layer, color) {
        const payload = {layer, color};
        this.$store.commit('SET_EARRING_LAYER_COLOR', payload);
      }
    }
  }
</script>
