import { motion } from 'framer-motion';

const features = [
  {
    icon: "🏆",
    title: "Expertise reconnue",
    description: "Plus de 20 ans d'expérience dans l'étanchéité"
  },
  {
    icon: "✨",
    title: "Qualité premium",
    description: "Matériaux et techniques de pointe"
  },
  {
    icon: "⚡️",
    title: "Réactivité",
    description: "Intervention rapide sur toute la région"
  },
  {
    icon: "🤝",
    title: "Engagement",
    description: "Service client personnalisé et suivi"
  }
];

const certifications = [
  "Qualibat",
  "RGE",
  "ISO 9001",
  "Certification étanchéité"
];

const CompanyInfo = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6"
        >
          Pourquoi nous choisir ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-100 max-w-3xl mx-auto"
        >
          Une expertise reconnue et des solutions durables pour tous vos projets
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-blue-100">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-800 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Nos certifications</h3>
          <p className="text-blue-100">
            Des garanties de qualité pour votre tranquillité
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={cert}
              className="bg-blue-700 rounded-xl p-4 text-center hover:bg-blue-600 transition-colors"
            >
              <span className="font-semibold">{cert}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyInfo;
