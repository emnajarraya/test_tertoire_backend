import { useState, type FormEvent } from 'react';

interface ContactFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
    serviceName?: string;
    buttonText?: string;
    className?: string;
}

interface ContactFormData {
    nom: string;
    email: string;
    telephone: string;
    message: string;
}

const initialFormData: ContactFormData = {
    nom: '',
    email: '',
    telephone: '',
    message: ''
};

const ContactForm = ({
    onSuccess,
    onError,
    serviceName,
    buttonText = "Envoyer",
    className = ""
}: ContactFormProps) => {
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    service: serviceName
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du formulaire');
            }

            setFormData(initialFormData);
            onSuccess?.();
        } catch (error) {
            console.error('Error submitting form:', error);
            onError?.(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom
                </label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                </label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            >
                {isSubmitting ? 'Envoi...' : buttonText}
            </button>
        </form>
    );
};

export default ContactForm;
