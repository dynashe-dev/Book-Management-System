import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, Shield, Users, ArrowRight, Check, Star } from 'lucide-react';
import logoImage from '@/assets/mm.png';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-secondary-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg group-hover:shadow-lg transition-shadow overflow-hidden">
              <img src={logoImage} alt="BookHub logo" className="w-8 h-8 object-cover" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-600 bg-clip-text text-transparent">BookHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Features</a>
            <a href="#benefits" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Benefits</a>
            <a href="#testimonials" className="text-secondary-500 hover:text-primary-600 transition-colors text-sm font-medium">Testimonials</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-secondary-600 hover:text-primary-500 transition-colors text-sm font-medium">Sign in</Link>
            <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg hover:shadow-lg hover:shadow-accent-500/30 transition-all text-sm font-medium">Get Started</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary-50 to-white pt-20 pb-32">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute left-[-3rem] top-10 w-72 h-4 rounded-full bg-gradient-to-r from-accent-500/90 to-transparent blur-2xl opacity-90 rotate-12"></div>
            <div className="absolute right-[-2rem] top-32 w-80 h-4 rounded-full bg-gradient-to-l from-primary-500/90 to-transparent blur-2xl opacity-85 rotate-6"></div>
            <div className="absolute left-12 bottom-24 w-80 h-4 rounded-full bg-gradient-to-r from-accent-300/80 via-accent-400/70 to-transparent blur-2xl opacity-90 -rotate-6"></div>
            <div className="absolute right-12 bottom-12 w-4 h-64 rounded-full bg-gradient-to-b from-accent-400/80 to-transparent blur-2xl opacity-85"></div>
            <div className="absolute left-1/2 top-24 -translate-x-1/2 w-96 h-4 rounded-full bg-gradient-to-r from-primary-500/80 via-accent-300/60 to-transparent blur-3xl opacity-75 rotate-3"></div>
          </div>
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-accent-300/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide">The Modern Library Platform</p>
                <h1 className="text-5xl md:text-6xl font-bold text-primary-500 leading-tight">
                  Organize. Discover. Enjoy.
                </h1>
              </div>
              
              <p className="text-lg text-secondary-500 leading-relaxed max-w-lg">
                Take control of your book collection with intelligent organization, smart recommendations, and a community of book lovers. Your library, reimagined.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link 
                  to="/register" 
                  className="group px-8 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg hover:shadow-lg hover:shadow-accent-500/30 transition-all font-medium flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/books" 
                  className="px-8 py-3 border-2 border-primary-200 text-primary-500 rounded-lg hover:border-accent-400 hover:bg-accent-50 transition-all font-medium"
                >
                  Explore Books
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                    >
                      {i}K+
                    </div>
                  ))}
                </div>
                <p className="text-sm text-secondary-500">
                  <span className="font-semibold text-primary-500">12,000+</span> users already organizing their libraries
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute -top-10 -left-10 w-44 h-44 bg-accent-300/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="relative border border-secondary-200 rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
                  <img
                    src={logoImage}
                    alt="Live BookHub dashboard preview"
                    className="w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/60 to-transparent p-6">
                    <div className="text-white">
                      <p className="text-sm uppercase tracking-[0.24em] text-accent-200 mb-2">Live preview</p>
                      <h3 className="text-xl font-semibold">Track books, status, and reading activity</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">Powerful Features</p>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-500">Everything you need</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Instantly search and organize thousands of books with our optimized platform.'
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your library is protected with enterprise-grade security and complete privacy.'
                },
                {
                  icon: Users,
                  title: 'Community Driven',
                  description: 'Connect with fellow book lovers and discover personalized recommendations.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl border border-secondary-200 hover:border-accent-400 bg-white hover:bg-gradient-to-br hover:from-accent-50/50 hover:to-transparent transition-all duration-300"
                >
                  <div className="p-3 bg-accent-100 group-hover:bg-accent-500 rounded-lg w-fit mb-4 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-500 mb-2">{feature.title}</h3>
                  <p className="text-secondary-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-secondary-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">Why Choose DYNASHE BookHub</p>
                  <h2 className="text-4xl font-bold text-primary-500">Built for book enthusiasts</h2>
                </div>

                {[
                  'Organize books by genres, authors, or custom collections',
                  'Get AI-powered recommendations tailored to your taste',
                  'Track reading progress and set yearly goals',
                  'Export your library and integrate with other platforms'
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg text-primary-500 font-medium">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-400/20 to-accent-600/20 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-secondary-500 uppercase tracking-wide">Your Reading Stats</h3>
                    <div className="text-3xl font-bold text-primary-500">2,547 books</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-600">Fiction</span>
                        <span className="text-sm font-bold text-primary-500">45%</span>
                      </div>
                      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-gradient-to-r from-accent-500 to-accent-600"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-600">Non-Fiction</span>
                        <span className="text-sm font-bold text-primary-500">35%</span>
                      </div>
                      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div className="h-full w-[35%] bg-gradient-to-r from-accent-400 to-accent-500"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-600">Self-Help</span>
                        <span className="text-sm font-bold text-primary-500">20%</span>
                      </div>
                      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div className="h-full w-[20%] bg-gradient-to-r from-accent-300 to-accent-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">Loved by Readers</p>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-500">Join thousands of happy users</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Camila Maponga',
                  role: 'Book Blogger',
                  content: 'DYNASHE BookHub has completely transformed how I manage my collection. The interface is beautiful and intuitive.',
                  rating: 5
                },
                {
                  name: 'Blessing Mugadza',
                  role: 'Avid Reader',
                  content: 'Finally, a platform that understands what book lovers need. The recommendations are spot on!',
                  rating: 5
                },
                {
                  name: 'Dylan Mawire',
                  role: 'Student',
                  content: 'Perfect for keeping track of my reading list for class. Worth every penny!',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-gradient-to-br from-secondary-50 to-white border border-secondary-200 hover:border-accent-400 transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <p className="text-secondary-500 mb-6">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-primary-500">{testimonial.name}</p>
                    <p className="text-sm text-secondary-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-300/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to organize your library?</h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">Join thousands of book lovers using BookHub to manage their collections, discover new reads, and connect with a vibrant community.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:shadow-xl transition-all font-semibold hover:bg-accent-50"
              >
                Create Free Account
              </Link>
              <Link
                to="/books"
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
              >
                Browse Our Library
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-500 text-primary-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-accent-400" />
                <span className="font-bold text-white">DYNASHE BookHub</span>
              </div>
              <p className="text-sm text-primary-200">The modern platform for book lovers everywhere.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-400 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-primary-200">© {new Date().getFullYear()} DYNASHE BookHub. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-primary-200 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
