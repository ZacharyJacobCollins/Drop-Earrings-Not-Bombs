@extends('layouts.app')

@section('content')
	<div id='left-box'>
		<h2> Drop Earrings Not Bombs</h2>
		
		<p>An approximate 11 million people have fled Syria due to the civil war turning their homes into warzones. Without proper grasp of the spoken language in a host country, jobs, education, and community are out of reach for the refugees.
		</p>

		<p>
			Drop Earrings Not Bombs (DENB) is a project that raises funds for and empowers Syrian refugees living in Istanbul, Turkey, by providing language, recreational and skill based workshops for refugees of all ages.
		</p>
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