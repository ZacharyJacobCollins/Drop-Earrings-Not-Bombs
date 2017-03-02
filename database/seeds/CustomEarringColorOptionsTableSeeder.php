<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomEarringColorOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$colors = [ 
	    	'#ffffff',
			'#a8927b',
			'#000000',
			'#ff779b',
			'#d97c6a',
			'#c30283',
			'#870f8a',
			'#d4000a',
			'#f55b00',
			'#e1bb18',
			'#e5e207',
			'#9e783a',
 			'#2e1612',
			'#a4dc71',
			'#71bd0a',
			'#008102',
			'#b1bc3c',
			'#52e0f6',
			'#03bbc3',
			'#107b9d',
			'#002483',
			'#022135',	
		];


    	foreach ($colors as $color) {
    		DB::insert('insert into custom_earring_color_options (colors) values (?)', [$color]);	
    	}

    }
}
