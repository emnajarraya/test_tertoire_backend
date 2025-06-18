import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getService, IMAGE_BASE_URL } from "../../api/services";
import type { Service } from "../../types";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const ReparationFuite = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'devis' | 'urgent'>('devis');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getService('reparation-fuite');
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md">
          <p className="flex items-center">
            <span className="material-icons mr-2">error_outline</span>
            {error || "Service non trouvé"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white py-24 mt-16 relative overflow-hidden"
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
            {service.seo_setting?.meta_description || "Réparation rapide et efficace des fuites de toiture"}
          </motion.p>
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => handleContactClick('urgent')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="material-icons mr-2">emergency</span>
              Intervention d'urgence 24/7
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => handleContactClick('devis')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Demander un devis
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Diagnostic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-red-600">search</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostic précis</h3>
              <p className="text-gray-600">Identification rapide et précise de l'origine des fuites pour une intervention ciblée.</p>
            </motion.div>

            {/* Intervention rapide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-red-600">timer</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Intervention rapide</h3>
              <p className="text-gray-600">Équipe disponible 24/7 pour les urgences, intervention sous 2h dans votre région.</p>
            </motion.div>

            {/* Solutions durables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-red-600">verified</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Solutions durables</h3>
              <p className="text-gray-600">Réparations garanties avec des matériaux de qualité supérieure.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Process Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Notre processus d'intervention
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: 'phone_in_talk',
                title: 'Contact',
                description: 'Appelez-nous 24/7 pour une intervention urgente'
              },
              {
                icon: 'directions_run',
                title: 'Déplacement rapide',
                description: 'Une équipe se rend sur place en moins de 2h'
              },
              {
                icon: 'build',
                title: 'Intervention',
                description: 'Réparation efficace avec des matériaux adaptés'
              },
              {
                icon: 'verified_user',
                title: 'Garantie',
                description: 'Suivi et garantie sur nos interventions'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons text-2xl text-red-600">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-red-200"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Garanties Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos garanties</h2>
                <ul className="space-y-4">
                  {[
                    "Intervention sous 2h garantie",
                    "Devis gratuit et transparent",
                    "Matériaux de qualité professionnelle",
                    "Garantie décennale",
                    "Assurance tous risques"
                  ].map((garantie, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <span className="material-icons text-red-600 mr-3">check_circle</span>
                      {garantie}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => handleContactClick('devis')}
                  className="mt-8 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
                >
                  Demander un devis gratuit
                </motion.button>
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src={`${IMAGE_BASE_URL}${service.image}`}
                  alt="Réparation de fuite"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-red-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Une fuite à réparer ?
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 mb-8"
          >
            Notre équipe d'experts intervient 24h/24 et 7j/7 pour toute urgence
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => handleContactClick('urgent')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-50 transition-colors shadow-lg flex items-center"
            >
              <span className="material-icons mr-2">emergency</span>
              Intervention d'urgence
            </button>
            <button
              onClick={() => handleContactClick('devis')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Devis gratuit
            </button>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ReparationFuite;
