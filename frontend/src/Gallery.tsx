import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../assets/images/1.jpeg";
import img2 from "../assets/images/2.jpeg";  
import img3 from "../assets/images/3.jpeg";
import img4 from "../assets/images/4.jpeg";
const Gallery = () => {
  const images = [
    { src:img1, alt: "Work 1" },
    { src: img2, alt: "Work 2" },
    { src: img3, alt: "Work 3" },
    { src: img4, alt: "Work 4" },
    // { src: "/assets/images/work5.jpg", alt: "Work 5" },
    // { src: "/assets/images/work6.jpg", alt: "Work 6" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Nos Réalisations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;