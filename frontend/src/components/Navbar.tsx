
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: "Entretien toiture", path: "/services/entretien-toiture" },
    { name: "Réparation de fuite & infiltration", path: "/services/reparation-fuite" },
    { name: "Étanchéité de toiture", path: "/services/etancheite-toiture" },
    { name: "Étanchéité toit plat & terrasse", path: "/services/etancheite-toit-plat" },
    { name: "Étanchéité toitures traditionnelles", path: "/services/etancheite-traditionnelle" },
  
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-900">
            ÉtanchéPro
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 transition-colors">
              Accueil
            </Link>
            
            <div className="relative">
              <button 
                className="text-gray-700 hover:text-blue-900 transition-colors flex items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
             Contact
            </Link>
            <Link 
              to="/devis" 
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
             devis
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-white border-t">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-900"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            
            <div className="py-2">
              <span className="text-gray-700 font-medium">Services</span>
              <div className="ml-4 mt-1">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="block py-1 text-sm text-gray-600 hover:text-blue-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/contact"
              className="block py-2 text-amber-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Demande de devis / Contact
            </Link>
            <Link to="/gallery" className="hover:underline">
            Nos réalisations
          </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
