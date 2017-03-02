<?php

use Illuminate\Database\Seeder;

class CustomEarringStyleOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $styles = [ 
	    	'up',
			'down',
		];

    	foreach ($styles as $style) {
    		DB::insert('insert into custom_earring_style_options (styles) values (?)', [$style]);	
    	}
    }
}
