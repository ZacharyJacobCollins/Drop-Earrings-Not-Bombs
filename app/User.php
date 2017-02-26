<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Cart;

class User extends Authenticatable
{
    use Notifiable;

    private $orders = [];

    // function __construct() {
    //     Cart::create([]);
    // }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ]; 


    /** 
    * The orders belonging to a user
    */
    public function orders() {
      return $this->hasMany('App\Order');
    } 

    /**
    *   User has a cart
    */
    public function cart() {
        return $this->hasOne('App\Cart');
    }


}
