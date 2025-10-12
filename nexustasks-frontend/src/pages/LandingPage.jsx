import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-bold text-2xl"></span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NexusTasks
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
              <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/30 font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-24 text-center">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-semibold">🚀 The Future of Task Management</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Manage Tasks
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate project management tool for teams and individuals. 
            <span className="text-white font-semibold"> Organize, prioritize, and conquer</span> your tasks with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/login" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/50 flex items-center gap-2">
              Start Free Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="border-2 border-gray-700 text-white px-10 py-5 rounded-xl text-lg font-bold hover:border-blue-500 hover:bg-blue-500/5 transition-all">
              See Features
            </a>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-800">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-2xl p-6 space-y-3 hover:scale-105 transition-transform">
                  <div className="h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg shadow-lg shadow-blue-500/50 w-4/5"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-full"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-3/4"></div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 space-y-3 hover:scale-105 transition-transform">
                  <div className="h-4 bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg shadow-lg shadow-purple-500/50 w-3/5"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-full"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-3/4"></div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 space-y-3 hover:scale-105 transition-transform">
                  <div className="h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-lg shadow-lg shadow-green-500/50 w-full"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-full"></div>
                  <div className="h-3 bg-gray-700 rounded-lg w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative py-32 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Stay Organized</span>
            </h2>
            <p className="text-gray-400 text-lg">Powerful features built for modern teams</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Task Management</h3>
              <p className="text-gray-400 leading-relaxed">Create, organize, and track tasks with an intuitive interface.</p>
            </div>

            <div className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">Built with modern tech for blazing fast performance.</p>
            </div>

            <div className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/50 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Secure & Private</h3>
              <p className="text-gray-400 leading-relaxed">Your data is encrypted and protected with JWT authentication.</p>
            </div>

            <div className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/50 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Project Based</h3>
              <p className="text-gray-400 leading-relaxed">Organize tasks into projects for better workflow management.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of users managing their tasks efficiently.
          </p>
          <Link to="/login" className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-6 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
            Get Started For Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl"></span>
            </div>
            <span className="text-2xl font-bold text-white">NexusTasks</span>
          </div>
          <p className="text-gray-400 mb-2">© 2025 NexusTasks. Built by Montell Boks <span className="text-white font-semibold">Montell Tyrique Boks</span></p>
          <p className="text-gray-500 text-sm">Full-Stack Project Management Application</p>
        </div>
      </footer>
    </div>
  );
}