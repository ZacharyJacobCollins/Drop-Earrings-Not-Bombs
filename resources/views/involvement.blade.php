@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row align-items-center">
		@if (Auth::user()) 
			<div class="col-sm-6 offset-sm-3">Hey there {{ Auth::user()->name }}!</div>
		@else
			<h1 class="col-sm-12" style="text-align: center">It looks like you're not signed in!</h1>
			<br />
			<br />
			<h1 class="col-sm-12" style="text-align: center">
				<a href="/register">Create Account</a>
				<br />
				<a href="/register">Sign in</a>

			</h1>
		@endif
	</div>
</div>
@endsection
