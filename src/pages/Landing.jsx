import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Package, Target, Bell } from 'lucide-react';

const Landing = () => {
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
              TrackerGPT monitors millions of products across the web and alerts you instantly
              when prices drop to your target. Save money effortlessly with AI-powered tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 flex items-center gap-2"
              >
                Start Tracking for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="px-8 py-4 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200">
                Watch Demo
              </button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="mt-16 relative">
              <div className="w-full max-w-4xl mx-auto h-64 md:h-96 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex items-center justify-center">
                <Package className="w-24 h-24 text-slate-600" />
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

      {/* Why Choose Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose TrackerGPT?
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
            <Link
              to="/products"
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Tracking Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;