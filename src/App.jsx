import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import ProductsPage from './pages/ProductsPage';
import AuthPage from './pages/AuthPage';
import Toast from './components/Toast';
import AuthWrapper from './components/AuthWrapper';

function App() {
  const [toast, setToast] = useState({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message, type = 'success') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage showToast={showToast} />} />
          <Route
            path="/products"
            element={
              <AuthWrapper>
                <ProductsPage showToast={showToast} />
              </AuthWrapper>
            }
          />
        </Routes>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </Router>
  );
}

export default App;