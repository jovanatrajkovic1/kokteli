<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ingredients = [
            ['name' => 'Rum'],
            ['name' => 'Lime'],
            ['name' => 'Tequila'],
            ['name' => 'Mint Leaves'],
            ['name' => 'Sugar Syrup'],
        ];

        DB::table('ingredients')->insert($ingredients);
    }
}
