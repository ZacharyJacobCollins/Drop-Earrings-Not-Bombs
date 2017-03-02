<template>
<div class="container">
  <div class="row">
    </div>

     <div class="row">

          <!-- Image row -->
          <div class="col-md-6 earring-display">
            <classic-earring :color="earrings.color"></classic-earring>
          </div>

          <!-- Dropdowns -->
          <div class="col-md-3 creator-inputs">

              <!-- Sizes -->
              <!-- <selector :available="earrings.availableSizes" title="Sizes"></selector> -->

              <!-- Frames -->
              <!-- <selector :available="earrings.availableFrames" title="Frame Color"></selector> -->

              <!-- Styles -->
              <!-- <selector :available="earrings.availableStyles" title="Styles"></selector> -->

              <!-- Colors  -->
              <template v-for="(layer, layerName) in earrings.color">
                <div class="form-group">
                    <label :for="layerName"> Choose a color for {{ layerName }}</label>
                    <colorpicker :layername="layerName"></colorpicker>
                </div>
              </template>

              <!-- Beads -->
              <!-- <selector :model="earrings.bead" :available="earrings.availableBeads" title="Beads"></selector> -->

            </div>
        </div>

        <input type="hidden" :value="earrings"></input>

      </div>
</div>
</template>
<script>
export default {
  name: 'creator',
  data () {
    return {
      items: [],
      shipping: 5.00,
    }
  },
  computed: {
    earrings () {
      return this.$store.state.earrings
    },
    image () {
        //Where selected is an array of the currently selected earring options
        var selected = [];
        selected.push(this.earrings.size);
        return this.earrings.size;
    },
    json () {
      return JSON.stringify(this.data);
    },
    subTotal () {
      var total = 0;
      for(var i=0; i<this.items.length; i++) {
        total += this.items[i].price * this.items[i].quantity;
      }
      return Number(total).toFixed(2);
    },
    total () {
      var total = Number(this.subTotal);
      total += Number(this.shipping);
      total += Number(this.tax);
      return total.toFixed(2);
    },
    tax () {
      return Number(.06 * this.subTotal).toFixed(2);
    }
  },
  mounted () {
    $.ajax({
      type: "get",
      // url: "http://45.79.70.166/cart/products",
      url: "http://localhost:8000/cart/products",
      headers: {
        'X-CSRF-TOKEN': window.Laravel.csrfToken
      },
      success: function(msg) {
        console.log('success');
        app.items = msg;
      },
      fail: function(msg) {
        console.log('fail');
      }
    });
  }
}
</script>

