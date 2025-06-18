import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import CompanyInfo from "./components/CompanyInfo";
import Footer from "./components/Footer";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Section Hero */}
      <Hero />

      {/* Section À propos */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
        </div>
      </motion.section>

      {/* Section Services */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Services />
        </div>
      </motion.section>

      {/* Section Informations entreprise */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompanyInfo />
        </div>
      </motion.section>

      {/* Section Contact rapide */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              {...fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Besoin d'un devis personnalisé ?
            </motion.h2>
            <motion.p
              {...fadeInUp}
              className="text-xl text-gray-600 mb-8"
            >
              Nos experts sont à votre disposition pour étudier votre projet
              et vous proposer les meilleures solutions.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Contactez-nous
            </motion.button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
