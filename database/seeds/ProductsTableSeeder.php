<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
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
			Product::create([
				'title' => "Product".$i,
				'price' => 15.00,
				'description' => "Product".$i." Earring Lorem Ipsup Earring Lorem Ipsup Earring Lorem Ipsup Earring Lorem Ipsup Earring Lorem Ipsup",
				'image_url' => "Product_".$i.".jpg",
			]);
		}
    }
}
