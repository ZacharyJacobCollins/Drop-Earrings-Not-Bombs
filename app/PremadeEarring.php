<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PremadeEarring extends Model
{
 	
 	protected $fillable = [
        'title', 'price', 'image_url', 'description'
    ];

	public function carts() {
        return $this->belongsToMany('App\PremadeEarring');
    }

}
