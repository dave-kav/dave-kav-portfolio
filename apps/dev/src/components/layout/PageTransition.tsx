import { motion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const isBlogsPage = location.pathname === '/blogs';

  const variants = {
    enter: {
      opacity: 0,
      x: isBlogsPage ? 100 : -100,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: isBlogsPage ? -100 : 100,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
}; 