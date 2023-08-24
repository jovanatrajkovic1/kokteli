<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reviews = [
            [
                'user_id' => 1,
                'cocktail_id' => 1,
                'content' => 'Odličan Mojito! Baš kako treba da bude.',
                'rating' => 5,
            ],
            [
                'user_id' => 2,
                'cocktail_id' => 2,
                'content' => 'Margarita je bila malo previše kisela za moj ukus, ali generalno OK.',
                'rating' => 3,
            ],
            [
                'user_id' => 3,
                'cocktail_id' => 3,
                'content' => 'Martini je bio savršen. Preporučujem!',
                'rating' => 5,
            ],
        ];

        DB::table('reviews')->insert($reviews);
    }
}
