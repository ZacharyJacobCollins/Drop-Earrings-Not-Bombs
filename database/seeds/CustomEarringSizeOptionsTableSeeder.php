<?php

use Illuminate\Database\Seeder;

class CustomEarringSizeOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sizes = [ 
	    	'classic',
			'mini',
		];

    	foreach ($sizes as $size) {
    		DB::insert('insert into custom_earring_size_options (sizes) values (?)', [$size]);	
    	}
    }
}
