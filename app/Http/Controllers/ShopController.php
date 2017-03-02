<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PremadeEarring;

class ShopController extends Controller
{
	//Serves main shop view
	public function shop() {
		return view('shop');
	}

	//Serves custom earring creator
	public function earringCreator() {
		return view('earring_creator');
	}

	//Premade earrings/products
	public function products() {
		$premadeEarrings = PremadeEarring::All();
		return view('products', ['premadeEarrings'=>$premadeEarrings]);
	}

}
