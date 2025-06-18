import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getService, IMAGE_BASE_URL } from "../../api/services";
import type { Service, Catalogue } from "../../types";

const EtancheiteToiture = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getService('etancheite-toiture');
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

      <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.nom}</h1>
          <p className="text-xl opacity-90">
            {service.seo_setting?.meta_description || "Solutions professionnelles d'étanchéité"}
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Protection optimale de votre toiture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {service.description}
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notre expertise :</h3>
              <ul className="space-y-3 text-gray-600">
                {service.catalogues.map((catalogue: Catalogue) => (
                  <li key={catalogue.id} className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <div>
                      <p>{catalogue.description}</p>
                      {catalogue.image && (
                        <img
                          src={`${IMAGE_BASE_URL}/${catalogue.image}`}
                          alt={catalogue.description}
                          className="mt-2 rounded-lg shadow-sm max-w-xs"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {service.image && (
                <img
                  src={`${IMAGE_BASE_URL}/${service.image}`}
                  alt={service.nom}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              )}
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Résidentiel</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Maisons individuelles</li>
                <li>• Copropriétés</li>
                <li>• Garages et annexes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🏭</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Commercial</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Bureaux</li>
                <li>• Centres commerciaux</li>
                <li>• Bâtiments industriels</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Neuf & Rénovation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Constructions neuves</li>
                <li>• Rénovations</li>
                <li>• Réparations</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-purple-50 rounded-lg p-8">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Demandez un devis gratuit</h3>
              <p className="text-gray-600 mb-6">
                Nos experts sont à votre disposition pour étudier votre projet et vous proposer
                la solution la plus adaptée à vos besoins.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EtancheiteToiture;
