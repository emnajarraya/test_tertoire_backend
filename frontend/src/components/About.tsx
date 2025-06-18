
const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre Expertise à Votre Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous mettons notre savoir-faire au service de la protection et de l'étanchéité de vos toitures. 
            Notre équipe d'experts certifiés vous garantit des solutions durables et adaptées à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-900">15+</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Années d'expérience</h3>
            <p className="text-gray-600">Une expertise reconnue dans le domaine de l'étanchéité</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-amber-600">500+</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Projets réalisés</h3>
            <p className="text-gray-600">Des centaines de clients satisfaits nous font confiance</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">24h</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Intervention d'urgence</h3>
            <p className="text-gray-600">Disponibles pour vos urgences en moins de 24h</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
