var app = new Vue({
    el: "#app",
    data: {
      items: arr,
      shipping: 5.00,
      earrings: {
        //TODO make ajax with laravel
        availableStyles: availableStyles,
        availableFrames: availableFrames,
        availableSizes: availableSizes,
        availableBeads: availableBeads,
        size: '',
        frames: { value: 'gold'},
        color: {
          //Contains an array of the colors available for the given layer
          layer1: 'none',
          layer2: 'none',
          layer3: 'none',
          layer4: 'none',
          layer5: 'none',
        },
        beads: '',
      },
    },
    computed: {
      image: function() {
          //Where selected is an array of the currently selected earring options
          var selected = [];
          selected.push(this.earrings.size);
          return this.earrings.size;
      },
      json: function() {
        return JSON.stringify(this.data);
      },
      subTotal: function() {
        var total = 0;
        for(var i=0; i<this.items.length; i++) {
          total += this.items[i].price * this.items[i].quantity;
        }
        return Number(total).toFixed(2);
      },
      total: function() {
        var total = Number(this.subTotal);
        total += Number(this.shipping);
        total += Number(this.tax);
        return total.toFixed(2);
      },
      tax: function() {
        return Number(.06 * this.subTotal).toFixed(2);
      }
    },
    methods: {
      //Register all the layer event bus listeners
      registerColorpickerListeners: function() {
        bus.$on('layer1', function (layer) {
          app.earrings.color.layer1 = layer;
        });
        bus.$on('layer2', function (layer) {
          app.earrings.color.layer2 = layer;
        });
        bus.$on('layer3', function (layer) {
          app.earrings.color.layer3 = layer;
        });
        bus.$on('layer4', function (layer) {
          app.earrings.color.layer4 = layer;
        });
        bus.$on('layer5', function (layer) {
          app.earrings.color.layer5 = layer;
        });
        bus.$on('frames', function (frames) {
          app.earrings.color.frames = frames;
        });
      },
      //Register all selector event bus listeners
      registerSelectorListeners: function() {
        bus.$on('styles', function (style) {
          app.earrings.style = style;
        });
        bus.$on('beads', function (beads) {
          app.earrings.beads = beads.value;
        });
      },
    },
    created: function() {
      console.log("Vue app instance created");
      console.log(this.earrings);
      this.registerColorpickerListeners();
      this.registerSelectorListeners();

    },
});
