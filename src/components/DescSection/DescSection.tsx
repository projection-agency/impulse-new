import { useEffect, useRef } from "react";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./DescSection.module.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";

gsap.registerPlugin(ScrollTrigger);

export const DescSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const topImagesRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();

  const isMobile = width < 1024;

  useEffect(() => {
    if (!sectionRef.current || !topImagesRef.current || !infoRef.current)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? "top -400px" : "top -400px", // коли секція доходить до верху в'юпорта
        end: isMobile ? "+=800" : "+=1200", // анімація йде наступні 300px
        scrub: true,
      },
    });

    tl.to([topImagesRef.current, infoRef.current], {
      top: isMobile ? "-65vw" : "-80vw", // або "0" → залежить від стилів
      position: "relative", // якщо ще немає
      height: "60vh",
      ease: "power2.out",
      duration: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="descSection" className={s.section} ref={sectionRef}>
      <Layout className={s.container}>
        <div>
          <div className={s.topImagesContainer} ref={topImagesRef}>
            <div className={s.separate}>
              <img src="/images/actual-tours/lambos.avif" alt="Lamborghini" />
            </div>

            <div className={s.couple}>
              <div>
                <img src="/images/actual-tours/drone.avif" alt="Drone" />
              </div>

              {!isMobile && (
                <div>
                  <img src="/images/actual-tours/plate.avif" alt="Plate" />
                </div>
              )}
            </div>
          </div>

          <div className={s.infoBlock} ref={infoRef}>
            <div data-aos="fade-up">
              <SiteLogo fill="black" />
            </div>

            <h2 data-aos="fade-up">
              Погрузитесь в путешествие <br />
              <span className={s.span}>
                <AnimatedHeading text="с самыми близкими" />
              </span>
              , где всё создано по вашему личному сценарию
            </h2>

            <div className={s.aside}>
              <p data-aos="fade-up">
                Наши приватные туры дают возможность сменить обстановку,
                оставить позади рутину и насладиться каждым километром лучших
                европейских дорог за рулём роскошного спорткара — с вашей второй
                половинкой или в компании друзей.
              </p>

              <div data-aos="fade-up" data-aos-offset="-1000">
                <SiteButton />
              </div>
            </div>
          </div>

          <div className={s.bottomImagesContainer}>
            <div className={s.couple}>
              <div data-aos="fade-up" data-aos-offset="300">
                <img
                  src={`${
                    isMobile
                      ? "/images/actual-tours/mobile-home.avif"
                      : "/images/actual-tours/home.avif"
                  }`}
                  alt="Home"
                />
              </div>
              <div data-aos="fade-up" data-aos-offset="200">
                <img src="/images/actual-tours/bed.avif" alt="Bed" />
              </div>
            </div>

            {!isMobile && (
              <div
                data-aos="fade-up"
                data-aos-offset="300"
                className={s.separate}
              >
                <img src="/images/actual-tours/mountain.avif" alt="Mountain" />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </section>
  );
};
