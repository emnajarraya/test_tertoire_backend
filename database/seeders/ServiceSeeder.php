<?php

namespace Database\Seeders;

use App\Models\Catalogue;
use App\Models\SeoSetting;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'nom' => 'Entretien toiture',
                'description' => 'Un entretien régulier de votre toiture est essentiel pour garantir sa longévité et éviter des réparations coûteuses.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Entretien de Toiture - Maintenance préventive professionnelle',
                    'meta_description' => 'Service d\'entretien de toiture professionnel. Inspection complète, nettoyage des gouttières, et maintenance préventive pour garantir la longévité de votre toiture.',
                    'keywords' => 'entretien toiture, maintenance toiture, nettoyage gouttières, inspection toiture'
                ],
                'catalogues' => [
                    [
                        'description' => 'Inspection visuelle complète de la toiture',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Nettoyage des gouttières et évacuations',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Vérification et remplacement des tuiles défectueuses',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Contrôle des joints et solins',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Traitement préventif anti-mousse',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ],
            [
                'nom' => 'Étanchéité des toitures',
                'description' => 'Service professionnel d\'étanchéité pour toitures plates et terrasses.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Services d\'étanchéité de toiture professionnels | ÉtanchéPro',
                    'meta_description' => 'Experts en étanchéité de toitures plates et terrasses. Solutions durables et garanties.',
                    'keywords' => 'étanchéité toiture, étanchéité terrasse, toiture plate'
                ],
                'catalogues' => [
                    [
                        'description' => 'Membrane EPDM haute qualité',
                        'image' => 'epdm.jpg'
                    ],
                    [
                        'description' => 'Membrane bitumineuse SBS',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ],
            [
                'nom' => 'Étanchéité des fondations',
                'description' => 'Protection complète des fondations contre l\'humidité et les infiltrations d\'eau.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Étanchéité des fondations | Solutions professionnelles | ÉtanchéPro',
                    'meta_description' => 'Protection durable des fondations contre l\'humidité. Expertise et qualité garantie.',
                    'keywords' => 'étanchéité fondation, imperméabilisation sous-sol, drainage'
                ],
                'catalogues' => [
                    [
                        'description' => 'Membrane drainante haute densité',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Revêtement imperméable',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ],
            [
                'nom' => 'Étanchéité toit',
                'description' => 'Service professionnel d\'étanchéité des toits avec des solutions modernes et innovantes.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Étanchéité de Toit - Solutions Professionnelles | ÉtanchéPro',
                    'meta_description' => 'Solutions d\'étanchéité de toit professionnelles avec les dernières technologies. Garantie d\'excellence et durabilité.',
                    'keywords' => 'étanchéité toit, étanchéité moderne, solution toiture, protection toit'
                ],
                'catalogues' => [
                    [
                        'description' => 'Système d\'étanchéité moderne',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Revêtement haute performance',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ],
            [
                'nom' => 'Étanchéité traditionnelle',
                'description' => 'Techniques traditionnelles éprouvées pour l\'étanchéité de votre toiture.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Étanchéité Traditionnelle - Méthodes Éprouvées | ÉtanchéPro',
                    'meta_description' => 'Solutions d\'étanchéité traditionnelles avec des méthodes éprouvées dans le temps. Savoir-faire artisanal.',
                    'keywords' => 'étanchéité traditionnelle, méthodes traditionnelles, artisanat toiture'
                ],
                'catalogues' => [
                    [
                        'description' => 'Techniques ancestrales',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Matériaux traditionnels',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ],
            [
                'nom' => 'Réparation fuite',
                'description' => 'Service rapide et efficace de réparation des fuites de toiture.',
                'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop',
                'seo' => [
                    'meta_title' => 'Réparation de Fuites - Intervention Rapide | ÉtanchéPro',
                    'meta_description' => 'Service d\'urgence pour la réparation des fuites de toiture. Intervention rapide et solutions durables.',
                    'keywords' => 'réparation fuite, urgence toiture, fuite toit, intervention rapide'
                ],
                'catalogues' => [
                    [
                        'description' => 'Détection de fuites',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Réparation d\'urgence',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ],
                    [
                        'description' => 'Solutions permanentes',
                        'image' => 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=400&fit=crop'
                    ]
                ]
            ]
        ];

        foreach ($services as $serviceData) {
            $service = Service::create([
                'nom' => $serviceData['nom'],
                'description' => $serviceData['description'],
                'image' => $serviceData['image'],
                'slug' => Str::slug($serviceData['nom'])
            ]);

            SeoSetting::create([
                'service_id' => $service->id,
                'meta_title' => $serviceData['seo']['meta_title'],
                'meta_description' => $serviceData['seo']['meta_description'],
                'keywords' => $serviceData['seo']['keywords']
            ]);

            foreach ($serviceData['catalogues'] as $catalogueData) {
                Catalogue::create([
                    'service_id' => $service->id,
                    'description' => $catalogueData['description'],
                    'image' => $catalogueData['image']
                ]);
            }
        }
    }
}
