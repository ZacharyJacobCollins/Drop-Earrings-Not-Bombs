@extends('layouts.app') 

@section('content')     
	<div class="container main-content product-content">
		@foreach ($products as $product)             
			<div class="col-sm-4 align-items-end boxed-content">                 
				<div href="#">                     
					<h1>{{ $product->title }}</h1>                     
					<img src="{{ asset('img/products/'.$product->image_url) }} "/>
					<div class="col align-self-end">
						<button type="button" class="add-to-cart btn btn-success" data-productId="{{ $product->id }}" style="margin-top:10px">Add To Cart</button>
					</div>
				</div>
			</div>
		@endforeach
	</div>
@endsection

