import { useState, useRef } from "react";
import { Layout } from "../Layout/Layout";
import s from "./MissionSection.module.css";
import { motion, useInView } from "framer-motion";
import { TextAnimation } from "../TextAnimation/TextAnimation";

const videos = ["/temp/video.mp4", "/temp/hero-video.mp4", "/temp/video.mp4"];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const MissionSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const switchVideo = (direction: "next" | "prev") => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentVideo((prev) =>
        direction === "next"
          ? (prev + 1) % videos.length
          : (prev - 1 + videos.length) % videos.length
      );
      setIsFading(false);
    }, 1);
  };

  const titleRef = useRef(null);
  const videoControlsRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const listRef = useRef(null);

  const titleInView = useInView(titleRef, { once: false, amount: 0.3 });
  const controlsInView = useInView(videoControlsRef, {
    once: false,
    amount: 0.3,
  });
  const wrapperInView = useInView(videoWrapperRef, {
    once: false,
    amount: 0.3,
  });
  const listInView = useInView(listRef, { once: false, amount: 0.3 });

  return (
    <section className={s.section}>
      <Layout>
        <motion.div
          ref={titleRef}
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className={s.titleContainer}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextAnimation texts={["Чтобы каждая деталь"]}></TextAnimation>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "inline-block",
                fontWeight: 500,
              }}
            >
              <TextAnimation texts={["соответствовала вашим"]} />
            </motion.div>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "inline-block",
                fontWeight: 500,
              }}
            >
              <TextAnimation
                color="rgba(95, 95, 95, 1)"
                texts={["ожиданиям и потребностям"]}
              />
            </motion.span>
          </motion.h2>

          <div className={s.jcsb}>
            <p>
              Комфорт и забота о каждом клиенте —
              <span>
                наша главная цель. Налаженные связи позволяют нам создавать
                лучший опыт и обеспечивать максимальный комфорт для вашего
                отдыха.
              </span>
            </p>
            <span className={s.impulse}>
              IMpulSE
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842854 3.84344 0 5.87827 0 8C0 10.1217 0.842854 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 14.4C7.15949 14.4 6.32721 14.2344 5.55067 13.9128C4.77414 13.5911 4.06857 13.1197 3.47423 12.5254C2.8799 11.931 2.40845 11.2255 2.0868 10.4489C1.76515 9.67239 1.5996 8.84011 1.5996 7.9996C1.5996 7.15909 1.76515 6.32681 2.0868 5.55027C2.40845 4.77374 2.8799 4.06817 3.47423 3.47383C4.06857 2.8795 4.77414 2.40805 5.55067 2.0864C6.32721 1.76475 7.15949 1.5992 8 1.5992C9.69749 1.5992 11.3255 2.27353 12.5258 3.47383C13.7261 4.67414 14.4004 6.30211 14.4004 7.9996C14.4004 9.69709 13.7261 11.3251 12.5258 12.5254C11.3255 13.7257 9.69749 14.4 8 14.4Z"
                  fill="#1D1D1D"
                />
                <path
                  d="M11.4 6.4C11.4 5.76348 11.1471 5.15303 10.6971 4.70294C10.247 4.25286 9.63652 4 9 4H5V12H6.6V8.8H7.768L9.904 12H11.824L9.624 8.704C10.1314 8.56737 10.58 8.26797 10.9009 7.85175C11.2217 7.43553 11.397 6.92551 11.4 6.4ZM9 7.2H6.6V5.6H9C9.21217 5.6 9.41566 5.68429 9.56568 5.83431C9.71571 5.98434 9.8 6.18783 9.8 6.4C9.8 6.61217 9.71571 6.81566 9.56568 6.96569C9.41566 7.11571 9.21217 7.2 9 7.2Z"
                  fill="#1D1D1D"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </Layout>

      <Layout>
        <motion.div
          ref={videoControlsRef}
          variants={fadeUp}
          initial="hidden"
          animate={controlsInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-between lg:mb-[1.6vw] mb-[4.2vw]"
        >
          <div className={s.pagination}>
            <div className={s.bullets}>
              {videos.map((_, index) => (
                <div
                  key={index}
                  className={index === currentVideo ? s.activeBullet : s.bullet}
                ></div>
              ))}
            </div>
            <div className={s.qty}>{`${currentVideo + 1}/${
              videos.length
            }`}</div>
          </div>

          <div className={s.controller}>
            <div className={s.prev} onClick={() => switchVideo("prev")}>
              <svg
                viewBox="0 0 42 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.584015 8.57143L9.05573 0L10.4677 1.42857L2.99422 8.99L42 8.99L42 11.01H2.99422L10.4677 18.5714L9.05573 20L0.584015 11.4286C-0.194679 10.6407 -0.194679 9.35929 0.584015 8.57143Z" />
              </svg>
            </div>
            <div className={s.next} onClick={() => switchVideo("next")}>
              <svg
                viewBox="0 0 42 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </Layout>

      <motion.div
        ref={videoWrapperRef}
        variants={fadeUp}
        initial="hidden"
        animate={wrapperInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={s.videoWrapper}
      >
        <video
          className={`${s.video} ${isFading ? s.fade : ""}`}
          key={videos[currentVideo]}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        <Layout>
          <motion.div
            ref={listRef}
            variants={fadeUp}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={s.list}
          >
            <div>
              <p>Подходящий маршрут</p>
              <img
                className="lg:h-[5vw] h-[16.5vw]"
                src="/images/mission-list/компас.webp"
                alt=""
              />
            </div>
            <div>
              <p>Желанный спорткар</p>
              <img
                className="lg:h-[3.85vw] h-[11.7vw]"
                src="/images/mission-list/спорткар.webp"
                alt=""
              />
            </div>
            <div>
              <p>Лучшие отели и рестораны</p>
              <img
                className="lg:h-[5vw] h-[16.5vw]"
                src="/images/mission-list/ресторани.webp"
                alt=""
              />
            </div>
          </motion.div>
        </Layout>
      </motion.div>
    </section>
  );
};
