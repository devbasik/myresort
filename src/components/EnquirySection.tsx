import { useState, type FormEvent } from 'react';
import { config } from '@/config';
import { WordReveal, Reveal } from '@/components/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useScroll';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  weddingDate: string;
  guestCount: string;
  celebrationDays: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  weddingDate?: string;
  guestCount?: string;
}

export function EnquirySection() {
  const { finalEnquiry, contact } = config;
  const reduced = usePrefersReducedMotion();
  const [form, setForm] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    weddingDate: '',
    guestCount: '',
    celebrationDays: '',
    details: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'demo'>('idle');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.weddingDate.trim()) e.weddingDate = 'Please enter a preferred date.';
    if (!form.guestCount.trim()) e.guestCount = 'Please estimate your guest count.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const buildWhatsAppMessage = (): string => {
    const lines = [
      `Wedding Enquiry — ${config.resortName}`,
      ``,
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Preferred Date: ${form.weddingDate}`,
      `Estimated Guests: ${form.guestCount}`,
      `Celebration Days: ${form.celebrationDays || 'Not specified'}`,
      ``,
      `Details: ${form.details || 'None'}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (contact.whatsapp) {
      const url = `https://wa.me/${contact.whatsapp}?text=${buildWhatsAppMessage()}`;
      window.open(url, '_blank');
      setStatus('success');
    } else {
      setStatus('demo');
    }
  };

  return (
    <section
      id="enquiry"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'var(--plaster-ivory)' }}
      aria-label="Plan Your Wedding"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: headline + image */}
          <Reveal as="div">
            <div className="relative overflow-hidden mb-8">
              <img
                src={finalEnquiry.image}
                alt={finalEnquiry.alt}
                loading="lazy"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
              />
            </div>

            <WordReveal
              text={finalEnquiry.headline}
              as="h2"
              className="font-serif-display font-bold tracking-display mb-5"
              stagger={40}
            />
            <p
              className="font-serif-display"
              style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--near-black)', opacity: 0.75 }}
              data-rev
            >
              {finalEnquiry.supporting}
            </p>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150} as="div">
            {status === 'success' ? (
              <div className="py-20 text-center">
                <p
                  className="font-serif-display font-bold tracking-tight-display mb-4"
                  style={{ fontSize: '1.6rem', color: 'var(--near-black)' }}
                >
                  Thank you.
                </p>
                <p
                  className="font-serif-display"
                  style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--near-black)', opacity: 0.7 }}
                >
                  Your enquiry has been prepared in WhatsApp. Please send the message to complete your request.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 font-serif-display transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--near-black)',
                    borderBottom: '1px solid var(--dusty-pink)',
                    paddingBottom: '4px',
                  }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : status === 'demo' ? (
              <div className="py-20 text-center">
                <p
                  className="font-serif-display font-bold tracking-tight-display mb-4"
                  style={{ fontSize: '1.6rem', color: 'var(--near-black)' }}
                >
                  Enquiry Ready.
                </p>
                <p
                  className="font-serif-display"
                  style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--near-black)', opacity: 0.7 }}
                >
                  No WhatsApp number is configured yet. Please contact us directly at{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ color: 'var(--dusty-pink)', borderBottom: '1px solid var(--dusty-pink)' }}
                  >
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 font-serif-display transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--near-black)',
                    borderBottom: '1px solid var(--dusty-pink)',
                    paddingBottom: '4px',
                  }}
                >
                  Back to Form
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="mb-7">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Your name"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <p className="field-error">{errors.fullName}</p>}
                </div>

                <div className="mb-7">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Your phone number"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="field-error">{errors.phone}</p>}
                </div>

                <div className="mb-7">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Your email address"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="mb-7">
                    <label htmlFor="weddingDate">Preferred Wedding Date</label>
                    <input
                      type="date"
                      id="weddingDate"
                      value={form.weddingDate}
                      onChange={(e) => handleChange('weddingDate', e.target.value)}
                      aria-invalid={!!errors.weddingDate}
                    />
                    {errors.weddingDate && <p className="field-error">{errors.weddingDate}</p>}
                  </div>

                  <div className="mb-7">
                    <label htmlFor="guestCount">Estimated Guest Count</label>
                    <input
                      type="number"
                      id="guestCount"
                      min="1"
                      value={form.guestCount}
                      onChange={(e) => handleChange('guestCount', e.target.value)}
                      placeholder="e.g. 150"
                      aria-invalid={!!errors.guestCount}
                    />
                    {errors.guestCount && <p className="field-error">{errors.guestCount}</p>}
                  </div>
                </div>

                <div className="mb-7">
                  <label htmlFor="celebrationDays">Number of Celebration Days</label>
                  <select
                    id="celebrationDays"
                    value={form.celebrationDays}
                    onChange={(e) => handleChange('celebrationDays', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4+">4+ Days</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label htmlFor="details">Additional Details</label>
                  <textarea
                    id="details"
                    rows={3}
                    value={form.details}
                    onChange={(e) => handleChange('details', e.target.value)}
                    placeholder="Tell us about your vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="font-serif-display transition-opacity hover:opacity-80 w-full sm:w-auto"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--plaster-ivory)',
                    background: 'var(--near-black)',
                    padding: '1.1rem 2.5rem',
                  }}
                >
                  Plan Your Wedding
                </button>

                {reduced && (
                  <p
                    className="mt-4 font-serif-display italic"
                    style={{ fontSize: '0.85rem', color: 'var(--secondary-grey)' }}
                  >
                    {contact.whatsapp
                      ? 'Your enquiry will open in WhatsApp.'
                      : 'No WhatsApp number configured — please use the email above.'}
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
