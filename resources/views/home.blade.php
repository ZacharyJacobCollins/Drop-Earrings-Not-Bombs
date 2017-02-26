@extends('layouts.app')

@section('content')
	<div id='left-box'>
		<h2> Drop Earrings Not Bombs</h2>
		<p> </p>
	</div>
	<div class="container">	
	    <div class="video-background">
	      <div class="video-foreground">
	        <video id="video-bg" class="video-js vjs-16-9 vjs-default-skin" preload="auto" width="1280" height="720" data-setup="{}" muted autoplay loop>
	            <source src="{{ asset('video/media/videos/video-bg.mp4') }}" type="video/webm">
	            <p class="vjs-no-js">
	              To view this video please enable JavaScript, and consider upgrading to a web browser that supports html5 video
	            </p>
	        </video>
	      </div>
	    </div>
	</div>
 @endsection