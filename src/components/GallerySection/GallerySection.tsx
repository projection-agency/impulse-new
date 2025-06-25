import { useEffect, useRef, useState } from "react";
import s from "./GallerySection.module.css";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const GallerySection = () => {
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const galleryImageRef = useRef<HTMLImageElement | null>(null);
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const [business, setBusiness] = useState(false);
  const isMobile = width < 1024;
  const [imageLoaded, setImageLoaded] = useState(false);

  const gallery = [
    {
      image: business
        ? "/images/business-gallery/1.avif"
        : "/images/gallery/1.avif",
    },
    {
      image: business
        ? "/images/business-gallery/2.avif"
        : "/images/gallery/2.avif",
    },
    {
      image: business
        ? "/images/business-gallery/3.avif"
        : "/images/gallery/3.avif",
    },
    {
      image: business
        ? "/images/business-gallery/4.avif"
        : "/images/gallery/4.avif",
    },
    {
      image: business
        ? "/images/business-gallery/5.avif"
        : "/images/gallery/5.avif",
    },
    {
      image: business
        ? "/images/business-gallery/6.avif"
        : "/images/gallery/6.avif",
    },
    {
      image: business
        ? "/images/business-gallery/7.avif"
        : "/images/gallery/7.avif",
    },
    {
      image: business
        ? "/images/business-gallery/8.avif"
        : "/images/gallery/8.avif",
    },
    {
      image: business
        ? "/images/business-gallery/9.avif"
        : "/images/gallery/9.avif",
    },
    {
      image: business
        ? "/images/business-gallery/10.avif"
        : "/images/gallery/10.avif",
    },
  ];

  const offset = isMobile ? "600" : "450";

  useEffect(() => {
    const img = galleryImageRef.current;
    if (!img) return;

    const handleLoad = () => setImageLoaded(true);

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, [business]);

  useEffect(() => {
    if (!gallerySectionRef.current || !galleryImageRef.current || !imageLoaded) return;

    galleryImageRef.current.style.webkitMaskSize = isMobile
      ? "10vw 10vw"
      : "0%";
    galleryImageRef.current.style.maskSize = isMobile ? "10vw 10vw" : "0%";
    galleryImageRef.current.style.webkitMaskPosition = "center 40vw";
    galleryImageRef.current.style.maskPosition = "center 40vw";

    const animation = gsap.fromTo(
      galleryImageRef.current,
      {
        WebkitMaskSize: isMobile ? "10vw 10vw" : "0%",
        maskSize: isMobile ? "10vw 10vw" : "0%",
        WebkitMaskPosition: "center 40vw",
      },
      {
        WebkitMaskSize: isMobile ? "1000%" : "300%",
        maskSize: isMobile ? "1000%" : "300%",
        WebkitMaskPosition: "center -40vw",
        ease: "power3.out",
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: isMobile ? "top 50%" : "top top",
          end: isMobile ? "+=500" : "+=100",
          scrub: 1.5,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [isMobile, imageLoaded]);

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [pathname]);

  useEffect(() => {
    switch (pathname) {
      case "/business-tours":
        setBusiness(true);
        break;
      case "/private-tours":
        setBusiness(false);

        break;
      default:
        setBusiness(false);

        break;
    }
  }, [pathname]);

  const { t } = useTranslation();

  return (
    <section id="tour-memories" ref={gallerySectionRef} className={s.section}>
      <div className={s.marquee}>
        <div className={s.marqueeInner}>
          <h2>{t("galleryTitle")} </h2>
        </div>
      </div>

      <div className={s.galleryBlock}>
        
        <img
          ref={galleryImageRef}
          src={
            business
              ? "/images/business-galley-bg.avif"
              : "/images/gallery-bg.avif"
          }
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
