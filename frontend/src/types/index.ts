export interface Service {
    id: number;
    nom: string;
    description: string;
    image?: string;
    slug: string;
    seo_setting?: SeoSetting;  // Changé de seoSetting à seo_setting
    catalogues: Catalogue[];
    created_at: string;
    updated_at: string;
}

export interface SeoSetting {
    id: number;
    service_id: number;
    meta_title: string;
    meta_description: string;
    keywords: string;
    created_at: string;
    updated_at: string;
}

export interface Catalogue {
    id: number;
    service_id: number;
    description: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    nom: string;
    email: string;
    telephone: string;
    message: string;
    created_at: string;
    updated_at: string;
}
