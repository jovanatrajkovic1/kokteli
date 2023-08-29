<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CocktailController;
use App\Http\Controllers\IngredientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/reviews', [ReviewController::class, 'store']);
Route::prefix('cocktails')->group(function () {
    Route::get('/', [CocktailController::class, 'index']);        // Lista svih koktela
    Route::get('/{id}', [CocktailController::class, 'show']);     // Prikaz određenog koktela
    Route::post('/', [CocktailController::class, 'store']);       // Kreiranje novog koktela
    Route::put('/{id}', [CocktailController::class, 'update']);   // Ažuriranje određenog koktela
    Route::delete('/{id}', [CocktailController::class, 'destroy']); // Brisanje određenog koktela
});
Route::get('/ingredients', [IngredientController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->post('/logout', [AuthController::class, 'logout']);