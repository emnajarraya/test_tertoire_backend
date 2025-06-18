import axios from 'axios';
import type { Service } from '../types';

const API_URL = 'http://localhost:8000/api';
export const IMAGE_BASE_URL = 'http://localhost:8000/storage';

export interface ServiceResponse {
  message: string;
  service: Service;
}

export interface ServiceData {
  nom: string;
  description: string;
  image?: string;
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string;
  };
}

export const getServices = async () => {
  try {
    const { data } = await axios.get<Service[]>(`${API_URL}/services`);
    return { data };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des services');
  }
};

export const getService = async (slug: string): Promise<Service> => {
  try {
    const { data } = await axios.get<Service>(`${API_URL}/services/${slug}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Service non trouvé');
  }
};

export const createService = async (serviceData: ServiceData): Promise<ServiceResponse> => {
  try {
    const { data } = await axios.post<ServiceResponse>(`${API_URL}/services`, serviceData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la création du service');
  }
};

export const updateService = async (slug: string, serviceData: Partial<ServiceData>): Promise<ServiceResponse> => {
  try {
    const { data } = await axios.put<ServiceResponse>(`${API_URL}/services/${slug}`, serviceData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la mise à jour du service');
  }
};

export const deleteService = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/services/${slug}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la suppression du service');
  }
};
