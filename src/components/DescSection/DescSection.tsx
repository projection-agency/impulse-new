import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./DescSection.module.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const DescSection = () => {
  const { width } = useWindowSize();

  const topImagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomImagesContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isMobile = width < 1024;
  const [topTitle, setTopTitle] = useState("");
  const [animatedTitle, setAnimatedTitle] = useState("");
  const [bottomTitle, setBottomTitle] = useState("");
  const [asideDesc, setAsideDesc] = useState("");

  const [business, setBusiness] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const topImages = topImagesContainerRef.current?.querySelectorAll("img");
    const bottomImages =
      bottomImagesContainerRef.current?.querySelectorAll("img");

    if (topImages) {
      topImages.forEach((img) => {
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

  useEffect(() => {
    switch (pathname) {
      case "/business-tours":
        setTopTitle(t("descBusinessTopTitle"));
        setAnimatedTitle(t("descBusinessAnimatedTitle"));
        setBottomTitle(t("descBusinessBottomTitle"));
        setAsideDesc(t("descBusinessAsideDesc"));
        setBusiness(true);
        break;
      case "/private-tours":
        setTopTitle(t("descPrivateTopTitle"));
        setAnimatedTitle(t("descPrivateAnimatedTitle"));
        setBottomTitle(t("descPrivateBottomTitle"));
        setBusiness(false);
        setAsideDesc(t("descPrivateAsideDesc"));

        break;
      default:
        setTopTitle(t("descMainTopTitle"));
        setBusiness(false);

        break;
    }
  }, [pathname, t]);

  return (
    <section id="descSection" className={s.section}>
      <Layout className={s.container}>
        <div>
          <div className={s.infoBlock}>
            <div>
              <SiteLogo fill="black" />
            </div>

            <h2 className={business ? s.longer : ""}>
              {topTitle} <br />
              <span className={s.span}>
                <AnimatedHeading text={animatedTitle} />
              </span>
              {bottomTitle}
            </h2>

            <div className={s.aside}>
              <p>{asideDesc}</p>

              <div className={s.z}>
                <SiteButton />
              </div>
            </div>
          </div>

          <div ref={topImagesContainerRef} className={s.topImagesContainer}>
            <div ref={topImagesContainerRef} className={s.separate}>
              <img
                src={
                  business
                    ? "/images/business-desc/1.avif"
                    : "/images/actual-tours/lambos.avif"
                }
                alt="Lamborghini"
              />
            </div>

            <div ref={topImagesContainerRef} className={s.couple}>
              <div ref={topImagesContainerRef}>
                <img
                  src={
                    business
                      ? "/images/business-desc/2.avif"
                      : "/images/actual-tours/drone.avif"
                  }
                  alt="Drone"
                />
              </div>

              {!isMobile && (
                <div ref={topImagesContainerRef}>
                  <img
                    src={
                      business
                        ? "/images/business-desc/3.avif"
                        : "/images/actual-tours/plate.avif"
                    }
                    alt="Plate"
                  />
                </div>
              )}
            </div>
          </div>

          <div
            ref={bottomImagesContainerRef}
            className={s.bottomImagesContainer}
          >
            <div ref={bottomImagesContainerRef} className={s.couple}>
              <div ref={bottomImagesContainerRef}>
                <img
                  src={`${
                    isMobile
                      ? "/images/actual-tours/mobile-home.avif"
                      : "/images/actual-tours/home.avif"
                  }`}
                  alt="Home"
                />
              </div>
              <div ref={bottomImagesContainerRef}>
                <img src="/images/actual-tours/bed.avif" alt="Bed" />
              </div>
            </div>

            {!isMobile && (
              <div ref={bottomImagesContainerRef} className={s.separate}>
                <img src="/images/actual-tours/mountain.avif" alt="Mountain" />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </section>
  );
};
