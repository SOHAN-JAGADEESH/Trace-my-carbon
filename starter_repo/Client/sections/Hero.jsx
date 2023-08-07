'use client';

import {motion} from  'framer-motion';

import styles from '../styles';
import {slideIn, staggerContainer, textVariant} from '../utils/motion';

const Hero = () => (
  <section >
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{once:false}}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
      style={{height: '95vh'}}
      
    >
      <div className='flex justify-center items-center flex-col relative z-10 pl-8 '>
        <motion.h1 variants={textVariant(1.1)}
        className={styles.heroHeading}>
          Know Your Impact 
        </motion.h1>
        <motion.div variants={textVariant(1.2)} className="flex flex-row  justify-center items-center">
          <h1 className={styles.heroHeading}>To Make An</h1>
        </motion.div>
        <motion.div variants={textVariant(1.3)} className="flex flex-row  justify-center items-center">
          <h1 className={styles.heroHeading}>Impact</h1>
        </motion.div>
      </div>
      <motion.div>
      <div className='absolute w-full h-full   z-[0] top-[0px]'>
          <img 
            src='/Frame 1.png'
            alt='backgroundimg'
            className='w-full h-full object-cover  z-10 relative'
          />
      </div>
      
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
