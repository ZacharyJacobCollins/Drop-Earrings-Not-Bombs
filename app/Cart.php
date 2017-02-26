<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Product;

class Cart extends Model
{
	private $products = [];

    /** 
    *  Adds a product to the cart using product Id
    */
    public function addProduct($productId) {
        $product = Product::findOrFail($productId); 
        $this->products()->save($product);
    }

    /**
    * Removes a product from the cart using product Id
    */
    public function removeProduct($productId) {

    }

    //Each cart belongs to a user
    public function user() {
   	  return $this->hasOne('App\User');
    }

    public function products() {
        return $this->hasMany('App\Product');
    }

}
