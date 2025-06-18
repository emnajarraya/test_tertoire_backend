import { useEffect, useState } from 'react';
import type { Service } from '../types';
import { getServices, deleteService } from '../api/services';

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchServices = async () => {
        try {
            const { data } = await getServices();
            setServices(data);
            setError(null);
        } catch (err) {
            setError('Failed to load services');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (slug: string) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            await deleteService(slug);
            await fetchServices();
        } catch (err) {
            setError('Failed to delete service');
        }
    };

    const handleServiceCreated = (service: Service) => {
        setServices(prev => [...prev, service]);
        setShowForm(false);
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <p className="text-gray-500">Loading services...</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Services</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all services with their SEO settings and catalogues.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            {showForm ? 'Cancel' : 'Add Service'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* {showForm && (
                    <div className="mt-6">
                        <ServiceForm
                            onSuccess={handleServiceCreated}
                            onError={() => setError('Failed to create service')}
                        />
                    </div>
                )} */}

                <div className="mt-8 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Nom
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Description
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Meta Title
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {services.map((service) => (
                                            <tr key={service.id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {service.nom}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {service.description.length > 100
                                                        ? `${service.description.substring(0, 100)}...`
                                                        : service.description
                                                    }
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {service.seo_setting?.meta_title || 'No SEO Title'}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        onClick={() => handleDelete(service.slug)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete<span className="sr-only">, {service.nom}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
