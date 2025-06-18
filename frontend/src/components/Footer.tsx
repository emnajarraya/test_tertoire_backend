
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ÉtanchéPro</h3>
            <p className="text-gray-300">
              Votre partenaire de confiance pour tous vos travaux d'étanchéité
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Entretien toiture</li>
              <li>Réparation de fuite</li>
              <li>Étanchéité toiture</li>
              <li>Toit plat & terrasse</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📞 01 23 45 67 89</li>
              <li>📱 06 12 34 56 78</li>
              <li>✉️ contact@etanchepro.fr</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Lun - Ven: 8h - 18h</li>
              <li>Sam: 9h - 17h</li>
              <li>Urgences: 24h/24</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 ÉtanchéPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
