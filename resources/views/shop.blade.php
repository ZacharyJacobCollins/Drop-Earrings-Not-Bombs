@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row">
    	<div class="col-sm-12"><h3 class="location"> Shop </h3></div>
    </div>

    <br /><br /><br />
    <br />


    <div class="row">
    	<div class="col-sm-6">
			<div class="card" style="width: 20rem;">
			  <img class="card-img-top" src="{{asset('images/earrings.png')}}" alt="Card image cap" height="350">
			  <ul class="list-group list-group-flush">
			    <a href="/shop/sunburst"><li class="list-group-item">Sunburst Earrings</li></a>
			    <a href="/shop/classic"><li class="list-group-item">Classic Earrings</li></a>
			    <a href="/shop/minis"><li class="list-group-item">Earring Minis</li></a>
			  </ul>
			</div>
    	</div>
    	<div class="col-sm-6">
    		<div class="col-sm-6">
			<div class="card" style="width: 20rem;">
			  <img class="card-img-top" src="{{asset('images/earringCreator.png')}}" alt="Card image cap" height="350">
			  <div class="card-block">
			    <h4 class="card-title">Use our custom earring creator technology to create an earring perfect for you.</h4>
			    <a href="/shop/creator">Visit the Creator</a>
			  </div>
			</div>
    	</div>
    	</div>
    </div>

</div>
@endsection
