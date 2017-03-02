<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PremadeEarringsTableSeeder::class);

        $this->call(CustomEarringColorOptionsTableSeeder::class);
        $this->call(CustomEarringFrameOptionsTableSeeder::class);
        $this->call(CustomEarringSizeOptionsTableSeeder::class);
        $this->call(CustomEarringBeadOptionsTableSeeder::class);
        $this->call(CustomEarringStyleOptionsTableSeeder::class);
    }
}
