<?php

namespace Tests\Unit;

use App\Models\Catalogue;
use App\Models\SeoSetting;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    public function test_service_has_seo_settings(): void
    {
        $service = Service::create([
            'nom' => 'Test Service',
            'description' => 'Test Description',
            'slug' => 'test-service',
            'image' => 'test.jpg'
        ]);

        SeoSetting::create([
            'service_id' => $service->id,
            'meta_title' => 'Test Title',
            'meta_description' => 'Test Meta Description',
            'keywords' => 'test, keywords'
        ]);

        $this->assertInstanceOf(SeoSetting::class, $service->seoSetting);
    }

    public function test_service_has_catalogues(): void
    {
        $service = Service::create([
            'nom' => 'Test Service',
            'description' => 'Test Description',
            'slug' => 'test-service',
            'image' => 'test.jpg'
        ]);

        Catalogue::create([
            'service_id' => $service->id,
            'description' => 'Test Catalogue',
            'image' => 'catalogue.jpg'
        ]);

        $this->assertInstanceOf(Catalogue::class, $service->catalogues->first());
        $this->assertEquals(1, $service->catalogues->count());
    }

    public function test_service_required_fields(): void
    {
        $service = Service::create([
            'nom' => 'Test Service',
            'description' => 'Test Description',
            'slug' => 'test-service',
            'image' => 'test.jpg'
        ]);

        $this->assertNotNull($service->nom);
        $this->assertNotNull($service->description);
        $this->assertNotNull($service->slug);
    }
}
