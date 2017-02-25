<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CrewController extends Controller
{
	//Main crew view
	public function crew() {
		return view('crew');
	}
}
