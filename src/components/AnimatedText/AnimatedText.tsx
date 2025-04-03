import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
}

export const AnimatedText: React.FC<AnimatedHeadingProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("animated-heading");
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Викликати при завантаженні сторінки

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.h1
      id="animated-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.h1>
  );
};
