<?php namespace App\Http\Resources;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;

class CocktailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $allPripadnosti = DB::table('pripadnost')->where('cocktail_id', $this->id)->get();
        $cocktailPripadnosti = [];

        foreach ($allPripadnosti as $pripadnost) {
            $ingredient = DB::table('ingredients')->find($pripadnost->ingredient_id);
            $cocktailPripadnosti[] = [
                'id' => $ingredient->id,
                'name' => $ingredient->name
            ];
        }

        // Dohvatanje recenzija za trenutni koktel
        $allReviews = DB::table('reviews')->where('cocktail_id', $this->id)->get();
        $cocktailReviews = [];

        foreach ($allReviews as $review) {
            $cocktailReviews[] = [
                'user_id' => $review->user_id,
                'content' => $review->content,
                'rating' => $review->rating
            ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'ingredients' => $cocktailPripadnosti,
            'reviews' => $cocktailReviews  
        ];
    }
}
