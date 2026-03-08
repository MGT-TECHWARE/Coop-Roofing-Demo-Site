import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Wrench, 
  Home, 
  CloudLightning, 
  Hammer, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Mail,
  Clock
} from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroTagRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroHeadingRef.current) return;

    const headingEl = heroHeadingRef.current;
    const text = headingEl.textContent || '';
    headingEl.innerHTML = '';

    // Split text into spans per character, preserving line breaks
    const lines = ['Quality Roofs.', 'Trusted Craftsmanship'];
    lines.forEach((line, lineIdx) => {
      line.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        headingEl.appendChild(span);
      });
      if (lineIdx < lines.length - 1) {
        headingEl.appendChild(document.createElement('br'));
      }
    });

    const chars = headingEl.querySelectorAll('span');

    const tl = gsap.timeline({ delay: 0.4 });

    // Typing animation for each character
    tl.to(chars, {
      opacity: 1,
      duration: 0.04,
      stagger: 0.05,
      ease: 'none',
    });

    // Fade in the rest of the hero content after typing finishes
    tl.fromTo(heroTagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    tl.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    tl.fromTo(heroCTARef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-charcoal selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src="/images/logo.svg" alt="Coop's Roofing & Construction" className={`w-auto transition-all duration-300 ${isScrolled ? 'h-28' : 'h-44'}`} />
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Services', 'About', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium tracking-wide uppercase transition-colors ${isScrolled ? 'text-brand-charcoal hover:text-brand-red' : 'text-white/90 hover:text-white'}`}>
                {item}
              </a>
            ))}
            <a href="#contact" className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${isScrolled ? 'bg-brand-red text-white hover:bg-brand-red-dark' : 'bg-white text-brand-charcoal hover:bg-gray-100'}`}>
              Free Inspection
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-6 text-center">
            {['Services', 'About', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-brand-charcoal">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-8 px-8 py-4 bg-brand-red text-white rounded-lg text-lg font-medium">
              Get a Free Inspection
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2070&auto=format&fit=crop" 
            alt="Roofing crew working on a roof from drone perspective" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <p
            ref={heroTagRef}
            style={{ opacity: 0 }}
            className="text-brand-red font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6"
          >
            Coop's Roofing & Construction
          </p>
          <h1
            ref={heroHeadingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-[1.05] mb-8 tracking-tight text-balance"
          >
            Quality Roofs.<br />Trusted Craftsmanship
          </h1>
          <p
            ref={heroSubRef}
            style={{ opacity: 0 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-balance"
          >
            Serving Dallas–Fort Worth with expert roofing, storm restoration, and full-service construction.
          </p>
          <div
            ref={heroCTARef}
            style={{ opacity: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white rounded-lg font-semibold hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 group">
              Get a Free Inspection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:4693945046" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call (469) 394-5046
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-brand-charcoal text-white py-6 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-medium tracking-wide opacity-80">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-red" /> Locally Owned</span>
            <span className="flex items-center gap-2"><CloudLightning className="w-4 h-4 text-brand-red" /> Storm Restoration Experts</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Free Inspections</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Free Estimates</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-red" /> Serving All DFW</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6 leading-tight tracking-tight">
                DFW’s Trusted Roofing & Construction Experts
              </h2>
              <div className="w-20 h-1.5 bg-brand-red mb-8"></div>
              <div className="space-y-6 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  Coop's Roofing & Construction is a locally owned company serving the Dallas–Fort Worth area. We specialize in residential roofing, storm damage restoration, and full general contracting services. Our team is dedicated to delivering high-quality craftsmanship, honest communication, and reliable service for every homeowner.
                </p>
                <p>
                  Whether your roof needs repairs, replacement, or storm restoration, our experienced team is ready to help.
                </p>
              </div>
              <div className="mt-10">
                <a href="#services" className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-brand-red-dark transition-colors">
                  Explore our services <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-roofing.png"
                  alt="Roofing crew working on residential roof in DFW"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal">Licensed & Insured</h4>
                    <p className="text-sm text-gray-500">For your peace of mind</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6 tracking-tight">Our Services</h2>
            <div className="w-20 h-1.5 bg-brand-red mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 font-normal">
              Comprehensive roofing and construction solutions tailored to protect and enhance your home.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Home className="w-8 h-8" />,
                title: "Roof Replacement",
                desc: "High-quality roofing systems built to last and protect your home."
              },
              {
                icon: <CloudLightning className="w-8 h-8" />,
                title: "Storm Damage Restoration",
                desc: "Fast response and insurance claim assistance after hail or storm damage."
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "Roof Repairs",
                desc: "Fix leaks, damaged shingles, and structural issues quickly."
              },
              {
                icon: <Hammer className="w-8 h-8" />,
                title: "General Contracting",
                desc: "Full exterior upgrades and construction improvements."
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-brand-charcoal transition-colors duration-300 border border-gray-100 hover:border-brand-charcoal"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-brand-red mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-gray-600 font-normal leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us & Process */}
      <section id="process" className="py-24 lg:py-32 bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Why Choose Us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">Why Choose Us</h2>
              <div className="w-20 h-1.5 bg-brand-red mb-10"></div>
              <ul className="space-y-6">
                {[
                  "Local DFW roofing experts",
                  "Fast storm response",
                  "Free inspections and estimates",
                  "High quality materials",
                  "Experienced roofing professionals",
                  "Customer-first service"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg text-gray-300 font-normal">
                    <CheckCircle2 className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Process */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">Our Process</h2>
              <div className="w-20 h-1.5 bg-brand-red mb-10"></div>
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                {[
                  {
                    step: "01",
                    title: "Free Roof Inspection",
                    desc: "We evaluate your roof and identify any damage or issues."
                  },
                  {
                    step: "02",
                    title: "Honest Estimate",
                    desc: "You receive a clear and transparent estimate."
                  },
                  {
                    step: "03",
                    title: "Professional Installation",
                    desc: "Our team completes the job efficiently and professionally."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-brand-charcoal bg-brand-red text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                      {item.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-400 font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 bg-brand-charcoal-dark text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 blur-[120px] rounded-full translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">Contact Us</h2>
              <p className="text-2xl text-brand-red font-medium italic mb-12">Drop us a line!</p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Phone className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                    <a href="tel:4693945046" className="text-2xl md:text-3xl font-bold hover:text-brand-red transition-colors">
                      (469) 394-5046
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Service Area</p>
                    <p className="text-xl font-medium">Dallas–Fort Worth (DFW)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-brand-charcoal"
            >
              <h3 className="text-2xl font-bold mb-8">Request a Free Inspection</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="(469) 394-5046" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input type="text" id="address" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="123 Main St, Dallas, TX" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-red text-white rounded-xl font-bold text-lg hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/30">
                  Request a Free Inspection
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div>
              <span className="font-serif font-bold text-2xl tracking-tight block mb-2">
                COOP'S ROOFING & CONSTRUCTION
              </span>
              <p className="text-gray-400 font-normal">Serving Dallas–Fort Worth</p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <a href="tel:4693945046" className="text-xl font-bold hover:text-brand-red transition-colors">
                (469) 394-5046
              </a>
              <a href="https://coopsroofing.com" className="text-gray-400 hover:text-white transition-colors">
                https://coopsroofing.com
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Coop's Roofing & Construction. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Locally Owned</span>
              <span className="text-gray-700">|</span>
              <span>Storm Restoration Pros</span>
              <span className="text-gray-700">|</span>
              <span>Full General Contracting</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
