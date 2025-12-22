import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Get Best Deal</span>
            </h1>
            <p className="text-xl text-slate-300">
              Sign in to start tracking your favorite products
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
              <Authenticator
                hideSignUp={false}
                components={{
                  Header() {
                    return (
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Authentication</h2>
                        <p className="text-slate-400">Please sign in to continue</p>
                      </div>
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthWrapper;