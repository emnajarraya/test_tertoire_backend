import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Effet de particules animées */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert en Étanchéité <br/>
              <span className="text-blue-400">& Toiture</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Solutions professionnelles pour l'étanchéité de vos toitures.
              Protection garantie et expertise reconnue depuis plus de 20 ans.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Découvrir nos services
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block bg-white hover:bg-blue-50 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Carte des services avec effet de profondeur */}
            <div className="grid gap-4">
              {[
                { icon: "🏠", title: "Étanchéité toiture", delay: 0.2 },
                { icon: "🛠️", title: "Réparation fuite", delay: 0.4 },
                { icon: "🏗️", title: "Travaux traditionnels", delay: 0.6 },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: service.delay }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{service.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { number: "20+", label: "Années d'expérience" },
            { number: "1000+", label: "Projets réalisés" },
            { number: "100%", label: "Clients satisfaits" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200V83.3333C240 27.7778 480 0 720 0C960 0 1200 27.7778 1440 83.3333V200H0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
