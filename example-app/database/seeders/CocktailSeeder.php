<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CocktailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cocktails = [
            [
                'name' => 'Mojito',
                'description' => 'Tradicionalni kubanski koktel s kombinacijom limete, šećera, mente i ruma.'
            ],
            [
                'name' => 'Margarita',
                'description' => 'Klasik napravljen od tekile, limetinog soka i triple sec-a, obično poslužen u solju obrubljenoj čaši.'
            ],
            [
                'name' => 'Martini',
                'description' => 'Ikonasti koktel napravljen od džina ili vodke i vermuta, obično ukrašen maslinom ili limunovom koricom.'
            ],
        ];

        DB::table('cocktails')->insert($cocktails);

        $pripadnosti = [
            // Mojito sastojci
            [
                'cocktail_id' => 1,
                'ingredient_id' => 2, // Lime
                'amount' => '30ml',
            ],
            [
                'cocktail_id' => 1,
                'ingredient_id' => 4, // Mint Leaves
                'amount' => '10 leaves',
            ],
            [
                'cocktail_id' => 1,
                'ingredient_id' => 1, // Rum
                'amount' => '60ml',
            ],
            [
                'cocktail_id' => 1,
                'ingredient_id' => 5, // Sugar Syrup
                'amount' => '20ml',
            ],
            
            // Margarita sastojci
            [
                'cocktail_id' => 2,
                'ingredient_id' => 3, // Tequila
                'amount' => '50ml',
            ],
            [
                'cocktail_id' => 2,
                'ingredient_id' => 2, // Lime
                'amount' => '20ml',
            ],
            
            
        ];

        DB::table('pripadnost')->insert($pripadnosti);

    }
}
