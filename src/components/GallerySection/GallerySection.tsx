import { useEffect, useRef, useState } from "react";
import s from "./GallerySection.module.css";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";
import { useLocation } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export const GallerySection = () => {
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const galleryImageRef = useRef<HTMLImageElement | null>(null);
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const [business, setBusiness] = useState(false);
  const isMobile = width < 1024;

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

  const offset = isMobile ? "400" : "450";

  useEffect(() => {
    const timeout = setTimeout(() => {
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
            start: isMobile ? "top 80%" : "top 10%",
            end: isMobile ? "+=1000" : "+=100",
            scrub: 1,
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
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isMobile]);

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

  useEffect(() => {
    const img = galleryImageRef.current;
    if (!img) return;

    const handleImageLoad = () => {
      console.log("Image loaded, refreshing ScrollTrigger");
      ScrollTrigger.refresh();
    };

    if (img.complete) {
      // якщо картинка кешована
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
    };
  }, [business]);

  return (
    <section id="tour-memories" ref={gallerySectionRef} className={s.section}>
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
            data-aos-offset={isMobile ? "500" : "800"}
            className={s.galleryTitle}
          >
            memories
          </h3>
        </Layout>
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
