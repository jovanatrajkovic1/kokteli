<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pripadnost extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pripadnost', function (Blueprint $table) {
            $table->foreignId('cocktail_id');
            $table->foreignId('ingredient_id');
            $table->string('amount'); // npr. '50ml' ili '2 kapi'
            $table->primary(['cocktail_id', 'ingredient_id']); // kombinovani primarni ključ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pripadnost');
    }
}
