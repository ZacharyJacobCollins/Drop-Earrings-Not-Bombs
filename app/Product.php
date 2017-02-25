<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
 	
 	protected $fillable = [
        'title', 'price', 'image_url', 'description'
    ];

    
	
}
