
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);


const ContactForm: React.FC = () => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError(t('fillAllFields'));
            return;
        }
        setError('');
        setStatus('sending');

        const recipient = "williamxiao.mm@gmail.com";
        const subject = `Message from ${name} via Top 5 AI Contact Form`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        // We can't know if the user actually sent the email, but we can assume they did for UI purposes.
        setTimeout(() => {
            setStatus('sent');
            setName('');
            setEmail('');
            setMessage('');

            setTimeout(() => {
                setStatus('idle');
            }, 3000); // Reset button text after 3 seconds
        }, 500); // Give a brief moment for the mail client to open
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-heading)] mb-2">{t('fullName')}</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-heading)] mb-2">{t('emailAddress')}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors"
                        placeholder="you@example.com"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-heading)] mb-2">{t('message')}</label>
                <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors"
                    placeholder="How can we help you?"
                />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
                 <button 
                    type="submit"
                    disabled={status === 'sending' || status === 'sent'}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-bold rounded-lg transition-all duration-300 ${
                        status === 'sent' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-[var(--color-accent)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                >
                    {status === 'sent' ? (
                        <>
                            <CheckIcon className="w-6 h-6"/>
                            <span>{t('messageSent')}</span>
                        </>
                    ) : (
                        <>
                            <PaperAirplaneIcon className="w-5 h-5"/>
                            <span>{t('sendMessage')}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
