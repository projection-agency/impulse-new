import { useEffect, useState, useRef } from "react";
import s from "./GallerySection.module.css";
import "aos/dist/aos.css";

const gallery = [
  { image: "/images/gallery/1.avif" },
  { image: "/images/gallery/2.avif" },
  { image: "/images/gallery/3.avif" },
  { image: "/images/gallery/4.avif" },
  { image: "/images/gallery/5.avif" },
  { image: "/images/gallery/6.avif" },
  { image: "/images/gallery/7.avif" },
  { image: "/images/gallery/8.avif" },
  { image: "/images/gallery/9.avif" },
  { image: "/images/gallery/10.avif" },
];

export const GallerySection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setIsScrolled(rect.top <= -100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    imagesRef.current.forEach((img) => {
      if (img) {
        img.style.transform = `translate(${Math.random() * 100 - 50}px, ${
          Math.random() * 100 - 50
        }px) `;
      }
    });
  }, []);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    const img = imagesRef.current[index];
    if (!img) return;

    const startX = e.clientX;
    const startY = e.clientY;

    img.style.transition = "none"; // Вимикаємо плавні переходи під час руху
    img.style.animation = "none"; // Вимикаємо анімацію
    img.style.zIndex = "9";

    const handleMouseMove = (event: MouseEvent) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (img) {
        img.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const handleMouseUp = () => {
      if (img) {
        img.style.transition = "transform 0.5s ease"; // Повертаємо плавний ефект
        img.style.transform = "translate(0, 0)";
        img.style.zIndex = "";
        setTimeout(() => {
          img.style.animation = ""; // Повертаємо анімацію після завершення
        }, 500);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section ref={sectionRef} className={s.section}>
      <div className={s.marquee}>
        <div className={s.marqueeInner}>
          <h2>Сотни клиентов, которые доверились нам</h2>
          <h2>Сотни клиентов, которые доверились нам</h2>
          <h2>Сотни клиентов, которые доверились нам</h2>
        </div>
      </div>

      <div className={s.galleryBlock}>
        <img
          src="/images/gallery-bg.avif"
          alt="The forest"
          className={`${s.galleryImage} ${isScrolled ? s.scrolled : ""}`}
        />

        <ul className={s.galleryList}>
          {gallery.map((image, index) => (
            <li
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              onMouseDown={(e) => handleMouseDown(e, index)}
              style={{ transition: "transform 0.5s ease", cursor: "grab" }}
            >
              <img src={image.image} alt="image" draggable={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
