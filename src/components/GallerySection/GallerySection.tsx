import { useEffect, useRef } from "react";
import s from "./GallerySection.module.css";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";

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

  const { width } = useWindowSize();

  const isMobile = width < 1024;

  const offset = isMobile ? "400" : "300";

  useEffect(() => {
    if (!gallerySectionRef.current || !galleryImageRef.current) return;

    galleryImageRef.current.style.webkitMaskSize = isMobile
      ? "10vw 10vw"
      : "7%";
    galleryImageRef.current.style.maskSize = isMobile ? "10vw 10vw" : "7%";
    galleryImageRef.current.style.webkitMaskPosition = "center 24vw";
    galleryImageRef.current.style.maskPosition = "center 24vw";

    const animation = gsap.fromTo(
      galleryImageRef.current,
      {
        WebkitMaskSize: isMobile ? "10vw 10vw" : "7%",
        maskSize: isMobile ? "10vw 10vw" : "7%",
        WebkitMaskPosition: "center 24vw",
      },
      {
        WebkitMaskSize: isMobile ? "1000%" : "300%",
        maskSize: isMobile ? "1000%" : "300%",
        WebkitMaskPosition: "center -40vw",
        ease: "power3.out",
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: isMobile ? "top -20%" : "top 1%",
          end: "+=100",
          scrub: 1,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [isMobile]);

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
        <Layout>
          <h3
            data-aos="fade-up"
            data-aos-offset="500"
            className={s.galleryTitle}
          >
            memories
          </h3>
        </Layout>
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
              data-aos-offset={offset}
              key={index}
            >
              <img src={image.image} alt="image" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
