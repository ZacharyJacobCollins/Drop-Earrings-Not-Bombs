var app = new Vue({
    el: "#app",
    data: {
      earrings: {
        //TODO make ajax with laravel
        availableStyles: availableStyles,
        availableFrames: availableFrames,
        availableSizes: availableSizes,
        availableBeads: availableBeads,
        size: '',
        frame: '',
        style: '',
        color: {
          //Contains an array of the colors available for the given layer
          layer1: '#150509',
          layer2: 'orange',
          layer3: 'grey',
          layer4: 'blue',
          layer5: '#b0134a',
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
      },
      //Register all selector event bus listeners
      registerSelectorListeners: function() {
        bus.$on('frames', function (frame) {
          app.earrings.frame = frame;
        });
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
