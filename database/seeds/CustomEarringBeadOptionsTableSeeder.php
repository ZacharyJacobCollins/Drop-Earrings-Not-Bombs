<?php

use Illuminate\Database\Seeder;

class CustomEarringBeadOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $beads = [ 
	    	'some',
			'none',
		];

    	foreach ($beads as $bead) {
    		DB::insert('insert into custom_earring_bead_options (beads) values (?)', [$bead]);	
    	}

    }
}
