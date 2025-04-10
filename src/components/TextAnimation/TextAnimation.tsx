import React, { useEffect, useRef, useState } from "react";
import styles from "./TextAnimation.module.css";

type TextAnimationProps = {
  texts: string[];
  color?: string;
};

export const TextAnimation: React.FC<TextAnimationProps> = ({
  texts,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true); // Запускаємо анімацію тільки один раз
        }
      },
      { threshold: 0.5 }
    );

    const current = containerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      {texts.map((text, rowIndex) => (
        <div className={styles.textRow} key={rowIndex}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={`${styles.letter} ${
                hasAnimated ? styles.animate : ""
              }`}
              style={{ animationDelay: `${i * 0.05}s`, color: color }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
