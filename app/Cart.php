<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
	private $products = [];

	protected $fillable = [
        'name', 'email', 'password',
    ];

    public function view() {

    }

    /** 
    *  Adds a product to the cart using product Id
    */
    public function addProduct($productId) {

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

}
