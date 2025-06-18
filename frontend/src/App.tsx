import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading des composants pour améliorer les performances
const Services = lazy(() => import('./pages/Services'));
const ReparationFuite = lazy(() => import('./pages/services/ReparationFuite'));
const EntretienToiture = lazy(() => import('./pages/services/EntretienToiture'));
const EtancheiteToiture = lazy(() => import('./pages/services/EtancheiteToiture'));
const EtancheiteToit = lazy(() => import('./pages/services/EtancheiteToit'));
const EtancheiteTraditionnelle = lazy(() => import('./pages/services/EtancheiteTraditionnelle'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Composant de chargement avec animation
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Route par défaut redirige vers /services */}
            <Route index element={<Navigate to="/services" replace />} />

            {/* Routes des services */}
            <Route path="services">
              <Route index element={<Services />} />
              <Route path="reparation-fuite" element={<ReparationFuite />} />
              <Route path="entretien-toiture" element={<EntretienToiture />} />
              <Route path="etancheite-toiture" element={<EtancheiteToiture />} />
              <Route path="etancheite-toit" element={<EtancheiteToit />} />
              <Route path="etancheite-traditionnelle" element={<EtancheiteTraditionnelle />} />
            </Route>

            {/* Page 404 pour les routes non trouvées */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
