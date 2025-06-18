import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    icon: "🏠",
    title: "Étanchéité toiture",
    description: "Solutions complètes d'étanchéité pour tous types de toitures",
    link: "/services/etancheite-toiture",
    color: "blue"
  },
  {
    icon: "🛠️",
    title: "Réparation fuite",
    description: "Intervention rapide et efficace pour toute fuite",
    link: "/services/reparation-fuite",
    color: "red"
  },
  {
    icon: "🏛️",
    title: "Étanchéité traditionnelle",
    description: "Techniques ancestrales pour bâtiments historiques",
    link: "/services/etancheite-traditionnelle",
    color: "amber"
  },
  {
    icon: "🔧",
    title: "Entretien toiture",
    description: "Maintenance préventive et entretien régulier",
    link: "/services/entretien-toiture",
    color: "green"
  },
  {
    icon: "🏢",
    title: "Étanchéité toit plat",
    description: "Solutions spécifiques pour toits plats et terrasses",
    link: "/services/etancheite-toit",
    color: "purple"
  }
];

const Services = () => {
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Nos Services Professionnels
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Des solutions complètes et sur mesure pour tous vos besoins en étanchéité et toiture
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-${service.color}-500`}
          >
            <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
              <span className="text-3xl">{service.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <Link
              to={service.link}
              className={`inline-flex items-center text-${service.color}-600 font-semibold hover:text-${service.color}-700`}
            >
              En savoir plus
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
