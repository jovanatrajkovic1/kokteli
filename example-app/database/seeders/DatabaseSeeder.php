<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Pera',
                'email' => 'pera@example.com',
                'password' => Hash::make('password123') ,
                'role'=>'admin'
            ],
            [
                'name' => 'Mika',
                'email' => 'mika@example.com',
                'password' => Hash::make('password123')  ,
                'role'=>'user'
            ],
            [
                'name' => 'Zika',
                'email' => 'zika@example.com',
                'password' => Hash::make('password123')  ,
                'role'=>'user'
            ],
        ];

        DB::table('users')->insert($users);
        $this->call([
           
            IngredientSeeder::class,
            CocktailSeeder::class,
          
            ReviewSeeder::class,
        ]);
    }
}
