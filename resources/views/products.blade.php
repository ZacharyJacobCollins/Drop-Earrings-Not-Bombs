@extends('layouts.app')

@section('content')
	<div class="container main-content product-content">

		@foreach ($products as $product) 
			<div class="col-sm-4 align-items-end boxed-content">
				<a href="#">
					<h1>{{ $product->title }}</h1>
					<img src="{{ asset('img/products/'.$product->image_url) }} "/>
					<div class="col align-self-end"><h5>{{ $product->description}}</h5></div>
				</a>
			</div>
		@endforeach
			
	</div>
@endsection
