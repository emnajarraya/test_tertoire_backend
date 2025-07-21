<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
         'http://localhost:8082',
        'http://localhost:8081', // React user interface
        'http://localhost:8080', // Admin dashboard
    ], // Vite's default development port
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
