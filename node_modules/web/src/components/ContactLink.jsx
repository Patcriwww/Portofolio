import React from 'react';
import { motion } from 'framer-motion';

const ContactLink = ({ icon: Icon, label, value, href, index }) => {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200 group"
    >
      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground font-medium">
          {label}
        </p>
        <p className="text-base text-foreground font-medium mt-0.5 group-hover:text-primary transition-colors duration-200">
          {value}
        </p>
      </div>
    </motion.a>
  );
};

export default ContactLink;