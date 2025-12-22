import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

const AuthPage = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmingSignUp, setIsConfirmingSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email
          }
        }
      });
      setUserEmail(formData.email);
      setIsConfirmingSignUp(true);
      showToast('Please check your email for confirmation code', 'success');
    } catch (error) {
      console.error('Sign up error:', error);
      showToast(error.message || 'Failed to create account', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn({
        username: formData.email,
        password: formData.password
      });
      showToast('Welcome back!', 'success');
      navigate('/products');
    } catch (error) {
      console.error('Sign in error:', error);
      showToast(error.message || 'Failed to sign in', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmSignUp({
        username: userEmail,
        confirmationCode: formData.confirmationCode
      });
      showToast('Account confirmed! Please sign in.', 'success');
      setIsConfirmingSignUp(false);
      setActiveTab('signin');
      setFormData({ ...formData, confirmationCode: '' });
    } catch (error) {
      console.error('Confirmation error:', error);
      showToast(error.message || 'Failed to confirm account', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: userEmail });
      showToast('Confirmation code resent', 'success');
    } catch (error) {
      console.error('Resend code error:', error);
      showToast(error.message || 'Failed to resend code', 'error');
    }
  };

  const handleSubmit = (e) => {
    if (isConfirmingSignUp) {
      handleConfirmSignUp(e);
    } else if (activeTab === 'signin') {
      handleSignIn(e);
    } else {
      handleSignUp(e);
    }
  };

  if (isConfirmingSignUp) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Welcome heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Check Your <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Email</span>
            </h1>
            <p className="text-slate-400">We sent a confirmation code to {userEmail}</p>
          </div>

          {/* Confirmation card */}
          <div className="backdrop-blur-2xl bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleConfirmSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  name="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  'Confirm Account'
                )}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-teal-400 hover:text-teal-300 transition"
                >
                  Resend Code
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setIsConfirmingSignUp(false)}
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Welcome heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Get Best Deal</span>
          </h1>
          <p className="text-slate-400">Sign in to start tracking your favorite products</p>
        </div>

        {/* Auth card with glass effect */}
        <div className="backdrop-blur-2xl bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl p-8">

          {/* Tabs */}
          <div className="flex mb-8 bg-slate-800/50 rounded-xl p-1">
            <button
              className={activeTab === 'signin'
                ? "flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold transition"
                : "flex-1 py-3 rounded-lg text-slate-400 hover:text-white transition"
              }
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              className={activeTab === 'signup'
                ? "flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold transition"
                : "flex-1 py-3 rounded-lg text-slate-400 hover:text-white transition"
              }
              onClick={() => setActiveTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pl-11 rounded-xl backdrop-blur-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-11 pr-12 rounded-xl backdrop-blur-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (only for signup) */}
            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 pl-11 rounded-xl backdrop-blur-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {activeTab === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                activeTab === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Forgot Password Link (only for signin) */}
            {activeTab === 'signin' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-teal-400 hover:text-teal-300 transition"
                >
                  Forgot your password?
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;