<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShopController extends Controller
{
	//Serves main shop view
	public function shop() {
		return view('shop');
	}

	//Serves custom earring creator
	public function earringCreator() {

	}
}
