import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getService, IMAGE_BASE_URL } from "../../api/services";
import type { Service, Catalogue } from "../../types";

const EtancheiteFondation = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'devis' | 'urgent'>('devis');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getService('etancheite-fondation');
        setService(data);
        if (data.seo_setting) {
          document.title = data.seo_setting.meta_title;
        }
      } catch (error) {
        console.error("Erreur lors du chargement du service:", error);
        setError("Impossible de charger les informations du service");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactClick = (type: 'devis' | 'urgent') => {
    setModalType(type);
    setIsContactModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Service non trouvé"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.nom}</h1>
          <p className="text-xl opacity-90">
            {service.seo_setting?.meta_description || "Solutions professionnelles d'étanchéité des fondations"}
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Protection durable de vos fondations
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {service.description}
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nos solutions :</h3>
              <ul className="space-y-3 text-gray-600">
                {service.catalogues.map((catalogue: Catalogue) => (
                  <li key={catalogue.id} className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <div>
                      <p>{catalogue.description}</p>
                      {catalogue.image && (
                        <img
                          src={`${IMAGE_BASE_URL}/${catalogue.image}`}
                          alt={catalogue.description}
                          className="mt-2 rounded-lg shadow-sm max-w-xs"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder-image.jpg';
                          }}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pourquoi nous choisir ?</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900">Expertise</h4>
                    <p className="text-amber-700">Plus de 15 ans d'expérience</p>
                  </li>
                  <li className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900">Garantie</h4>
                    <p className="text-amber-700">Travaux garantis 10 ans</p>
                  </li>
                  <li className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900">Réactivité</h4>
                    <p className="text-amber-700">Intervention rapide</p>
                  </li>
                  <li className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900">Qualité</h4>
                    <p className="text-amber-700">Matériaux certifiés</p>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {service.image && (
                <img
                  src={`${IMAGE_BASE_URL}/${service.image}`}
                  alt={service.nom}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              )}
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Diagnostic</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Inspection complète</li>
                <li>• Détection d'infiltration</li>
                <li>• Analyse des besoins</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Solutions</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Membrane imperméable</li>
                <li>• Drainage efficace</li>
                <li>• Protection durable</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Suivi</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Garantie décennale</li>
                <li>• Contrôle qualité</li>
                <li>• Service après-vente</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-amber-50 rounded-lg p-8">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'un devis personnalisé ?</h3>
              <p className="text-gray-600 mb-6">
                Contactez-nous pour une évaluation gratuite de vos besoins en étanchéité de fondation.
                Nos experts sont là pour vous conseiller.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleContactClick('devis')}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Demander un devis
                </button>
                <button
                  onClick={() => handleContactClick('urgent')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact urgent
                </button>
              </div>
            </div>
          </div>

      
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EtancheiteFondation;
