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
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles = 'w-full rounded-md border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder-subtle transition-colors focus:border-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-2/20 disabled:opacity-60';

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4', className)}
    >
      {/* Honeypot for spam protection */}
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            aria-label="Your name"
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
            placeholder="Your email"
            aria-label="Your email"
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
          placeholder="Your message"
          aria-label="Your message"
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
          'rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity',
          status === 'loading' ? 'cursor-not-allowed opacity-50' : 'hover:opacity-85'
        )}
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm text-accent">
          Thank you. Your message has been sent.
        </p>
      )}

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try again, or email me directly.
        </p>
      )}
    </form>
  );
}