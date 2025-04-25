import { useEffect, useRef } from "react";
import { Layout } from "../Layout/Layout";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./DescMainSection.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import gsap from "gsap";

export const DescMainSection = () => {
  const topImagesContainerRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();
  const isMobile = width < 1024;

  useEffect(() => {
    const topImages = topImagesContainerRef.current?.querySelectorAll("img");

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
  }, []);

  return (
    <section className={s.section}>
      <Layout>
        <div className={s.videoTitleContainer}>
          <span className={s.bigTitle}>ИМПУЛЬС</span>
          <div className={s.video}>
            <video autoPlay loop muted playsInline>
              <source src="/images/main-page-video.mp4" />
            </video>
          </div>

          <div className={s.infoBlock}>
            <div>
              <SiteLogo fill="white" />
            </div>

            <h2>
              Это слово идеально отражает суть наших путешествий — энергию,
              драйв и вдохновение
            </h2>

            <div className={s.aside}>
              <p>
                Мы не просто организовываем автопробеги, а создаём моменты,
                которые становятся импульсом к переменам, новым эмоциям и
                открытиям. Каждый заезд — это не просто поездка, а часть
                большого пути, полного незабываемых впечатлений и новых
                горизонтов
              </p>
            </div>
          </div>

          <div ref={topImagesContainerRef} className={s.topImagesContainer}>
            <div ref={topImagesContainerRef} className={s.separate}>
              <img src="/images/main-page-desc/2.avif" alt="Lamborghini" />
            </div>

            <div ref={topImagesContainerRef} className={s.couple}>
              <div ref={topImagesContainerRef}>
                <img src="/images/main-page-desc/3.avif" alt="Drone" />
              </div>

              {!isMobile && (
                <div ref={topImagesContainerRef}>
                  <img src="/images/main-page-desc/1.avif" alt="Plate" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </section>
  );
};
