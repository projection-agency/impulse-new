import { useWindowSize } from "../../hooks/useWindowSize";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./DescSection.module.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const DescSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const imageBlockRef = useRef(null);
  const bottomBlockRef = useRef(null);

  const imageInView = useInView(imageBlockRef, { once: false, amount: 0.3 });
  const bottomInView = useInView(bottomBlockRef, { once: false, amount: 0.3 });

  return (
    <section id="descSection" className={s.section}>
      <Layout>
        <motion.div
          ref={imageBlockRef}
          variants={fadeUp}
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-row justify-between gap-[5.6vw]">
            <div className="lg:w-[30.4vw]">
              <img src="/images/actual-tours/lambos.avif" alt="Lamborghini" />
            </div>

            <div className="flex gap-[1.2vw]">
              <div className="lg:w-[20.3vw]">
                <img src="/images/actual-tours/drone.avif" alt="Drone" />
              </div>

              {!isMobile && (
                <div className="lg:w-[14.1vw]">
                  <img src="/images/actual-tours/plate.avif" alt="Plate" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className={s.infoBlock}>
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
              Наши приватные туры дают возможность сменить обстановку, оставить
              позади рутину и насладиться каждым километром лучших европейских
              дорог за рулём роскошного спорткара — с вашей второй половинкой
              или в компании друзей.
            </p>

            <div data-aos="fade-up">
              <SiteButton />
            </div>
          </div>
        </div>

        <motion.div
          ref={bottomBlockRef}
          variants={fadeUp}
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div className="flex gap-[18vw] lg:ml-[14.5vw] ">
            <div className="flex flex-row-reverse lg:flex-row lg:gap-[1.2vw] gap-[5.8vw] lg:justify-start justify-between">
              <div className="lg:block flex justify-end">
                <img src="/images/actual-tours/home.avif" alt="Home" />
              </div>
              <div>
                <img src="/images/actual-tours/bed.avif" alt="Bed" />
              </div>
            </div>

            {!isMobile && (
              <div>
                <img src="/images/actual-tours/mountain.avif" alt="Mountain" />
              </div>
            )}
          </div>
        </motion.div>
      </Layout>
    </section>
  );
};
