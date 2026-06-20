import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const EducationCard = ({ degree, university, year, field, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border group hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-200">
          <GraduationCap className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {degree}
          </h3>
          <p className="text-base font-medium text-muted-foreground mt-1">
            {university}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-muted-foreground/80">
              {field}
            </span>
            <span className="text-sm text-muted-foreground/60">•</span>
            <span className="text-sm font-medium text-accent">
              {year}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;