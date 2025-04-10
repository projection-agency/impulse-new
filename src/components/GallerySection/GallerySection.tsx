import { useEffect, useRef } from "react";
import s from "./GallerySection.module.css";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
gsap.registerPlugin(ScrollTrigger);

export const GallerySection = () => {
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const galleryImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!gallerySectionRef.current || !galleryImageRef.current) return;

    gsap.fromTo(
      galleryImageRef.current,
      {
        width: "5.8vw",
        height: "5.8vw",
        borderRadius: "50%",
        top: "25vw",
        left: "50%",
        transform: "translateX(-50%)",
      },
      {
        width: "100%",
        height: "100%",
        borderRadius: "0",
        top: "0",
        left: "0",
        transform: "none",
        ease: "power3.out",
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: "top top+=100",
          end: "+=300",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={gallerySectionRef} className={s.section}>
      <div className={s.marquee}>
        <div className={s.marqueeInner}>
          <h2>Сотни клиентов, которые доверились нам</h2>
          <h2>Сотни клиентов, которые доверились нам</h2>
          <h2>Сотни клиентов, которые доверились нам</h2>
        </div>
      </div>

      <div className={s.galleryBlock}>
        <img
          ref={galleryImageRef}
          src="/images/gallery-bg.avif"
          alt="The forest"
          className={s.galleryImage}
        />
        <ul className={`${s.galleryList} ${s.visible}`}>
          {gallery.map((image, index) => (
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="500"
              key={index}
            >
              <img src={image.image} alt="image" />
            </li>
          ))}
        </ul>
        ;
      </div>
    </section>
  );
};
