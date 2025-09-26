import { motion, Variants } from 'framer-motion';

// Crisp animation variants with sharp easing
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
        }
    }
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
};

export const snapIn: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { 
        duration: 0.35, 
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        damping: 20,
        stiffness: 300
        }
    }
};