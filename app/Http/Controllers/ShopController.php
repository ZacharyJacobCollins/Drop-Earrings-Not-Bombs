<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

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
		$products = Product::All();
		return view('products', ['products'=>$products]);
	}

}
