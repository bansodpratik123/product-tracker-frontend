import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { signOut, getCurrentUser } from 'aws-amplify/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, [location]);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const isActiveLink = (href) => {
    if (href.startsWith('#')) {
      return location.pathname === '/' && location.hash === href;
    }
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Get Best Deal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActiveLink(link.href)
                    ? 'text-teal-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-6 py-2.5 rounded-lg border-2 border-slate-700 bg-slate-800/50 text-white font-semibold hover:bg-slate-700/50 transition"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate('/auth')}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
                  <div className="relative px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-teal-500/50 transition-all duration-200 transform hover:scale-105">
                    Track Product
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/products"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
                  <div className="relative px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-teal-500/50 transition-all duration-200 transform hover:scale-105">
                    Track Product
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-xl bg-slate-900/95 border-b border-slate-800/50 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActiveLink(link.href)
                      ? 'text-teal-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-700 bg-slate-800/50 text-white font-semibold hover:bg-slate-700/50 transition"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg"
                  >
                    Track Product
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg text-center"
                  >
                    Track Product
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;