import {ReactNode} from 'react';
import { motion } from 'framer-motion';
import {fadeInUp} from "@/lib/framer-motion-animation";

interface StandardMotionBoxProps {
  id?: string;
  className: string;
  children: ReactNode;
}

const StandardMotionBox = ({id, children, className}: StandardMotionBoxProps) => {
    return (
        <motion.div
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default StandardMotionBox;