

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import {
  motion, useScroll, useTransform, AnimatePresence, useInView,
  useMotionValue, useSpring, useReducedMotion,
} from 'framer-motion';
import {
  ChevronDown, Star, Users, Award, Clock, MapPin, Phone, Mail,
  Plus, Minus, Zap, Target, Heart, Play,
} from 'lucide-react';
import { FaPlay } from "react-icons/fa";
import Image1 from '../assets/g.jpg';
import Image2 from '../assets/1.png';
import Image3 from '../assets/y.png';
import HeroImage from '../assets/b.png';
import AboutVideo from '../assets/vid1.mp4';
import GymPromoVideo from '../assets/vid3.mp4';

const servicesData = [
  {
    title: "Personal Training",
    description: "One-on-one sessions with certified trainers",
    features: ["Customized workout plans", "Nutrition guidance", "Progress tracking", "24/7 support"],
    icon: Target,
    gradient: "from-red-500 to-red-700",
  },
  {
    title: "Group Classes",
    description: "High-energy group fitness sessions",
    features: ["Variety of class types", "Experienced instructors", "Community atmosphere", "Flexible scheduling"],
    icon: Users,
    gradient: "from-red-500 to-red-700",
  },
  {
    title: "Premium Membership",
    description: "Full access to all facilities and services",
    features: ["Unlimited gym access", "All group classes", "Personal trainer sessions", "Nutrition consultation"],
    icon: Zap,
    gradient: "from-red-500 to-red-700",
  },
];

const faqsData = [
  {
    question: "What are your operating hours?",
    answer: "We're open Monday through Friday from 5:00 AM to 11:00 PM, weekends from 6:00 AM to 10:00 PM.",
  },
  {
    question: "Do you offer trial memberships?",
    answer: "Yes! We offer a 7-day free trial that includes access to all facilities and one complimentary personal training session.",
  },
  {
    question: "What safety protocols do you follow?",
    answer: "We maintain the highest cleanliness standards, provide sanitizing stations throughout the facility, and ensure all equipment is regularly maintained and cleaned.",
  },
  {
    question: "Can I freeze my membership?",
    answer: "Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel.",
  },
  {
    question: "Do you have parking available?",
    answer: "We provide free parking for all members with over 200 spaces available, including covered parking options.",
  },
];

// Utility: AlternatingSection
const AlternatingSection = ({
  imageSrc, title, highlightWord, description, imageLeft = true,
}) => {
  const imageVariants = {
    hidden: { opacity: 0, x: imageLeft ? -80 : 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: imageLeft ? 80 : -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 bg-black">
      <div className={`flex flex-col md:flex-row items-center gap-10 ${!imageLeft ? "md:flex-row-reverse" : ""}`}>
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <div className="w-[350px] h-[260px] md:w-[400px] md:h-[300px] rounded-2xl shadow-xl overflow-hidden border-2 border-red-600">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex flex-col md:pl-10 mt-8 md:mt-0 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug">
            {title.split(" ").map((word, i) =>
              word.toLowerCase() === highlightWord.toLowerCase()
                ? (<span key={i} className="text-red-500">{word} </span>)
                : (<span key={i}>{word} </span>)
            )}
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const GymHomePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const prefersReducedMotion = useReducedMotion();

  // Fix: Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    // This ensures browser does not auto-restore scroll (cross-browser)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  };
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const handleMouseMove = useCallback(
    debounce((e) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }, 30),
    [mouseX, mouseY, prefersReducedMotion]
  );

  const services = useMemo(() => servicesData, []);
  const faqs = useMemo(() => faqsData, []);

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  };

  const FloatingCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
    <section
    ref={heroRef}
     className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    style={{ marginTop: 0, paddingTop: 0 }}
    >
    {/* Background Glow Layers */}
    <div className="absolute inset-0">
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-90"></div>

        {/* Extra dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Glow Orbs */}
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-orange-600/40 blur-[220px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-600/30 blur-[200px]"></div>
        <div className="absolute bottom-20 right-1/2 w-[300px] h-[300px] rounded-full bg-yellow-500/20 blur-[150px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
        >
        <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            Push Your{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Limits
            </span>{" "}
            With Us
        </motion.h1>
        
        <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            From beginner to advanced, experience workouts designed to help you
            achieve peak performance and exceed your fitness goals.
        </motion.p>
        
        {/* Buttons */}
        <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
        >
            <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-red-600/40 transition-all">
            Join Now
            </button>
            
            <button className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
            <Play size={20} className="text-red-400" fill="currentColor" />
            Watch Video
            </button>
        </motion.div>

        {/* Floating tags */}
        <motion.div
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
        >
            {[
            "Personal Training",
            "Strength",
            "Group Classes",
            "Swimming",
            "Cardio Equipment",
            "Functional Workouts",
            ].map((tag, i) => (
            <span
                key={i}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 text-sm font-medium text-gray-200 border border-red-500/30"
            >
                {tag}
            </span>
            ))}
        </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.3 }}
        className="relative flex justify-center -mt-10"
        >
        <img
            src={HeroImage}
            alt="Fitness professional running"
            className="w-full h-auto max-w-xl object-cover drop-shadow-[0_0_60px_rgba(255,60,0,0.6)] hover:scale-105 transition-transform duration-700 ease-out"
        />
        </motion.div>
    </div>

    {/* Scroll Indicator */}
    {!prefersReducedMotion && (
        <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        aria-hidden="true"
        >
        <ChevronDown size={36} className="text-red-400" />
        </motion.div>
    )}
    </section>


{/* About Section */}
<section className="relative bg-black text-white py-20 px-6 lg:px-20">
  <div className="max-w-7xl mx-auto text-center space-y-6">
    


    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-4xl md:text-5xl font-extrabold"
    >
      YOUR <span className="text-red-500">FITNESS</span> JOURNEY STARTS HERE
    </motion.h2>

    {/* Paragraph */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
    >
      At FFL Gym, we are dedicated to helping you unlock your full fitness potential.
      With top-tier equipment, expert trainers, and a welcoming community, we provide
      the perfect environment to push your limits and achieve your goals.
    </motion.p>
  </div>


<div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
  {[
    { value: "12+", label: "Years of Excellence" },
    { value: "27K+", label: "Members" },
    { value: "60+", label: "Weekly Classes" },
    { value: "117+", label: "Expert Trainers" },
  ].map((stat, i) => {
    // Split value into number and plus sign
    const number = stat.value.replace("+", "");
    const plus = stat.value.includes("+") ? "+" : "";

    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: i * 0.2 }}
        className="space-y-2"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          {number}
          {plus && <span className="text-red-500">{plus}</span>}
        </h3>
        <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
      </motion.div>
    );
  })}
</div>

  {/* Background Video with Play Button */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="relative w-full max-w-[90%] mx-auto mt-16 rounded-2xl overflow-hidden shadow-lg"
>
  <video
    controls
    autoPlay
    muted
    className="w-full h-[500px] object-cover rounded-2xl"
  >
    <source src={AboutVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</motion.div>

</section>


<AlternatingSection
  imageSrc={Image1}
  title="Train Like a Pro"
  highlightWord="Pro"
  description={`Unlock your full potential with personalized guidance from top-tier trainers. 
Every session is designed to challenge and inspire you. 
Learn proper techniques to maximize results and prevent injuries. 
Experience a training journey tailored just for you.`}
  imageLeft={true}
/>

<AlternatingSection
  imageSrc={Image2}
  title="Join Group Classes"
  highlightWord="Group"
  description={`Engage in high-energy group sessions that keep your motivation high. 
Connect with like-minded fitness enthusiasts and push each other. 
From cardio to strength, every class is dynamic and fun. 
Feel the energy and achieve more together in every session.`}
  imageLeft={false}
/>

<AlternatingSection
  imageSrc={Image3}
  title="Premium Membership"
  highlightWord="Premium"
  description={`Get full access to all classes, equipment, and exclusive training zones. 
Enjoy priority scheduling and dedicated trainer support. 
Take your fitness journey to the next level with personalized perks. 
Experience the ultimate commitment to your health and goals.`}
  imageLeft={true}
/>


     {/* Stats Section */}
<AnimatedSection className="py-24 bg-black relative overflow-hidden">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-red-400/15 rounded-full blur-3xl"></div>
  </div>
  
  <motion.div
    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
    style={{ willChange: "transform" }}
  />
  
  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <motion.div
      variants={staggerContainer}
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    >
      {[
        { number: "2,500+", label: "Active Members", icon: Users, color: "red" },
        { number: "50+", label: "Expert Trainers", icon: Award, color: "red" },
        { number: "15", label: "Years Experience", icon: Clock, color: "red" },
        { number: "24/7", label: "Support Available", icon: Heart, color: "red" }
      ].map((stat, index) => {
        // Split number and plus sign for styling
        const numberPart = stat.number.replace("+", "");
        const hasPlus = stat.number.includes("+");
        
        return (
          <FloatingCard
            key={index}
            delay={index * 0.2}
            className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/50 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl -m-0.5"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-3xl"></div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600/50"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600/50"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600/50"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600/50"></div>
            
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-red-600/20 blur-md rounded-full transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
              <stat.icon
                size={48}
                className="mx-auto text-red-500 relative z-10 drop-shadow-lg"
              />
            </motion.div>
            
            <motion.div
              className="text-4xl font-bold mb-3 text-white relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-md">
                {numberPart}
                {hasPlus && <span className="text-red-500">+</span>}
              </span>
            </motion.div>
            
            <div className="text-lg font-medium text-gray-300 relative">
              <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                {stat.label}
              </span>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/5 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500/40 rounded-full"
                  initial={{ 
                    opacity: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50
                  }}
                  whileInView={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </FloatingCard>
        );
      })}
    </motion.div>
  </div>
</AnimatedSection>


     {/* Services Section */}
<AnimatedSection className="py-24 bg-black relative">
  <div className="max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <motion.h2
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <span className="text-white">OUR </span>
        <span className="text-red-600">SERVICES</span>
      </motion.h2>
      <motion.p
        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Choose from our comprehensive range of fitness programs designed to meet every goal
      </motion.p>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: index * 0.3 }}
          whileHover={{
            y: -10,
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className={`p-8 rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-sm relative overflow-hidden bg-gray-800/70 shadow hover:shadow-2xl border border-gray-700`}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Icon without animation */}
          <div className="mb-6">
            <service.icon
              size={48}
              className="text-red-600"
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
          <p className="mb-6 leading-relaxed text-gray-300">
            {service.description}
          </p>
          <div className="text-3xl font-bold mb-8 text-red-600">{service.price}</div>
          <ul className="space-y-4">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Star
                  size={18}
                  className="mr-4 text-red-600"
                />
                <span className="leading-relaxed text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</AnimatedSection>


      {/* Testimonials Section */}
      <AnimatedSection className="py-24 bg-black relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <motion.h2
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <span className="text-red-600">SUCCESS </span>
        <span className="text-white">STORIES</span>
      </motion.h2>
      <motion.p
        className="text-xl text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Real transformations from our amazing community
      </motion.p>
    </motion.div>

    <motion.div
      variants={staggerContainer}
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {[
        {
          name: "Sarah Johnson",
          result: "Lost 40lbs in 4 months",
          text: "The personalized training and community support made all the difference in my transformation journey.",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3",
          rating: 5
        },
        {
          name: "Mike Thompson",
          result: "Gained 20lbs muscle",
          text: "Professional trainers and state-of-the-art equipment helped me achieve my bodybuilding goals.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
          rating: 5
        },
        {
          name: "Emily Chen",
          result: "Marathon finisher",
          text: "From couch to marathon runner in 8 months. The structured training program was incredible.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
          rating: 5
        }
      ].map((testimonial, index) => (
        <FloatingCard
          key={index}
          delay={index * 0.3}
          className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-700"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
            style={{ willChange: "transform" }}
          />
          <div className="flex items-center mb-6">
            <motion.img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-red-600"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
              <p className="text-red-500 font-semibold">{testimonial.result}</p>
            </div>
          </div>
          <motion.div
            className="flex mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.7 }}
                viewport={{ once: true }}
                style={{ willChange: "transform" }}
              >
                <Star size={18} className="text-red-600 fill-current" />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-gray-300 italic leading-relaxed">"{testimonial.text}"</p>
        </FloatingCard>
      ))}
    </motion.div>
  </div>
</AnimatedSection>


     {/* Contact Section */}
<AnimatedSection className="py-24 bg-black relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-20">
        <motion.h2
        className="text-5xl font-bold mb-8 text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        >
        GET IN <span className="text-red-600">TOUCH</span>
        </motion.h2>
      <motion.p
        className="text-xl text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Ready to start your fitness journey? We're here to help!
      </motion.p>
    </motion.div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <motion.div variants={fadeInUp} className="space-y-10">
        {[
          { icon: MapPin, title: "Visit Our Gym", detail: "Ovation Kokapet", color: "red" },
          { icon: Phone, title: "Call Us", detail: "99851 41235", color: "red" },
          { icon: Mail, title: "Email Us", detail: "Dottfit@gmail.com", color: "red" }
        ].map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ x: 10, transition: { duration: 0.3 } }}
            className="flex items-center space-x-6"
          >
            <motion.div
              className="p-6 rounded-full bg-gray-700"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <contact.icon
                size={28}
                className="text-red-600"
              />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{contact.title}</h3>
              <p className="text-gray-300 text-lg">{contact.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
     <motion.div
  variants={fadeInUp}
  className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-700"
>
  <motion.video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
  >
    <source src={GymPromoVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </motion.video>

  {/* Optional Overlay */}
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h3 className="text-white text-3xl lg:text-4xl font-bold text-center px-4">
      Transform Your Body with Us
    </h3>
  </div>
</motion.div>

    </div>
  </div>
</AnimatedSection>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full will-change-transform"
              aria-hidden="true"
            />
            <motion.div
              animate={{
                rotate: -360,
                y: [0, -30, 0],
              }}
              transition={{
                rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-lg will-change-transform"
              aria-hidden="true"
            />
          </>
        )}
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
        <motion.h2
        className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        viewport={{ once: true }}
        >
        <span className="text-red-600">READY TO ELEVATE </span>
        <span className="text-white">YOUR LIFE?</span>
        </motion.h2>

            <motion.p
              className="text-xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Join thousands of members who have transformed their lives with our proven fitness programs
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "white",
                  color: "#DC2626",
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-red-700 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gray-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                />
                <span className="relative z-10">Start Free Trial</span>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "#1F2937",
                  borderColor: "#1F2937",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-white rounded-full font-bold text-lg transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gray-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Schedule Tour</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GymHomePage;
