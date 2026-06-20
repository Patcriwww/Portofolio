import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ title, company, period, achievements, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
      <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-border last:hidden" />
      
      <div className="group">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
            <p className="text-base font-medium text-muted-foreground mt-0.5">
              {company}
            </p>
            <p className="text-sm text-muted-foreground/80 mt-1">
              {period}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 ml-14">
          {achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
              <span className="text-accent mt-1.5 flex-shrink-0">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;