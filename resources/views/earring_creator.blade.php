@extends('layouts.app')

@section('content')
	<div class="container">
		<div class="row">
			<div class="col-sm-3">
	    		<h1>Create</h1>
	    	</div>
	    </div>

       <div class="row">

            <!-- Image row -->
            <div class="col-md-6 earring-display">
              <classic-earring :color="earrings.color"></classic-earring>
            </div>

            <!-- Dropdowns -->
            <div class="col-md-3">

                <!-- Sizes -->
                <selector :available="earrings.availableSizes" title="Sizes"></selector>

                <!-- Frames -->
                <selector :available="earrings.availableFrames" title="Frames"></selector>

                <!-- Styles -->
                <!-- <selector :available="earrings.availableStyles" title="Styles"></selector> -->

                <!-- Colors  -->
                <template v-for="(layer, layerName) in earrings.color">
                  <div class="form-group">
                      <label :for="layerName">@{{ layerName }}</label>
                      <colorpicker :layername="layerName"></colorpicker>
                  </div>
                </template>

                <!-- Beads -->
                <selector :model="earrings.bead" :available="earrings.availableBeads" title="Beads"></selector>

	            </div>
	        </div>

          <input type="hidden" value="@{{ earrings }}"></input>

        </div>
	</div>	
@endsection

