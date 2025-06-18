import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getService } from "../../api/services";
import type { Service, Catalogue } from "../../types";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const cardHover = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

const EtancheiteTraditionnelle = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getService('etancheite-traditionnelle');
        setService(data);
      } catch (error) {
        console.error("Erreur lors du chargement du service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Service non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-white py-24 mt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {service.nom}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90 max-w-2xl leading-relaxed"
          >
            L'art traditionnel de l'étanchéité, perpétué avec excellence
          </motion.p>
        </div>
      </motion.div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src={service.image}
                  alt={service.nom}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
              </div>
            </motion.div>

            <div>
              <motion.h2
                {...fadeInUp}
                className="text-4xl font-bold text-gray-900 mb-8"
              >
                Savoir-faire ancestral<br/>
                <span className="text-amber-600">& techniques modernes</span>
              </motion.h2>
              <motion.p
                {...fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {service.description}
              </motion.p>

              <motion.div
                {...fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Types de couvertures
                </h3>
                <div className="grid gap-4">
                  {service.catalogues.map((catalogue: Catalogue) => (
                    <motion.div
                      key={catalogue.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-amber-50"
                    >
                      <span className="text-amber-600 text-2xl">•</span>
                      <p className="text-gray-800">{catalogue.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-amber-50/50 rounded-3xl p-12 mb-20"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Notre expertise en détail
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                whileHover={cardHover}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Restauration</h4>
                <p className="text-gray-600 text-center">
                  Remise en état experte des toitures traditionnelles avec respect du patrimoine
                </p>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Réfection</h4>
                <p className="text-gray-600 text-center">
                  Rénovation complète avec des matériaux nobles et techniques ancestrales
                </p>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛠️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Réparation</h4>
                <p className="text-gray-600 text-center">
                  Interventions ponctuelles dans le respect des méthodes traditionnelles
                </p>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Diagnostic</h4>
                <p className="text-gray-600 text-center">
                  Expertise approfondie et conseils personnalisés pour votre toiture
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-4">🏛️</span>
                Matériaux traditionnels
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Sélection rigoureuse des matériaux d'origine</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Approvisionnement auprès d'artisans spécialisés</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Techniques de pose ancestrales préservées</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Respect des normes monuments historiques</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Garantie d'authenticité et de durabilité</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-4">🔄</span>
                Innovation discrète
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Solutions d'isolation thermique modernes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Systèmes de ventilation optimisés</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Protection invisible contre l'humidité</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Préservation de l'esthétique d'origine</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Conformité aux normes actuelles</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-12 shadow-xl"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Préservons ensemble votre patrimoine
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Faites confiance à notre expertise pour restaurer et protéger votre toiture
                dans le respect des traditions et des normes actuelles.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Demander une consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default EtancheiteTraditionnelle;
