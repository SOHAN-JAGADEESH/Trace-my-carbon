'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
    style={{ zIndex: 12 }}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <img
        src="/logo1.svg"
        alt="logo"
        className="w-[39px] h-[39px] object-contain"
      />
      <h2 className="font-extrabold text-[24px] leading-[30px] text-white">Trace Your Carbon</h2>
      <img
        src="/logo1.svg"
        alt="menu"
        className="w-[39px] h-[39px] object-contain"
      />
    </div>
  </motion.nav>
);

export default Navbar;
