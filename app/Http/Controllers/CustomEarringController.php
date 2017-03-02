<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CustomEarringController extends Controller
{
	public function colors() {
		$colors = DB::select('select colors from custom_earring_color_options');
		return $colors;
	}
	
	public function styles() {
		$styles = DB::select('select styles from custom_earring_style_options');
		return $styles;
	}

	public function beads() {
		$beads = DB::select('select beads from custom_earring_bead_options');
		return $beads;
	}

	public function frames() {
		$frames = DB::select('select frames from custom_earring_frame_options');
		return $frames;
	}

	public function sizes() {
		$sizes = DB::select('select sizes from custom_earring_size_options');
		return $sizes;
	}
}
