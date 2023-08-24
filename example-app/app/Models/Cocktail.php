<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cocktail extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
