import { useRef, useState } from "react";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import s from "./ChroniclesSection.module.css";

const gallery = [
  {
    image: "/temp/1.jpg",
  },
  {
    image: "/temp/2.jpg",
  },
  {
    image: "/temp/3.jpg",
  },
];

export const ChroniclesSection = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState((1 / gallery.length) * 100); // Початкове значення 33.3%

  return (
    <section className={s.section}>
      <Layout>
        <div className={s.titleContainer}>
          <h2>Хроники путешествий</h2>
          <SiteButton />
        </div>

        {/* Прогрес-бар */}
        <div className={s.progressBarContainer}>
          <div
            className={s.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className={s.tabController}>
          <div>
            Porsche 911 <span>(12)</span>
          </div>
          <div>
            Lamborghini <span>(12)</span>
          </div>
          <div>
            BMW <span>(12)</span>
          </div>
        </div>
      </Layout>

      <div className={s.sliderWrapper}>
        {/* Кнопки навігації */}
        <div className={s.swiperController}>
          <div ref={prevRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0222 31.8507L23.9648 30.9081L9.52884 16.4721C9.40218 16.3454 9.33418 16.1787 9.33418 16.0001C9.33418 15.8214 9.40351 15.6547 9.52884 15.5281L23.9648 1.09208L23.0222 0.149414L8.58618 14.5854C8.20885 14.9627 8.00084 15.4654 8.00084 16.0001C8.00084 16.5347 8.20885 17.0361 8.58618 17.4147L23.0222 31.8507Z"
                fill="white"
              />
            </svg>
          </div>

          <div ref={nextRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97782 31.8507L8.03516 30.9081L22.4712 16.4721C22.5978 16.3454 22.6658 16.1787 22.6658 16.0001C22.6658 15.8214 22.5965 15.6547 22.4712 15.5281L8.03516 1.09208L8.97782 0.149414L23.4138 14.5854C23.7912 14.9627 23.9992 15.4654 23.9992 16.0001C23.9992 16.5347 23.7912 17.0361 23.4138 17.4147L8.97782 31.8507Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          modules={[Navigation]}
          onInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          onSlideChange={(swiper) => {
            const progress =
              ((swiper.activeIndex + 1) / swiper.slides.length) * 100;
            setProgress(progress);
          }}
          className={s.swiperContainer}
        >
          {gallery.map((image) => (
            <SwiperSlide className={s.slide}>
              <img src={image.image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
