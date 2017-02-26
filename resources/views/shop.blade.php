@extends('layouts.app')

@section('content')
	<div class="container main-content">
		<div class="row justify-content-around align-items-center button-block">
			<div class="col-xs-3 align-items-end boxed-content">
				<a href="/shop/products">
					<img src="{{ asset('img/premadeDemo.png')}}" height="286px"/>
					<div class="col align-self-end"><h2 style="font-size: 24px">Shop popular and premade earrings</h2></div>
				</a>
			</div>

			<div class="col-xs-3 boxed-content">
				<a href="/shop/creator">
					<img src="{{ asset('img/customEarringDemo.png')}} "/>
					<div class="col align-self-end"><h2 style="font-size: 24px">Create your own earring from scratch</h2></div>
				</a>
			</div>
		</div>
		<!-- <div class="row footer">
			<div class="col">
				<span id="HeyWeUsedYourAPI">If you suffer from one of the following conditions, please consult a doctor before ordering our earrings: </span>
			</div>
		</div> -->
	</div>
@endsection
