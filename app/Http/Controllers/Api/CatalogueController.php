<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use App\Models\Catalogue;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CatalogueController extends Controller
{
    /**
     * Display a listing of all catalogues
     */
    public function index(): JsonResponse
    {
        try {
            $catalogues = Catalogue::with('service')->get();

            return response()->json([
                'success' => true,
                'data' => $catalogues
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching catalogues: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des catalogues'
            ], 500);
        }
    }

    /**
     * Display catalogues for a specific service
     */
    public function getByService($serviceId): JsonResponse
    {
        try {
            $service = Service::find($serviceId);

            if (!$service) {
                return response()->json([
                    'success' => false,
                    'message' => 'Service non trouvé'
                ], 404);
            }

            $catalogues = Catalogue::where('service_id', $serviceId)->get();

            return response()->json([
                'success' => true,
                'data' => $catalogues,
                'service' => $service
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching catalogues by service: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des catalogues'
            ], 500);
        }
    }

    /**
     * Store a newly created catalogue
     */
    public function store(Request $request): JsonResponse
{
    try {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'description' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_base64' => 'nullable|string'
        ]);

        // At least one of description or image must be provided
        if (empty($validated['description']) && !$request->hasFile('image') && empty($validated['image_base64'])) {
            return response()->json([
                'success' => false,
                'message' => 'Au moins une description ou une image doit être fournie'
            ], 422);
        }

        // Handle image upload (file or base64)
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('catalogues', 'public');
        } elseif (!empty($validated['image_base64'])) {
            $imagePath = $this->handleBase64Image($validated['image_base64']);
        }

        $catalogue = Catalogue::create([
            'service_id' => $validated['service_id'],
            'description' => $validated['description'] ?? null, // Use null if description is empty
            'image' => $imagePath
        ]);

        $catalogue->load('service');

        return response()->json([
            'success' => true,
            'message' => 'Catalogue créé avec succès',
            'data' => $catalogue
        ], 201);
    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Données invalides',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error creating catalogue: ' . $e->getMessage());
        Log::error('Request data: ' . json_encode($request->all()));
        Log::error('Stack trace: ' . $e->getTraceAsString()); // Add stack trace for debugging
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la création du catalogue: ' . $e->getMessage() // Include error message
        ], 500);
    }
}

    /**
     * Display the specified catalogue
     */
    public function show($id): JsonResponse
    {
        try {
            $catalogue = Catalogue::with('service')->find($id);

            if (!$catalogue) {
                return response()->json([
                    'success' => false,
                    'message' => 'Catalogue non trouvé'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $catalogue
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching catalogue: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du catalogue'
            ], 500);
        }
    }

    /**
     * Update the specified catalogue
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $catalogue = Catalogue::find($id);

            if (!$catalogue) {
                return response()->json([
                    'success' => false,
                    'message' => 'Catalogue non trouvé'
                ], 404);
            }

            $validated = $request->validate([
                'service_id' => 'sometimes|exists:services,id',
                'description' => 'nullable|string|max:1000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'image_base64' => 'nullable|string'
            ]);

            $updateData = [];

            if (isset($validated['service_id'])) {
                $updateData['service_id'] = $validated['service_id'];
            }

            if (array_key_exists('description', $validated)) {
                $updateData['description'] = empty($validated['description']) ? null : $validated['description'];
            }

            // Handle image update (file or base64)
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($catalogue->image && Storage::disk('public')->exists($catalogue->image)) {
                    Storage::disk('public')->delete($catalogue->image);
                    Log::info('Deleted old image: ' . $catalogue->image);
                }
                $updateData['image'] = $request->file('image')->store('catalogues', 'public');
            } elseif (!empty($validated['image_base64'])) {
                // Delete old image if exists
                if ($catalogue->image && Storage::disk('public')->exists($catalogue->image)) {
                    Storage::disk('public')->delete($catalogue->image);
                    Log::info('Deleted old image: ' . $catalogue->image);
                }
                $imagePath = $this->handleBase64Image($validated['image_base64']);
                if ($imagePath) {
                    $updateData['image'] = $imagePath;
                    Log::info('New image saved: ' . $imagePath);
                } else {
                    Log::warning('Image processing failed, keeping existing image');
                }
            }

            // After update, ensure at least one field (description or image) is not null
            $finalDescription = $updateData['description'] ?? $catalogue->description;
$finalImage = $updateData['image'] ?? $catalogue->image;

if (empty($finalDescription) && empty($finalImage)) {
    return response()->json([
        'success' => false,
        'message' => 'Un catalogue doit avoir au moins une description ou une image'
    ], 422);
}


            $catalogue->update($updateData);
            $catalogue->load('service');

            return response()->json([
                'success' => true,
                'message' => 'Catalogue mis à jour avec succès',
                'data' => $catalogue
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating catalogue: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du catalogue'
            ], 500);
        }
    }

    /**
     * Remove the specified catalogue
     */
    public function destroy($id): JsonResponse
    {
        try {
            $catalogue = Catalogue::find($id);

            if (!$catalogue) {
                return response()->json([
                    'success' => false,
                    'message' => 'Catalogue non trouvé'
                ], 404);
            }

            // Delete image file if exists
            if ($catalogue->image && Storage::disk('public')->exists($catalogue->image)) {
                Storage::disk('public')->delete($catalogue->image);
                Log::info('Deleted image: ' . $catalogue->image);
            }

            $catalogue->delete();

            return response()->json([
                'success' => true,
                'message' => 'Catalogue supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting catalogue: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du catalogue'
            ], 500);
        }
    }

    /**
     * Bulk update catalogues for a service
     */
    public function bulkUpdateByService(Request $request, $serviceId): JsonResponse
    {
        try {
            $service = Service::find($serviceId);

            if (!$service) {
                return response()->json([
                    'success' => false,
                    'message' => 'Service non trouvé'
                ], 404);
            }

            $validated = $request->validate([
                'catalogues' => 'required|array',
                'catalogues.*.id' => 'sometimes|exists:catalogues,id',
                'catalogues.*.description' => 'nullable|string|max:1000',
                'catalogues.*.image_base64' => 'nullable|string'
            ]);

            $updatedCatalogues = [];

            foreach ($validated['catalogues'] as $catalogueData) {
                // Validate that at least description or image is provided
                if (empty($catalogueData['description']) && empty($catalogueData['image_base64'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Chaque catalogue doit avoir au moins une description ou une image'
                    ], 422);
                }

                if (isset($catalogueData['id'])) {
                    // Update existing catalogue
                    $catalogue = Catalogue::where('id', $catalogueData['id'])
                        ->where('service_id', $serviceId)
                        ->first();

                    if ($catalogue) {
                        $updateData = [
                            'description' => empty($catalogueData['description']) ? null : $catalogueData['description']
                        ];

                        // Handle image update if provided
                        if (!empty($catalogueData['image_base64'])) {
                            // Delete old image if exists
                            if ($catalogue->image && Storage::disk('public')->exists($catalogue->image)) {
                                Storage::disk('public')->delete($catalogue->image);
                            }
                            $imagePath = $this->handleBase64Image($catalogueData['image_base64']);
                            if ($imagePath) {
                                $updateData['image'] = $imagePath;
                            }
                        }

                        $catalogue->update($updateData);
                        $updatedCatalogues[] = $catalogue;
                    }
                } else {
                    // Create new catalogue
                    $imagePath = null;
                    if (!empty($catalogueData['image_base64'])) {
                        $imagePath = $this->handleBase64Image($catalogueData['image_base64']);
                    }

                    $catalogue = Catalogue::create([
                        'service_id' => $serviceId,
                        'description' => empty($catalogueData['description']) ? null : $catalogueData['description'],
                        'image' => $imagePath
                    ]);
                    $updatedCatalogues[] = $catalogue;
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Catalogues mis à jour avec succès',
                'data' => $updatedCatalogues
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error bulk updating catalogues: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour des catalogues'
            ], 500);
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
            $imagePath = 'catalogues/' . $imageName;

            // Ensure catalogues directory exists
            if (!Storage::disk('public')->exists('catalogues')) {
                Storage::disk('public')->makeDirectory('catalogues');
                Log::info('Created catalogues directory');
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
