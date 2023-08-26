<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cocktail;
use App\Http\Resources\CocktailResource;
use Illuminate\Support\Facades\DB;
class CocktailController extends Controller
{
    // Prikaz svih koktela
    public function index()
    {
        $cocktails = Cocktail::all();
        return CocktailResource::collection($cocktails);
    }

    // Prikaz pojedinačnog koktela
    public function show($id)
    {
        $cocktail = Cocktail::find($id);
        if (!$cocktail) {
            return response()->json(['message' => 'Cocktail not found'], 404);
        }

        return new CocktailResource($cocktail);
    }

    // Spremanje novog koktela
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
            'ingredients' => 'array',  // Proverava da li je 'ingredients' niz
            'ingredients.*' => 'exists:ingredients,id', // Proverava da li svaki ID sastojka postoji u tabeli 'ingredients'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $cocktail = Cocktail::create([
            'name' => $request->name,
            'description' => $request->description
        ]);
    
        // Ako je niz sa ID-jevima sastojaka prosleđen, dodajemo zapise u tabelu 'pripadnost'
        if ($request->has('ingredients')) {
            foreach ($request->ingredients as $ingredient_id) {
                DB::table('pripadnost')->insert([
                    'cocktail_id' => $cocktail->id,
                    'ingredient_id' => $ingredient_id,
                ]);
            }
        }

        return new CocktailResource($cocktail);
    }

    // Ažuriranje postojećeg koktela
    public function update(Request $request, $id)
    {
        $cocktail = Cocktail::find($id);
        if (!$cocktail) {
            return response()->json(['message' => 'Cocktail not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cocktail->update($request->all());

        return new CocktailResource($cocktail);
    }

    // Brisanje koktela
    public function destroy($id)
    {
        $cocktail = Cocktail::find($id);
        if (!$cocktail) {
            return response()->json(['message' => 'Cocktail not found'], 404);
        }

        $cocktail->delete();

        return response()->json(['message' => 'Cocktail deleted successfully']);
    }
}
