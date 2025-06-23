<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $services = Service::with(['seoSetting', 'catalogues'])->get();

            return response()->json($services);
        } catch (\Exception $e) {
            Log::error('Error fetching services: ' . $e->getMessage());
            return response()->json(['error' => 'Impossible de récupérer les services'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $service = Service::with(['seoSetting', 'catalogues'])
                ->where('slug', $slug)
                ->firstOrFail();

            //    $service = Service::where('nom', $slug)->firstOrFail();
            return response()->json($service);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Service non trouvé'], 404);
        } catch (\Exception $e) {
            Log::error('Error fetching service: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération du service'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|string',
                'seo' => 'required|array',
                'seo.meta_title' => 'required|string|max:255',
                'seo.meta_description' => 'required|string',
                'seo.keywords' => 'required|string'
            ]);

            $validatedData['slug'] = Str::slug($validatedData['nom']);

            // Handle image if provided
            if (isset($validatedData['image']) && Str::startsWith($validatedData['image'], 'data:image')) {
                try {
                    $image = $validatedData['image'];
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
                    $imageName = Str::random(40) . '.jpg';
                    Storage::disk('public')->put('images/' . $imageName, $imageData);
                    $validatedData['image'] = 'images/' . $imageName;
                } catch (\Exception $e) {
                    Log::error('Error saving image: ' . $e->getMessage());
                    $validatedData['image'] = null;
                }
            }

            $service = Service::create([
                'nom' => $validatedData['nom'],
                'description' => $validatedData['description'],
                'image' => $validatedData['image'],
                'slug' => $validatedData['slug']
            ]);

            $service->seoSetting()->create([
                'meta_title' => $validatedData['seo']['meta_title'],
                'meta_description' => $validatedData['seo']['meta_description'],
                'keywords' => $validatedData['seo']['keywords']
            ]);

            Cache::forget('services.all');

            return response()->json([
                'message' => 'Service créé avec succès',
                'service' => $service->fresh(['seoSetting', 'catalogues'])
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Données invalides', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error creating service: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la création du service'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug): JsonResponse
    {
        try {
            $service = Service::where('slug', $slug)->firstOrFail();

            $validatedData = $request->validate([
                'nom' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'image' => 'sometimes|nullable|string',
                'seo' => 'sometimes|required|array',
                'seo.meta_title' => 'required_with:seo|string|max:255',
                'seo.meta_description' => 'required_with:seo|string',
                'seo.keywords' => 'required_with:seo|string'
            ]);

            if (isset($validatedData['nom'])) {
                $validatedData['slug'] = Str::slug($validatedData['nom']);
            }

            // Handle image update if provided
            if (isset($validatedData['image']) && Str::startsWith($validatedData['image'], 'data:image')) {
                try {
                    // Delete old image if exists
                    if ($service->image) {
                        Storage::disk('public')->delete($service->image);
                    }

                    $image = $validatedData['image'];
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
                    $imageName = Str::random(40) . '.jpg';
                    Storage::disk('public')->put('images/' . $imageName, $imageData);
                    $validatedData['image'] = 'images/' . $imageName;
                } catch (\Exception $e) {
                    Log::error('Error updating image: ' . $e->getMessage());
                    unset($validatedData['image']);
                }
            }

            $service->update($validatedData);

            if (isset($validatedData['seo'])) {
                $service->seoSetting()->update([
                    'meta_title' => $validatedData['seo']['meta_title'],
                    'meta_description' => $validatedData['seo']['meta_description'],
                    'keywords' => $validatedData['seo']['keywords']
                ]);
            }

            Cache::forget("services.{$slug}");
            Cache::forget('services.all');

            return response()->json([
                'message' => 'Service mis à jour avec succès',
                'service' => $service->fresh(['seoSetting', 'catalogues'])
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Service non trouvé'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Données invalides', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error updating service: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la mise à jour du service'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug): JsonResponse
    {
        try {
            $service = Service::where('slug', $slug)->firstOrFail();

            // Delete image if exists
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            // Delete catalogues images if they exist
            foreach ($service->catalogues as $catalogue) {
                if ($catalogue->image) {
                    Storage::disk('public')->delete($catalogue->image);
                }
            }

            $service->delete();

            Cache::forget("services.{$slug}");
            Cache::forget('services.all');

            return response()->json([
                'message' => 'Service supprimé avec succès'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Service non trouvé'], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting service: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression du service'], 500);
        }
    }
}
