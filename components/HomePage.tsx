'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, TrendingUp, Globe, Clock, Award } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '@/lib/data';

import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  // Scroll to hash on load (e.g. /#blogs from /blogs redirect)
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const benefits = [
    { title: 'Flexible schedule', icon: <Clock className="text-accent" />, desc: 'Learn at your own pace while working.' },
    { title: 'Global university access', icon: <Globe className="text-secondary" />, desc: 'Degrees from top-tier global institutions.' },
    { title: 'Career acceleration', icon: <TrendingUp className="text-primary" />, desc: 'Immediate application of skills at work.' },
    { title: 'Higher salary potential', icon: <Award className="text-accent" />, desc: 'Unlock senior roles and better pay.' },
  ];

  const metrics = [
    { label: 'Learners Explored', value: '500,000+' },
    { label: 'Universities', value: '1,000+' },
    { label: 'Programs', value: '50,000+' },
    { label: 'Lenders', value: '20+' },
  ];

  const categories = [
    'MBA / Business', 'Data Science / AI', 'Computer Science', 'Cybersecurity', 'Finance / Accounting', 'Healthcare', 'Marketing', 'Supply Chain', 'Product Management'
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full">
              AI-Powered Career Discovery
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-primary mb-6 leading-tight">
              Find Your Best-Fit Online <br />
              <span className="text-secondary">Master&apos;s Program</span> in 60 Seconds
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover programs matched to your career goals, budget and experience using our AI advisor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => router.push('/quiz')}
                className="btn-secondary text-lg px-10 py-4 flex items-center space-x-2 group shadow-xl shadow-secondary/20"
              >
                <span>Begin Quiz</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => router.push('/browse')}
                className="btn-outline text-lg px-10 py-4"
              >
                Browse Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">{m.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{m.label.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Online Masters for Working Professionals?</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs by Category */}
      <section className="bg-primary py-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
              <p className="text-gray-300 max-w-md">Find specialized programs in the most in-demand fields globally.</p>
            </div>
            <button 
              onClick={() => router.push('/browse')}
              className="text-accent font-bold flex items-center space-x-2 hover:underline"
            >
              <span>View all categories</span>
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => router.push('/browse')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-500">Real stories from professionals who transformed their careers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-14 h-14">
                  <Image 
                    src={t.image} 
                    alt={t.name} 
                    width={56} 
                    height={56} 
                    className="rounded-full border-2 border-accent object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role} @ {t.company}</div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                {faq.question}
                <span className="transition-transform group-open:rotate-180">
                  <ArrowRight className="rotate-90" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from our Blog</h2>
            <p className="text-gray-500">Expert insights on global education and career trends.</p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-primary font-bold flex items-center space-x-2 hover:underline"
          >
            <span>View all posts</span>
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "The Rise of Online MBA in India", date: "Oct 12, 2025", category: "MBA", img: "https://picsum.photos/seed/mba/400/250" },
            { title: "How to balance work and a Master's degree", date: "Nov 05, 2025", category: "Tips", img: "https://picsum.photos/seed/work/400/250" },
            { title: "Top 5 Data Science programs for 2026", date: "Dec 01, 2025", category: "Data Science", img: "https://picsum.photos/seed/ds/400/250" }
          ].map((blog, i) => (
            <button
              key={i}
              type="button"
              onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
              className="group cursor-pointer text-left w-full"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={blog.img} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {blog.category}
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-2">{blog.date}</div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
          <div className="p-12 bg-primary text-white flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Ready to take the next step?</h2>
            <p className="text-xl text-gray-300 mb-8">Our experts are here to guide you through the entire process, from selection to admission.</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-accent" />
                </div>
                <span>Personalized career roadmap</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-accent" />
                </div>
                <span>Financing & Scholarship assistance</span>
              </div>
            </div>
          </div>
          <div className="p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full btn-secondary py-4 text-lg">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
