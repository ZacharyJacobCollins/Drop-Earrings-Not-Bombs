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
              <!--
              <img class="image1" height="500" width="240" :src="earrings.frame.src" />
              <img class="image2" height="280" width="230" :src="earrings.style.src" />
              -->
              <classic-earring :color="earrings.color"></classic-earring>
            </div>

            <!-- Dropdowns -->
            <div class="col-md-3">

                <!-- Sizes -->
                <selector :available="earrings.availableSizes" title="Sizes"></selector>

                <!-- Frames -->
                <selector :available="earrings.availableFrames" title="Frames"></selector>

                <!-- Styles -->
                <selector :available="earrings.availableStyles" title="Styles"></selector>

                <!-- Colors  -->
                <template v-for="(layer, layerName) in earrings.color">
                  <div class="form-group">
                      <label :for="layerName">sadfsafsa</label>
                      <colorpicker :layername="layerName"></colorpicker>
                  </div>
                </template>

                <!-- Beads -->
                <selector :model="earrings.bead" :available="earrings.availableBeads" title="Beads"></selector>

	            </div>
	        </div>

            @{{ earrings }}

        </div>
	</div>	
@endsection

