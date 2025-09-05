import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'react-toastify';

const Footer = () => {
  const showNotImplementedToast = () => {
    toast.info("🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀");
  };

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Github, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  const footerLinks = [
    { label: 'Sobre Nós', href: '#' },
    { label: 'Contato', href: '#' },
    { label: 'Preços', href: '#pricing' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h3 className="text-2xl font-bold">Gestão Móveis</h3>
            <p className="text-gray-400 text-base">
              A solução definitiva para a gestão de lojas de móveis planejados.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <button key={index} onClick={showNotImplementedToast} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{social.icon.displayName}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Navegação</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} onClick={(e) => { e.preventDefault(); showNotImplementedToast(); }} className="text-base text-gray-400 hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Móveis Gestão Empresarial. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;