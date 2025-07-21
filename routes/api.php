    <?php

    use App\Http\Controllers\Api\ContactController;
    use App\Http\Controllers\Api\ServiceController;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Api\CatalogueController;


    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    // Routes des services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{slug}', [ServiceController::class, 'show']);
    Route::put('/services/{slug}', [ServiceController::class, 'update']);
// Route::post('/services', [ServiceController::class, 'store']);
// Route::delete('/services/{slug}', [ServiceController::class, 'destroy']);

// Routes des contacts
// Route::post('/contact', [ContactController::class, 'store']);
// Route::delete('/contact/{id}', [ContactController::class, 'destroy']);


// Routes des catalogues
Route::get('/catalogues', [CatalogueController::class, 'index']);
Route::get('/catalogues/{id}', [CatalogueController::class, 'show']);
Route::post('/catalogues', [CatalogueController::class, 'store']);
Route::put('/catalogues/{id}', [CatalogueController::class, 'update']);
Route::delete('/catalogues/{id}', [CatalogueController::class, 'destroy']);

// Routes pour les catalogues par service
Route::get('/services/{serviceId}/catalogues', [CatalogueController::class, 'getByService']);
Route::put('/services/{serviceId}/catalogues/bulk', [CatalogueController::class, 'bulkUpdateByService']);

