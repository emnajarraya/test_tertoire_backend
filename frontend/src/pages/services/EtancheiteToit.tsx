import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getService } from "../../api/services";
import type { Service } from "../../types";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const EtancheiteToit = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getService('etancheite-toit');
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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
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
 <div className="min-h-screen">
          <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-700 via-green-600 to-green-800 text-white py-24 mt-16 relative overflow-hidden"
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
            Spécialistes des toitures plates et terrasses accessibles
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
            <div>
              <motion.h2
                {...fadeInUp}
                className="text-4xl font-bold text-gray-900 mb-8"
              >
                Étanchéité toit plat :<br/>
                <span className="text-green-600">notre expertise</span>
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
                  Types de terrasses
                </h3>
                <div className="grid gap-4">
                  {service.catalogues.map((catalogue) => (
                    <motion.div
                      key={catalogue.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-green-50"
                    >
                      <span className="text-green-600 text-2xl">•</span>
                      <p className="text-gray-800">{catalogue.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {service.image && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={service.image}
                    alt={service.nom}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-12 shadow-xl mb-20"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Solutions d'étanchéité innovantes</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                {...cardVariants}
                className="bg-green-50 rounded-xl p-8"
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Étanchéité liquide</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Résine polyuréthane haute performance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Application précise au rouleau</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Sans raccord ni joint</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Idéal pour les formes complexes</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                {...cardVariants}
                className="bg-green-50 rounded-xl p-8"
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Membrane synthétique</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>EPDM qualité professionnelle</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>PVC soudé haute résistance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>TPO écologique et durable</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Garantie fabricant 20 ans</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Protection UV</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos solutions offrent une résistance optimale aux rayons ultraviolets,
                prolongeant la durée de vie de votre toiture.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Drainage optimal</h3>
              <p className="text-gray-600 leading-relaxed">
                Systèmes d'évacuation d'eau sophistiqués pour prévenir toute stagnation
                et assurer une étanchéité parfaite.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Maintenance pro</h3>
              <p className="text-gray-600 leading-relaxed">
                Service de maintenance préventive pour garantir la longévité
                et la performance de votre étanchéité.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EtancheiteToit;
