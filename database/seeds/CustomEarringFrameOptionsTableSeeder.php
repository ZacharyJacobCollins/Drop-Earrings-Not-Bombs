<?php

use Illuminate\Database\Seeder;

class CustomEarringFrameOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$frames = [ 
	    	'gold',
			'silver',
		];

    	foreach ($frames as $frame) {
    		DB::insert('insert into custom_earring_frame_options (frames) values (?)', [$frame]);	
    	}
    }
}
