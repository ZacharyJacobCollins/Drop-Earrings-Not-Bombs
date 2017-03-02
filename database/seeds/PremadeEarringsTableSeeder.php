<?php

use Illuminate\Database\Seeder;
use App\PremadeEarring;

class PremadeEarringsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		//create 29 products
    	for($i=1; $i<29; $i++) 
    	{
			PremadeEarring::create([
				'title' => "Product".$i,
				'price' => 15.00,
				'description' => "Product".$i."Sunburst, green, red",
				'image_url' => "Product_".$i.".jpg",
			]);
		}
    }
}
