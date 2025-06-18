<?php

namespace Tests\Feature;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_can_list_services(): void
    {
        $service = Service::create([
            'nom' => 'Test Service',
            'description' => 'Test Description',
            'slug' => 'test-service',
            'image' => 'test.jpg'
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
                ->assertJsonCount(1)
                ->assertJsonFragment([
                    'nom' => 'Test Service',
                    'slug' => 'test-service'
                ]);
    }

    public function test_can_get_single_service(): void
    {
        $service = Service::create([
            'nom' => 'Test Service',
            'description' => 'Test Description',
            'slug' => 'test-service',
            'image' => 'test.jpg'
        ]);

        $response = $this->getJson("/api/services/{$service->slug}");

        $response->assertStatus(200)
                ->assertJsonFragment([
                    'nom' => 'Test Service',
                    'slug' => 'test-service'
                ]);
    }

    public function test_returns_404_for_non_existent_service(): void
    {
        $response = $this->getJson('/api/services/non-existent');
        $response->assertStatus(404);
    }

    public function test_can_submit_contact_form(): void
    {
        $contactData = [
            'nom' => 'John Doe',
            'email' => 'john@example.com',
            'telephone' => '1234567890',
            'message' => 'Test message'
        ];

        $response = $this->postJson('/api/contact', $contactData);

        $response->assertStatus(201)
                ->assertJsonFragment([
                    'message' => 'Votre message a été envoyé avec succès'
                ]);

        $this->assertDatabaseHas('contacts', [
            'nom' => 'John Doe',
            'email' => 'john@example.com'
        ]);
    }

    public function test_contact_form_validation(): void
    {
        $response = $this->postJson('/api/contact', [
            'nom' => '',
            'email' => 'invalid-email',
            'telephone' => '',
            'message' => ''
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['nom', 'email', 'telephone', 'message']);
    }
}
