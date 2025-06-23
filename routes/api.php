<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Routes des services
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
// Route::post('/services', [ServiceController::class, 'store']);
// Route::delete('/services/{slug}', [ServiceController::class, 'destroy']);

// Routes des contacts
// Route::post('/contact', [ContactController::class, 'store']);
// Route::delete('/contact/{id}', [ContactController::class, 'destroy']);
