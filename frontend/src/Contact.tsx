import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "etancheite"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 pt-36"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl opacity-90"
          >
            Nous sommes là pour répondre à toutes vos questions
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form Section */}
          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Formulaire de contact</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service concerné</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="etancheite">Étanchéité traditionnelle</option>
                  <option value="toits-plats">Étanchéité toits plats</option>
                  <option value="reparation">Réparation</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coordonnées */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <span className="material-icons text-blue-500 mr-2">phone</span>
                Nos coordonnées
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">call</span>
                  <span>📞 Standard : 01 23 45 67 89</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">smartphone</span>
                  <span>📱 Urgences : 06 12 34 56 78</span>
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">email</span>
                  <span>✉️ Email : contact@etanchepro.fr</span>
                </li>
              </ul>
            </motion.div>

            {/* Nos expertises */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <span className="material-icons text-blue-500 mr-2">engineering</span>
                Nos expertises
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Étanchéité toitures traditionnelles</li>
                <li>• Étanchéité toits plats et terrasses</li>
                <li>• Réparation et maintenance</li>
                <li>• Diagnostic et audit</li>
                <li>• Solutions préventives</li>
              </ul>
            </motion.div>

            {/* Nos valeurs */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <span className="material-icons text-blue-500 mr-2">favorite</span>
                Nos valeurs
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Qualité et durabilité</li>
                <li>• Respect des délais</li>
                <li>• Transparence tarifaire</li>
                <li>• Service client privilégié</li>
                <li>• Innovation technique</li>
              </ul>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Notre localisation</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.75769434896!2d2.277019!3d48.858947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1689972669037!5m2!1sfr!2sfr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
