import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Package, Target, Bell, ShoppingBag, DollarSign, TrendingDown, Gift, Star, Heart } from 'lucide-react';
import { getCurrentUser } from 'aws-amplify/auth';

const Landing = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleCTAClick = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/auth');
    }
  };
  const stats = [
    { label: 'Products Tracked', value: '50K+' },
    { label: 'Happy Users', value: '10K+' },
    { label: 'Money Saved', value: '₹2Cr+' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Alerts',
      description: 'Get instant notifications the moment your target price is reached. Never miss a deal again.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track price trends and get insights to make informed purchasing decisions.',
    },
    {
      icon: Package,
      title: 'Multi-Platform Tracking',
      description: 'Monitor prices across multiple e-commerce platforms from one dashboard.',
    },
  ];

  const steps = [
    {
      step: 1,
      icon: Package,
      title: 'Add Product URL',
      description: 'Simply paste the product link from any supported e-commerce site.',
    },
    {
      step: 2,
      icon: Target,
      title: 'Set Target Price',
      description: 'Define your ideal price point and let our AI do the monitoring.',
    },
    {
      step: 3,
      icon: Bell,
      title: 'Get Notified',
      description: 'Receive instant alerts when prices drop to your target range.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-slate-300">AI-Powered Price Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Never Miss a </span>
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Deal Again with AI
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Get Best Deal monitors millions of products across the web and alerts you instantly
              when prices drop to your target. Save money effortlessly with AI-powered tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCTAClick}
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 flex items-center gap-2"
              >
                Start Tracking for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="px-8 py-4 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200">
                Watch Demo
              </button>
            </div>

            {/* Hero Image - Shopping & Money Saving Illustration */}
            <div className="mt-16 relative">
              <div className="w-full max-w-4xl mx-auto h-64 md:h-96 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 flex items-center justify-center overflow-hidden">

                {/* Central Shopping Bag with Money */}
                <div className="relative">
                  {/* Main Shopping Bag */}
                  <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center relative z-10 shadow-2xl shadow-teal-500/25">
                    <ShoppingBag className="w-16 h-16 text-white" />

                    {/* Money Symbol */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Floating Icons Around */}
                  {/* Gift Box - Top Left */}
                  <div className="absolute -top-8 -left-12 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg opacity-80">
                    <Gift className="w-8 h-8 text-white" />
                  </div>

                  {/* Trending Down - Top Right */}
                  <div className="absolute -top-6 -right-14 w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center animate-pulse shadow-lg opacity-90">
                    <TrendingDown className="w-7 h-7 text-white" />
                  </div>

                  {/* Star - Left */}
                  <div className="absolute top-8 -left-16 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin shadow-lg opacity-70" style={{animationDuration: '8s'}}>
                    <Star className="w-6 h-6 text-white" />
                  </div>

                  {/* Heart - Right */}
                  <div className="absolute top-6 -right-16 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce shadow-lg opacity-80" style={{animationDelay: '1s'}}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>

                  {/* Package - Bottom Left */}
                  <div className="absolute -bottom-4 -left-10 w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center animate-pulse shadow-lg opacity-85" style={{animationDelay: '2s'}}>
                    <Package className="w-7 h-7 text-white" />
                  </div>

                  {/* Bell - Bottom Right */}
                  <div className="absolute -bottom-6 -right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center animate-bounce shadow-lg opacity-75" style={{animationDelay: '0.5s'}}>
                    <Bell className="w-6 h-6 text-white" />
                  </div>

                  {/* Sparkles Effect */}
                  <div className="absolute -top-4 left-4 w-6 h-6 text-yellow-400 animate-ping opacity-60">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-2 right-6 w-4 h-4 text-cyan-400 animate-ping opacity-50" style={{animationDelay: '1.5s'}}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="absolute top-16 left-20 w-5 h-5 text-emerald-400 animate-ping opacity-40" style={{animationDelay: '3s'}}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {/* Background Gradient Circles */}
                <div className="absolute top-10 left-16 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Sites Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              We Track Prices Across Top E-commerce Sites
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Monitor products from your favorite shopping destinations and never miss a deal again.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Amazon', domain: 'amazon.in', color: 'from-orange-400 to-yellow-500' },
              { name: 'Flipkart', domain: 'flipkart.com', color: 'from-blue-400 to-blue-600' },
              { name: 'Myntra', domain: 'myntra.com', color: 'from-pink-400 to-rose-500' },
              { name: 'Nike', domain: 'nike.com', color: 'from-gray-400 to-gray-600' },
              { name: 'VegNonVeg', domain: 'vegnonveg.com', color: 'from-green-400 to-green-600' },
              { name: 'Superkicks', domain: 'superkicks.in', color: 'from-purple-400 to-purple-600' },
            ].map((site, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${site.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{site.name}</h3>
                <p className="text-sm text-slate-400">{site.domain}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 text-lg">
              And many more sites being added regularly to expand your tracking capabilities!
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Get Best Deal?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the power of AI-driven price tracking with features designed for smart shoppers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get started in three simple steps and never overpay again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={handleCTAClick}
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Tracking Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;