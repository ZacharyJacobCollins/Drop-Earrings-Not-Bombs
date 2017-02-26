<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Cart;

class CartController extends Controller
{
	//Add a productId to cart given id
	public function addProduct(Request $request) {
		//check if user is logged in, if not redirect to login
		if(Auth::check) {
			$productId = $request->input('productId');

			$user = Auth::user();

			//if user has no cart create a cart.
			if(empty($user->cart)) {
				$cart = new Cart();
				$cart->user()->save($user);
				$user->cart()->save($cart);
			}

			$cart = $user->cart;
			$cart->addProduct($productId);	

			return $cart->products;
		} else {
			return redirect('/login');
		}
	}

	//Return all products in the cart
	public function products() {
		return Auth::user()->cart->products;
	}

	//Delete a product from the cart given the product id
	//TODO
	public function deleteProduct(Request $request) {
		$productId = $request->input('productId');
	}

	public function auth() {
		return Auth::user();
	}
}
