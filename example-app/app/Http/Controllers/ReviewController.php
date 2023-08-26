<?php

namespace App\Http\Controllers;

use App\Models\Review;  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'cocktail_id' => 'required|exists:cocktails,id',
            'content' => 'required',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $review = Review::create($request->all());

        return response()->json($review, 201); // 201 Created
    }
}
