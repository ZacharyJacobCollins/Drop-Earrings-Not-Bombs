import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  earrings: {
    //TODO make ajax with laravel
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

  }
}

const mutations = {
  SET_EARRING_LAYER_COLOR(state, payload) {
    state.earrings.color[payload.layer] = payload.color;
  }
}

const actions = {
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
