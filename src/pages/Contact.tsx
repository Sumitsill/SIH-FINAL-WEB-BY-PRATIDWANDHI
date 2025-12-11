import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', role: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: 'Support Hotline',
      value: '011-24364243',
      description: 'Available 9 AM – 9 PM (Mon–Sat)',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'Email Us',
      value: 'itdivisionhq-sai@gov.in',
      description: 'For queries, feedback, or issues',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: 'SAI Head Office',
      value: 'Jawaharlal Nehru Stadium, New Delhi-110003',
      description: 'Collaboration office with Sports Authority of India',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Response Time',
      value: 'Within 24 hours',
      description: 'Usually faster for urgent concerns',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-black py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            🤝 {t('contact.title')} <span className="text-cyan-400">{t('contact.team')}</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 backdrop-blur">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Send className="text-cyan-400" />
              <span>{t('contact.send_msg')}</span>
            </h3>

            {isSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle className="h-14 w-14 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold">{t('contact.success')}</h4>
                <p className="text-gray-300 mt-2">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.name')}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.email')}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder={t('contact.form.role')}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder={t('contact.form.message')}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{t('contact.form.submit')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 backdrop-blur">
              <h3 className="text-xl font-semibold mb-4">📍 {t('contact.details')}</h3>
              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition"
                  >
                    <div className="text-cyan-400">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-cyan-300">{item.value}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-900/20 p-6 rounded-2xl border border-red-500/50">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="text-red-400 h-6 w-6" />
                <h4 className="text-lg font-semibold text-white">{t('contact.emergency')}</h4>
              </div>
              <p className="text-gray-300 mb-3">
                {t('contact.emergency_desc')}
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  📞 <strong>011-24364243</strong>
                </p>
                <p className="text-white">
                  📧 <strong>itdivisionhq-sai@gov.in</strong>
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-3">Available 24x7 for mission-critical help.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
