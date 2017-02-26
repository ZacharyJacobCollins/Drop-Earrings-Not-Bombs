@extends('layouts.app')

@section('content')
	<div class="container main-content">
		<div class="row justify-content-around align-items-center button-block">
			<div class="col-xs-3 align-items-end boxed-content">
				<a href="/shop/products">
					<img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Shop&w=200&h=350"/>
					<div class="col align-self-end"><h5>Shop</h5></div>
				</a>
			</div>

			<div class="col-xs-3 boxed-content">
				<a href="/shop/creator">
					<img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Create&w=200&h=350"/>
					<div class="col align-self-end"><h5>Create</h5></div>
				</a>
			</div>
		</div>
	</div>
@endsection
