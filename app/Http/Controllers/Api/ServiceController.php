<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use App\Models\Service;
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

            // Handle base64 image if provided
            if (isset($validatedData['image']) && !empty($validatedData['image'])) {
                $imagePath = $this->handleBase64Image($validatedData['image']);
                $validatedData['image'] = $imagePath;
            }

            $service = Service  ::create([
                'nom' => $validatedData['nom'],
                'description' => $validatedData['description'],
                'image' => $validatedData['image'] ?? null,
                'slug' => $validatedData['slug']
            ]);

            $service->seoSetting()->create([
                'meta_title' => $validatedData['seo']['meta_title'],
                'meta_description' => $validatedData['seo']['meta_description'],
                'keywords' => $validatedData['seo']['keywords']
            ]);

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

            // Handle base64 image update if provided
            if (isset($validatedData['image']) && !empty($validatedData['image'])) {
                // Delete old image if exists
                if ($service->image && Storage::disk('public')->exists($service->image)) {
                    Storage::disk('public')->delete($service->image);
                    Log::info('Deleted old image: ' . $service->image);
                }

                $imagePath = $this->handleBase64Image($validatedData['image']);
                if ($imagePath) {
                    $validatedData['image'] = $imagePath;
                    Log::info('New image saved: ' . $imagePath);
                } else {
                    // If image processing failed, don't update the image field
                    unset($validatedData['image']);
                    Log::warning('Image processing failed, keeping existing image');
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
            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }

            // Delete catalogues images if they exist
            foreach ($service->catalogues as $catalogue) {
                if ($catalogue->image && Storage::disk('public')->exists($catalogue->image)) {
                    Storage::disk('public')->delete($catalogue->image);
                }
            }

            $service->delete();

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

    /**
     * Handle base64 image processing
     */
    private function handleBase64Image(string $base64Image): ?string
    {
        try {
            // Check if it's a valid base64 image
            if (!Str::startsWith($base64Image, 'data:image/')) {
                Log::error('Invalid base64 image format - missing data:image/ prefix');
                return null;
            }

            // Extract image type and base64 data
            preg_match('/data:image\/([a-zA-Z0-9]+);base64,/', $base64Image, $matches);

            if (empty($matches[1])) {
                Log::error('Could not extract image type from base64 string');
                return null;
            }

            $imageType = strtolower($matches[1]);

            // Validate image type
            $allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
            if (!in_array($imageType, $allowedTypes)) {
                Log::error('Unsupported image type: ' . $imageType);
                return null;
            }

            // Extract base64 data
            $base64Data = preg_replace('/^data:image\/[a-zA-Z0-9]+;base64,/', '', $base64Image);

            if (empty($base64Data)) {
                Log::error('Empty base64 data after extraction');
                return null;
            }

            // Decode base64
            $imageData = base64_decode($base64Data, true);

            if ($imageData === false) {
                Log::error('Failed to decode base64 image data');
                return null;
            }

            // Validate decoded data
            if (strlen($imageData) === 0) {
                Log::error('Decoded image data is empty');
                return null;
            }

            // Generate unique filename with correct extension
            $extension = $imageType === 'jpeg' ? 'jpg' : $imageType;
            $imageName = Str::random(40) . '.' . $extension;
            $imagePath = 'images/' . $imageName;

            // Ensure images directory exists
            if (!Storage::disk('public')->exists('images')) {
                Storage::disk('public')->makeDirectory('images');
                Log::info('Created images directory');
            }

            // Save the image
            $saved = Storage::disk('public')->put($imagePath, $imageData);

            if (!$saved) {
                Log::error('Failed to save image to storage');
                return null;
            }

            // Verify the file was actually saved
            if (!Storage::disk('public')->exists($imagePath)) {
                Log::error('Image file does not exist after save operation');
                return null;
            }

            $fileSize = Storage::disk('public')->size($imagePath);
            Log::info("Image saved successfully: {$imagePath} (Size: {$fileSize} bytes)");

            return $imagePath;
        } catch (\Exception $e) {
            Log::error('Exception in handleBase64Image: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return null;
        }
    }
}
