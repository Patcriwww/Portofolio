import React from 'react';
import { motion } from 'framer-motion';

const SkillCategory = ({ category, skills, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-muted rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
            className="px-3 py-1.5 bg-card text-foreground text-sm font-medium rounded-lg border border-border hover:border-primary hover:text-primary transition-all duration-200 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCategory;