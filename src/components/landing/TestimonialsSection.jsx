import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "A Gestão Móveis revolucionou nossa operação. O funil de vendas nos deu clareza e aumentamos nosso faturamento em 30% em apenas três meses!",
    name: 'Ana Maria Souza',
    title: 'Diretora, Móveis Design',
  },
  {
    quote: "Finalmente uma plataforma que entende as necessidades de uma loja de planejados. A integração com Promob é um divisor de águas para nossa equipe de projetos.",
    name: 'Carlos Andrade',
    title: 'Gerente, Casa Conceito',
  },
  {
    quote: "O controle financeiro e os relatórios de comissão são incrivelmente fáceis de usar. Economizamos horas de trabalho administrativo toda semana.",
    name: 'Juliana Ferreira',
    title: 'Proprietária, Ambientes Únicos',
  },
];

const TestimonialCard = ({ quote, name, title, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="h-full flex flex-col justify-between">
      <CardContent className="pt-6">
        <div className="flex text-yellow-400 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
        </div>
        <blockquote className="text-gray-600 italic">"{quote}"</blockquote>
      </CardContent>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center">
           <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0">
             <img  
                className="w-full h-full object-cover rounded-full"
                alt={`Foto de ${name}`}
              src="https://images.unsplash.com/photo-1584555912641-faae18f45744" />
           </div>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            A confiança e o sucesso dos nossos parceiros são nossa maior conquista.
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;