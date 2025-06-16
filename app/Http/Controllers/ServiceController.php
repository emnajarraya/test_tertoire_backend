<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Service::with(['seoSettings', 'catalogues'])->get();
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        return Service::with(['seoSettings', 'catalogues'])
            ->where('slug', $slug)
            ->firstOrFail();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->nom);

        if ($request->hasFile('image')) {
            $data['image'] = $this->imageService->store($request->file('image'), 'services');
        }

        $service = Service::create($data);

        if ($request->has('seo')) {
            $service->seoSettings()->create($request->get('seo'));
        }

        return response()->json($service->load('seoSettings'), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($service->image) {
                $this->imageService->delete($service->image);
            }
            $data['image'] = $this->imageService->store($request->file('image'), 'services');
        }

        $service->update($data);

        if ($request->has('seo')) {
            $service->seoSettings()->update($request->get('seo'));
        }

        return response()->json($service->load('seoSettings'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        if ($service->image) {
            $this->imageService->delete($service->image);
        }

        $service->delete();

        return response()->json(null, 204);
    }
}
