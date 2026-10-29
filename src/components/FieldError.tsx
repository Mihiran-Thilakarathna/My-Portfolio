import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

// Inline field error for useFormValidation
const FieldError: React.FC<{ name: string; message?: string }> = ({ name, message }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.span
        key="error"
        id={`${name}-error`}
        className="field-error"
        role="alert"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <FiAlertCircle aria-hidden="true" />
        {message}
      </motion.span>
    )}
  </AnimatePresence>
);

export default FieldError;
