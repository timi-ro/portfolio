'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/afedb9f40668c0afed77c79872f79474', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formDataObj.get('name'),
          email: formDataObj.get('email'),
          message: formDataObj.get('message'),
          _subject: 'New contact from portfolio!',
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && data.success !== false) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles = 'w-full px-4 py-3 bg-[#0A0A0F] border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6 max-w-2xl mx-auto', className)}
    >
      {/* Honeypot for spam protection */}
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className={inputStyles}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className={inputStyles}
          />
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
          rows={6}
          className={cn(inputStyles, 'resize-none')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full px-8 py-4 bg-cyan-500 text-[#0A0A0F] font-medium tracking-wide transition-all',
          status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-400'
        )}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="text-center text-cyan-500 text-sm animate-fadeIn">
          ✓ Thank you! Your message has been sent successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="text-center text-red-500 text-sm animate-fadeIn">
          ✗ Something went wrong. Please try again or email me directly.
        </div>
      )}
    </form>
  );
}