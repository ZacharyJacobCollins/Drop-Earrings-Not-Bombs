<template>
  <div>
    <a href="#"
      v-for="avail in availableColors"
      :value="avail.colors"
      :style="'background-color: '+avail.colors"
      @click="updateColor(layername, avail.colors)"
      >
      &nbsp;
    </a>
  </div>
</template>

</template>

<script>
  export default {
    name: 'colorpicker',
    props: ["layername"],
    data () {
      return {
        availableColors: []
      }
    },
    methods: {
      updateColor (layer, color) {
        const payload = {layer, color};
        this.$store.commit('SET_EARRING_LAYER_COLOR', payload);
      },
      fetchColors() {
        let that = this;
        $.ajax({
          type: "get",
          url: "/custom/earrings/colors",
          success: function(data) {
            console.log('success');
            console.log(data);
            that.availableColors = data;
          },
          fail: function(msg) {
            console.log('fail');
          }
        }); 
      },
    },
    mounted() {
      this.fetchColors();
    }
  }
</script>
