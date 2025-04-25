import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TourSwiperSection.css";
import { Swiper as SwiperType } from "swiper";

import { Layout } from "../Layout/Layout";
import { TextAnimation } from "../TextAnimation/TextAnimation";
import s from "./TourSwiperSection.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";

const slides = [
  {
    image: "/images/tour-swiper-images/1.avif",
    title: "Скорость и драйв",
    desc: "Наслаждайтесь захватывающими маршрутами, покоряйте легендарные перевалы и испытывайте мощь спорткаров на безлимитных автобанах",
  },
  {
    image: "/images/tour-swiper-images/2.avif",
    title: "Итальянский шик",
    desc: "Посетите музеи Lamborghini и Ferrari, ощутите атмосферу Болоньи и насладитесь гастрономией в замке",
  },
];

export const TourSwiperSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="tour-description" className={s.section}>
      <Layout className={s.container}>
        <div className={s.titleContainer}>
          <h2>
            <TextAnimation
              texts={[
                "Каждый день — это",
                "уникальное сочетание",
                "скорости, эмоций и",
                "атмосферы премиальных",
                "курортов",
              ]}
            />
          </h2>

          <div className={s.descContainer}>
            <p data-aos="fade-up">
              Пятидневное приключение, которое начинается в Мюнхене и проходит
              через скоростные автобаны, величественные Доломитовые Альпы и
              легендарные итальянские города
            </p>
            <p data-aos="fade-up">
              Тур завершится в Болонье, где вы посетите музей Lamborghini и
              отпразднуете финал тура в роскошном замке с живой музыкой и
              изысканной кухней
            </p>
          </div>
        </div>

        <div className={s.swiperContainer}>
          {!isMobile && (
            <div className={s.controller}>
              <div className="flex items-center lg:gap-[0.8vw] gap-[2.6vw]">
                <div className={s.pagination}>
                  {slides.map((_, index) => (
                    <span
                      key={index}
                      className={
                        index === activeIndex ? s.activeBullet : s.bullet
                      }
                    />
                  ))}
                </div>

                <div className={s.slideCount}>
                  {activeIndex + 1}/{slides.length}
                </div>
              </div>

              <div className="flex lg:gap-[0.8vw] gap-[2.6vw]">
                <button onClick={() => swiperRef.current?.slidePrev()}>
                  <svg
                    width="42"
                    height="20"
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.584015 8.57143L9.05573 0L10.4677 1.42857L2.99422 8.99L42 8.99L42 11.01H2.99422L10.4677 18.5714L9.05573 20L0.584015 11.4286C-0.194679 10.6407 -0.194679 9.35929 0.584015 8.57143Z" />
                  </svg>
                </button>

                <button onClick={() => swiperRef.current?.slideNext()}>
                  <svg
                    width="42"
                    height="20"
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={isMobile ? 1.05 : 1}
            spaceBetween="16"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="swiperTour"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={s.slide}>
                  <img src={slide.image} alt={slide.title} />

                  <div className={s.slideContent}>
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {isMobile && (
            <div className={s.controller}>
              <div className="flex items-center lg:gap-[0.8vw] gap-[2.6vw]">
                <div className={s.pagination}>
                  {slides.map((_, index) => (
                    <span
                      key={index}
                      className={
                        index === activeIndex ? s.activeBullet : s.bullet
                      }
                    />
                  ))}
                </div>

                <div className={s.slideCount}>
                  {activeIndex + 1}/{slides.length}
                </div>
              </div>

              <div className="flex lg:gap-[0.8vw] gap-[2.6vw]">
                <button onClick={() => swiperRef.current?.slidePrev()}>
                  <svg
                    width="42"
                    height="20"
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.584015 8.57143L9.05573 0L10.4677 1.42857L2.99422 8.99L42 8.99L42 11.01H2.99422L10.4677 18.5714L9.05573 20L0.584015 11.4286C-0.194679 10.6407 -0.194679 9.35929 0.584015 8.57143Z" />
                  </svg>
                </button>

                <button onClick={() => swiperRef.current?.slideNext()}>
                  <svg
                    width="42"
                    height="20"
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </section>
  );
};
