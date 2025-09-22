// import React, { useRef } from 'react';
// import { motion, useInView, useScroll, useTransform } from 'framer-motion';
// import { Target, Users, Zap, Heart, Star, Run, Dumbbell, Shield, Sun } from 'lucide-react';
// import HeroServiceImage from '../assets/100.jpg'; // Add a new hero image for services
// import ServicePT from '../assets/101.jpg'; // Add images for each service
// import ServiceGroup from '../assets/102.jpg';
// import ServiceMembership from '../assets/103.jpg';
// import ServiceYoga from '../assets/100.jpg';
// import ServiceNutrition from '../assets/101.jpg';
// import ServiceSpa from '../assets/102.jpg';


// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 50 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
// };

// const servicesData = [
//   {
//     title: "Personal Training",
//     description: "One-on-one sessions tailored to your unique goals with certified expert trainers.",
//     features: ["Custom plans", "Nutrition guidance", "Progress tracking", "24/7 support"],
//     icon: Target,
//     image: ServicePT,
//     gradient: "from-red-500 to-red-700",
//   },
//   {
//     title: "Group Classes",
//     description: "High-energy, motivating group fitness classes for all levels and interests.",
//     features: ["Variety of classes", "Experienced instructors", "Community atmosphere", "Flexible scheduling"],
//     icon: Users,
//     image: ServiceGroup,
//     gradient: "from-orange-500 to-orange-700",
//   },
//   {
//     title: "Premium Membership",
//     description: "Full access to all facilities, unlimited classes, and exclusive member perks.",
//     features: ["Unlimited gym access", "All group classes", "Personal trainer sessions", "Nutrition consultation"],
//     icon: Zap,
//     image: ServiceMembership,
//     gradient: "from-yellow-500 to-yellow-700",
//   },
//   {
//     title: "Yoga & Mindfulness",
//     description: "Find your balance and inner peace with our diverse range of yoga and meditation classes.",
//     features: ["Vinyasa, Hatha, Restorative", "Experienced Zen masters", "Stress reduction", "Flexibility & strength"],
//     icon: Sun,
//     image: ServiceYoga,
//     gradient: "from-green-500 to-green-700",
//   },
//   {
//     title: "Nutritional Coaching",
//     description: "Personalized diet plans and expert advice to fuel your body for optimal performance and health.",
//     features: ["Custom meal plans", "Dietary assessments", "Supplement guidance", "Behavioral change support"],
//     icon: Heart,
//     image: ServiceNutrition,
//     gradient: "from-purple-500 to-purple-700",
//   },
//   {
//     title: "Wellness & Spa",
//     description: "Rejuvenate your body and mind with our luxury spa services, including massage and recovery.",
//     features: ["Sports massage", "Infrared sauna", "Cold plunge therapy", "Recovery zones"],
//     icon: Shield,
//     image: ServiceSpa,
//     gradient: "from-blue-500 to-blue-700",
//   },
// ];

// const ServicesPage = () => {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const yParallax = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const FloatingCard = ({ children, className = "", delay = 0 }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 50, scale: 0.95 }}
//       animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
//       transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
//       whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
//       className={className}
//       style={{ willChange: "transform, opacity" }}
//     >
//       {children}
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       {/* Hero Section */}
//       <section ref={heroRef} className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HeroServiceImage})`, backgroundAttachment: 'fixed' }}>
//           {/* Subtle glowing overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-black/40 to-orange-600/10 backdrop-blur-sm"></div>
//           {/* Dark vignette overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
//         </div>
//         <motion.div
//           className="relative z-10 text-center px-6"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, delay: 0.3 }}
//           style={{ y: yParallax }}
//         >
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
//             Our <span className="text-red-500">Services</span>
//           </h1>
//           <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md">
//             Unlock your full potential with our comprehensive fitness and wellness programs.
//           </p>
//         </motion.div>
//       </section>

//       {/* Services Grid Section */}
//       <motion.section
//         ref={sectionRef}
//         className="py-24 bg-black relative"
//         initial="hidden"
//         animate={isInView ? "show" : "hidden"}
//         variants={containerVariants}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
//           <motion.h2
//             className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
//             variants={itemVariants}
//           >
//             Explore Our Diverse <span className="text-red-500">Offerings</span>
//           </motion.h2>
//           <motion.p
//             className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16"
//             variants={itemVariants}
//           >
//             We provide a wide range of services designed to cater to every fitness level and personal goal.
//           </motion.p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {servicesData.map((service, index) => (
//               <FloatingCard
//                 key={index}
//                 delay={index * 0.15}
//                 className="bg-gray-800 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm relative overflow-hidden group"
//               >
//                 {/* Image for the service */}
//                 <div className="h-56 overflow-hidden rounded-t-3xl">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className="p-8">
//                   <div className="flex items-center justify-center mb-6 relative">
//                     {/* Icon with glowing background */}
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-75 group-hover:scale-100"
//                       initial={{ scale: 0.8 }}
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <service.icon size={48} className="text-red-500 relative z-10 drop-shadow-lg" />
//                   </div>

//                   <h3 className="text-3xl font-bold mb-4 text-white">{service.title}</h3>
//                   <p className="mb-6 leading-relaxed text-gray-300 text-center">
//                     {service.description}
//                   </p>

//                   <ul className="space-y-3 text-left">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-gray-300">
//                         <Star size={18} className="mr-3 text-red-500 flex-shrink-0" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </FloatingCard>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Why Choose Us Section */}
//       <motion.section
//         className="py-24 bg-gray-900 relative overflow-hidden"
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//       >
//         {/* Animated background glows */}
//         <motion.div
//           className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[200px]"
//           initial={{ rotate: 0 }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute bottom-0 -left-40 w-[700px] h-[700px] rounded-full bg-red-600/10 blur-[250px]"
//           initial={{ rotate: 360 }}
//           animate={{ rotate: 0 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//         />

//         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
//           <motion.h2
//             className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
//             variants={itemVariants}
//           >
//             Why Choose <span className="text-red-500">FFL Gym</span>?
//           </motion.h2>
//           <motion.p
//             className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16"
//             variants={itemVariants}
//           >
//             We're more than just a gym; we're a partner in your wellness journey.
//           </motion.p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               {
//                 icon: Dumbbell,
//                 title: "Expert Trainers",
//                 description: "Learn from the best. Our certified professionals are dedicated to your success.",
//               },
//               {
//                 icon: Run,
//                 title: "State-of-the-Art Equipment",
//                 description: "Access the latest and most effective fitness technology for superior workouts.",
//               },
//               {
//                 icon: Users,
//                 title: "Supportive Community",
//                 description: "Join a thriving environment where members inspire and uplift each other.",
//               },
//             ].map((reason, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm relative group"
//                 variants={itemVariants}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
//                 whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
//               >
//                 <div className="mb-6 relative z-10">
//                   <reason.icon size={48} className="text-red-500 mx-auto" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{reason.title}</h3>
//                 <p className="text-gray-300 leading-relaxed relative z-10">{reason.description}</p>
//                 {/* Subtle gradient overlay on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/5 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default ServicesPage;

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Target, Users, Zap, Heart, Star, Footprints, Dumbbell, Shield, Sun } from 'lucide-react';

// Make sure these images exist in your assets folder
import HeroServiceImage from '../assets/100.jpg';
import ServicePT from '../assets/101.jpg';
import ServiceGroup from '../assets/102.jpg';
import ServiceMembership from '../assets/103.jpg';
import ServiceYoga from '../assets/100.jpg';
import ServiceNutrition from '../assets/101.jpg';
import ServiceSpa from '../assets/102.jpg';


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const servicesData = [
  {
    title: "Personal Training",
    description: "One-on-one sessions tailored to your unique goals with certified expert trainers.",
    features: ["Custom plans", "Nutrition guidance", "Progress tracking", "24/7 support"],
    icon: Target,
    image: ServicePT,
    gradient: "from-red-500 to-red-700",
  },
  {
    title: "Group Classes",
    description: "High-energy, motivating group fitness classes for all levels and interests.",
    features: ["Variety of classes", "Experienced instructors", "Community atmosphere", "Flexible scheduling"],
    icon: Users,
    image: ServiceGroup,
    gradient: "from-orange-500 to-orange-700",
  },
  {
    title: "Premium Membership",
    description: "Full access to all facilities, unlimited classes, and exclusive member perks.",
    features: ["Unlimited gym access", "All group classes", "Personal trainer sessions", "Nutrition consultation"],
    icon: Zap,
    image: ServiceMembership,
    gradient: "from-yellow-500 to-yellow-700",
  },
  {
    title: "Yoga & Mindfulness",
    description: "Find your balance and inner peace with our diverse range of yoga and meditation classes.",
    features: ["Vinyasa, Hatha, Restorative", "Experienced Zen masters", "Stress reduction", "Flexibility & strength"],
    icon: Sun,
    image: ServiceYoga,
    gradient: "from-green-500 to-green-700",
  },
  {
    title: "Nutritional Coaching",
    description: "Personalized diet plans and expert advice to fuel your body for optimal performance and health.",
    features: ["Custom meal plans", "Dietary assessments", "Supplement guidance", "Behavioral change support"],
    icon: Heart,
    image: ServiceNutrition,
    gradient: "from-purple-500 to-purple-700",
  },
  {
    title: "Wellness & Spa",
    description: "Rejuvenate your body and mind with our luxury spa services, including massage and recovery.",
    features: ["Sports massage", "Infrared sauna", "Cold plunge therapy", "Recovery zones"],
    icon: Shield,
    image: ServiceSpa,
    gradient: "from-blue-500 to-blue-700",
  },
];

const ServicesPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const FloatingCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HeroServiceImage})`, backgroundAttachment: 'fixed' }}>
          {/* Subtle glowing overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-black/40 to-orange-600/10 "></div>
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
        </div>
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{ y: yParallax }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
            Our <span className="text-red-500">Services</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md">
            Unlock your full potential with our comprehensive fitness and wellness programs.
          </p>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <motion.section
        ref={sectionRef}
        className="py-24 bg-black relative"
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
            variants={itemVariants}
          >
            Explore Our Diverse <span className="text-red-500">Offerings</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16"
            variants={itemVariants}
          >
            We provide a wide range of services designed to cater to every fitness level and personal goal.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service, index) => (
              <FloatingCard
                key={index}
                delay={index * 0.15}
                className="bg-gray-800 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Image for the service */}
                <div className="h-56 overflow-hidden rounded-t-3xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-center mb-6 relative">
                    {/* Icon with glowing background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-75 group-hover:scale-100"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <service.icon size={48} className="text-red-500 relative z-10 drop-shadow-lg" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="mb-6 leading-relaxed text-gray-300 text-center">
                    {service.description}
                  </p>

                  <ul className="space-y-3 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Star size={18} className="mr-3 text-red-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-24 bg-gray-900 relative overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Animated background glows */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[200px]"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-[700px] h-[700px] rounded-full bg-red-600/10 blur-[250px]"
          initial={{ rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
            variants={itemVariants}
          >
            Why Choose <span className="text-red-500">FFL Gym</span>?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16"
            variants={itemVariants}
          >
            We're more than just a gym; we're a partner in your wellness journey.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Dumbbell,
                title: "Expert Trainers",
                description: "Learn from the best. Our certified professionals are dedicated to your success.",
              },
              {
                icon: Footprints, // Corrected icon name
                title: "State-of-the-Art Equipment",
                description: "Access the latest and most effective fitness technology for superior workouts.",
              },
              {
                icon: Users,
                title: "Supportive Community",
                description: "Join a thriving environment where members inspire and uplift each other.",
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm relative group"
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="mb-6 relative z-10">
                  <reason.icon size={48} className="text-red-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{reason.description}</p>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/5 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;