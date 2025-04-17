import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./DescSection.module.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const DescSection = () => {
  const { width } = useWindowSize();

  const topImagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomImagesContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = width < 1024;

  useEffect(() => {
    const topImages = topImagesContainerRef.current?.querySelectorAll("img");
    const bottomImages =
      bottomImagesContainerRef.current?.querySelectorAll("img");

    if (topImages) {
      topImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 2 }, // початковий масштаб
          {
            scale: 1, // кінцевий масштаб
            scrollTrigger: {
              trigger: img,
              start: "top bottom", // коли верх фото торкається низу екрану
              end: "bottom top", // коли низ фото торкається верху екрану
              scrub: true, // скрол-контрольована анімація
            },
            ease: "none",
          }
        );
      });
    }

    if (bottomImages) {
      bottomImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 2 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          }
        );
      });
    }
  }, []);

  return (
    <section id="descSection" className={s.section}>
      <Layout className={s.container}>
        <div>
          <div className={s.infoBlock}>
            <div>
              <SiteLogo fill="black" />
            </div>

            <h2>
              Погрузитесь в путешествие <br />
              <span className={s.span}>
                <AnimatedHeading text="с самыми близкими" />
              </span>
              , где всё создано по вашему личному сценарию
            </h2>

            <div className={s.aside}>
              <p>
                Наши приватные туры дают возможность сменить обстановку,
                оставить позади рутину и насладиться каждым километром лучших
                европейских дорог за рулём роскошного спорткара — с вашей второй
                половинкой или в компании друзей.
              </p>

              <div>
                <SiteButton />
              </div>
            </div>
          </div>

          <div ref={topImagesContainerRef} className={s.topImagesContainer}>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              className={s.separate}
            >
              <img src="/images/actual-tours/lambos.avif" alt="Lamborghini" />
            </div>

            <div className={s.couple}>
              <div data-aos="fade-up" data-aos-offset="200">
                <img src="/images/actual-tours/drone.avif" alt="Drone" />
              </div>

              {!isMobile && (
                <div data-aos="fade-up" data-aos-offset="300">
                  <img src="/images/actual-tours/plate.avif" alt="Plate" />
                </div>
              )}
            </div>
          </div>

          <div
            ref={bottomImagesContainerRef}
            className={s.bottomImagesContainer}
          >
            <div className={s.couple}>
              <div data-aos="fade-up" data-aos-offset="100">
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
