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


		//create 50 products
    	for($i=0; $i<50; $i++) 
    	{
			Product::create([
				'title' => "Product".$i,
				'price' => (2.12+($i*1.08)),
				'description' => "Product".$i." Description Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
				'image_url' => 'https://source.unsplash.com/random',
			]);
		}
    }
}
