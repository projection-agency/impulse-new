import { useEffect, useState } from "react";
import s from "./HomeHero.module.css";
import { Layout } from "../Layout/Layout";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FixedBar } from "../FixedBar/FixedBar";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { TourType } from "../ActualToursSection/ActualToursSection";

const videos = [
  { src: "/temp/hero-video.mp4", poster: "/images/stub-hero-image.avif" },
  { src: "/temp/video.mp4", poster: "/images/stub-hero-image.avif" },
  { src: "/temp/hero-video.mp4", poster: "/images/stub-hero-image.avif" },
];

const tabs = [
  {
    image: "/temp/lamb.jpg",
    car: "Lamborghini 2.0",
    route: "Munich, Dolomites, Bologna",
    date: "01.06 - 05.06",
  },
  {
    image: "/temp/bmw.jpg",
    car: "BMW",
    route: "Munich, Dolomites",
    date: "01.06 - 05.06",
  },
  {
    image: "/temp/porsche.jpg",
    car: "Porsche 911",
    route: "Switzerland",
    date: "01.06 - 05.06",
  },
];

const calendarIcon = (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6" clipPath="url(#clip0_1398_14952)">
      <path
        d="M4 6H3C2.4485 6 2 6.4485 2 7V8C2 8.5515 2.4485 9 3 9H4C4.5515 9 5 8.5515 5 8V7C5 6.4485 4.5515 6 4 6ZM3 8V7H4V8H3ZM9.5 1H9V0.5C9 0.224 8.7765 0 8.5 0C8.2235 0 8 0.224 8 0.5V1H4V0.5C4 0.224 3.7765 0 3.5 0C3.2235 0 3 0.224 3 0.5V1H2.5C1.1215 1 0 2.1215 0 3.5V9.5C0 10.8785 1.1215 12 2.5 12H9.5C10.8785 12 12 10.8785 12 9.5V3.5C12 2.1215 10.8785 1 9.5 1ZM2.5 2H9.5C10.327 2 11 2.673 11 3.5V4H1V3.5C1 2.673 1.673 2 2.5 2ZM9.5 11H2.5C1.673 11 1 10.327 1 9.5V5H11V9.5C11 10.327 10.327 11 9.5 11Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1398_14952">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const HomeHero = ({
  openOrder,
  openConsult,
  openVideo,
  actualTour,
}: {
  openOrder: (tour?: TourType) => void;
  openConsult: () => void;
  openVideo: () => void;
  actualTour?: TourType;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const [heroTitle, setHeroTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 20000);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const { pathname } = useLocation();

  const isTourPage = pathname.startsWith("/tour");

  // if (actualTour) {
  //   setDesc(actualTour.input_sec_desc);
  // }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
  };

  useEffect(() => {
    if (isTourPage) {
      if (actualTour?.title?.rendered) {
        setHeroTitle(actualTour.title.rendered);
        setDesc(actualTour.input_sec_desk);
      } else {
        setHeroTitle(t("mainHeroTitle")); // або залиш без змін
      }
      return;
    }

    switch (pathname) {
      case "/business-tours":
        setHeroTitle(t("businessHeroTitle"));
        setDesc(t("businessHeroDesc"));
        break;

      case "/private-tours":
        setHeroTitle(t("privateHeroTitle"));
        setDesc(t("privateHeroDesc"));
        break;

      default:
        setHeroTitle(t("mainHeroTitle"));
        setDesc(t("mainHeroDesc"));
        break;
    }
  }, [pathname, t, actualTour]);

  return (
    <>
      <section className={s.section}>
        <div className={s.videoContainer}>
          {isTourPage ? (
            <video
              className={`${s.video} ${s.active}`}
              poster={videos[0].poster}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videos[0].src} type="video/mp4" />
            </video>
          ) : (
            videos.map((video, index) => (
              <video
                key={index}
                className={`${s.video} ${
                  index === activeIndex ? s.active : s.hidden
                }`}
                poster={video.poster}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={video.src} type="video/mp4" />
              </video>
            ))
          )}
        </div>

          <div className={s.heroTitleContainer}>
            <span data-aos="fade-up">
              {isTourPage && actualTour
                ? `${t("date")}: ${formatDate(
                    actualTour.input_date_start
                  )} - ${formatDate(actualTour.input_date_end)}`
                : "Формат:"}
            </span>

            <h1>
              {isMobile ? heroTitle : <AnimatedHeading text={heroTitle} />}
            </h1>

            <p data-aos="fade-up">{desc}</p>

            {actualTour ? (
              <div
                className={s.a}
                onClick={() => openOrder(actualTour)}
                data-aos="fade-up"
              >
                {t("bookTour")}
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1398_14919)">
                    <path
                      d="M2.39999 0V2.39999H7.79999L0 10.2L1.79999 12L9.60001 4.19997V9.59998H12V0H2.39999Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1398_14919">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
              <a data-aos="fade-up" href="#tours">
                {t("actualTours")}
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1398_14919)">
                    <path
                      d="M2.39999 0V2.39999H7.79999L0 10.2L1.79999 12L9.60001 4.19997V9.59998H12V0H2.39999Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1398_14919">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            )}

            {!isMobile && (
              <div data-aos="fade-up" className={s.showReelContainer}>
                <img src="/images/show-reel-circle.svg" alt="" />

                <div onClick={openVideo} className={s.showReel}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.7862 7.30398L10.0412 0.887312C9.35815 0.387165 8.54995 0.0859563 7.7062 0.0170862C6.86245 -0.0517839 6.01611 0.114375 5.26102 0.497139C4.50594 0.879903 3.87161 1.46431 3.42839 2.18557C2.98516 2.90683 2.75035 3.73675 2.75 4.58331V17.4166C2.75015 18.2636 2.98497 19.0939 3.4284 19.8155C3.87183 20.5371 4.50653 21.1217 5.26205 21.5044C6.01758 21.8872 6.86438 22.0531 7.70848 21.9838C8.55258 21.9145 9.36096 21.6126 10.0439 21.1117L18.7889 14.6951C19.3694 14.2694 19.8415 13.7129 20.1669 13.0708C20.4922 12.4287 20.6618 11.7189 20.6618 10.9991C20.6618 10.2792 20.4922 9.56946 20.1669 8.92734C19.8415 8.28522 19.3694 7.72877 18.7889 7.30306L18.7862 7.30398ZM17.7008 13.2165L8.95583 19.6331C8.5461 19.9326 8.0615 20.1127 7.55569 20.1538C7.04988 20.1948 6.54258 20.0951 6.08994 19.8656C5.6373 19.6362 5.25698 19.286 4.99107 18.8537C4.72516 18.4215 4.58405 17.9241 4.58333 17.4166V4.58331C4.57825 4.07488 4.7167 3.57533 4.9828 3.14206C5.24889 2.70879 5.63182 2.35938 6.08758 2.13398C6.47523 1.9368 6.90391 1.83379 7.33883 1.83331C7.92173 1.83554 8.48853 2.02479 8.95583 2.37323L17.7008 8.7899C18.0487 9.04537 18.3316 9.37913 18.5265 9.76419C18.7215 10.1493 18.8231 10.5748 18.8231 11.0064C18.8231 11.438 18.7215 11.8635 18.5265 12.2486C18.3316 12.6337 18.0487 12.9674 17.7008 13.2229V13.2165Z" />
                  </svg>

                  <span>Showreel</span>
                </div>
              </div>
            )}
          </div>

        <Layout>
          <div className={s.heroBottomContainer}>
            {!isTourPage && (
              <div className={s.swiperController}>
                {tabs.map((car, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <div
                      key={index}
                      className={`${s.tab} ${isActive ? s.active : ""}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className={s.tabImageWrapper}>
                        <svg
                          key={
                            isActive ? `active-${index}` : `inactive-${index}`
                          }
                          className={s.progressCircle}
                          viewBox="0 0 36 36"
                        >
                          <path
                            className={s.progressBackground}
                            d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            data-index={index}
                            className={`${s.progressBar} ${
                              isActive ? s.animating : ""
                            }`}
                            d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>

                        <img src={car.image} alt="" />
                      </div>

                      <div className={s.tabInfo}>
                        <h4>{car.car}</h4>
                        <p>{car.route}</p>
                        <p>
                          {calendarIcon}
                          {car.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!isMobile && (
              <div
                style={isTourPage ? { marginLeft: "auto" } : undefined}
                className={s.scrollDown}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3964 31.3102L9.08431 26.0298C8.92292 25.868 8.83225 25.6487 8.83225 25.4199C8.83225 25.1912 8.92292 24.9718 9.08431 24.8101C9.2457 24.6484 9.46459 24.5575 9.69283 24.5575C9.92107 24.5575 10.14 24.6484 10.3014 24.8101L15.6134 30.1336C15.664 30.1848 15.7242 30.2254 15.7906 30.2531C15.8569 30.2809 15.9281 30.2951 16 30.2951C16.0719 30.2951 16.1431 30.2809 16.2094 30.2531C16.2758 30.2254 16.336 30.1848 16.3866 30.1336L21.7273 24.7671C21.8944 24.6091 22.1172 24.5242 22.3468 24.5309C22.5764 24.5376 22.7939 24.6355 22.9515 24.8029C23.1091 24.9704 23.1938 25.1937 23.1871 25.4238C23.1804 25.6539 23.0828 25.8718 22.9157 26.0298L17.6036 31.3532C17.3906 31.5621 17.1385 31.7268 16.8617 31.8378C16.585 31.9487 16.2891 32.0038 15.9911 31.9998C15.693 31.9958 15.3987 31.9328 15.125 31.8145C14.8514 31.6961 14.6037 31.5247 14.3964 31.3102ZM21.7273 7.20395C21.8944 7.36189 22.1172 7.44683 22.3468 7.4401C22.5764 7.43338 22.7939 7.33553 22.9515 7.16808C23.1091 7.00064 23.1938 6.77731 23.1871 6.54723C23.1804 6.31716 23.0828 6.09918 22.9157 5.94125L17.6036 0.660836C17.1796 0.237619 16.6056 0 16.0072 0C15.4087 0 14.8347 0.237619 14.4107 0.660836L9.08431 5.94125C9.00158 6.01945 8.93502 6.11321 8.88845 6.21719C8.84188 6.32116 8.81619 6.43331 8.81287 6.54723C8.80955 6.66116 8.82865 6.77462 8.86908 6.88114C8.90951 6.98767 8.97048 7.08517 9.04852 7.16808C9.12655 7.25099 9.22011 7.31769 9.32386 7.36436C9.42762 7.41104 9.53953 7.43677 9.6532 7.4401C9.76688 7.44343 9.8801 7.42429 9.9864 7.38378C10.0927 7.34326 10.19 7.28215 10.2727 7.20395L15.6134 1.8805C15.664 1.8293 15.7242 1.78867 15.7906 1.76093C15.8569 1.7332 15.9281 1.71892 16 1.71892C16.0719 1.71892 16.1431 1.7332 16.2094 1.76093C16.2758 1.78867 16.336 1.8293 16.3866 1.8805L21.7273 7.20395ZM16 20.4337C15.1221 20.4337 14.264 20.1728 13.534 19.684C12.8041 19.1953 12.2352 18.5005 11.8992 17.6877C11.5633 16.875 11.4754 15.9806 11.6466 15.1177C11.8179 14.2548 12.2407 13.4623 12.8614 12.8402C13.4822 12.2181 14.2731 11.7944 15.1341 11.6228C15.9951 11.4512 16.8875 11.5393 17.6986 11.8759C18.5097 12.2126 19.2029 12.7827 19.6906 13.5142C20.1783 14.2457 20.4386 15.1057 20.4386 15.9855C20.4386 17.1652 19.971 18.2966 19.1386 19.1308C18.3062 19.965 17.1772 20.4337 16 20.4337ZM16 18.7118C16.5381 18.7118 17.064 18.5519 17.5114 18.2523C17.9588 17.9528 18.3075 17.527 18.5134 17.0288C18.7193 16.5306 18.7732 15.9825 18.6682 15.4536C18.5632 14.9248 18.3041 14.439 17.9237 14.0577C17.5432 13.6764 17.0585 13.4168 16.5307 13.3116C16.003 13.2064 15.456 13.2604 14.9589 13.4667C14.4618 13.6731 14.037 14.0225 13.738 14.4709C13.4391 14.9192 13.2795 15.4463 13.2795 15.9855C13.2795 16.7086 13.5662 17.402 14.0763 17.9133C14.5865 18.4246 15.2785 18.7118 16 18.7118Z"
                    fill="white"
                  />
                </svg>

                <a>
                  <p>{t("scroll_title")}</p>
                  <span>{t("scroll_subtitle")}</span>
                </a>
              </div>
            )}
          </div>
        </Layout>
      </section>
      <FixedBar openOrder={openOrder} openConsult={openConsult} />

      {isMobile && pathname !== "/" && !pathname.startsWith("/tour") && (
        <Layout className={s.shoeReelMobileWrapper}>
          <div className={s.showReelContainer}>
            <div onClick={openVideo} className={s.showReel}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.7862 7.30398L10.0412 0.887312C9.35815 0.387165 8.54995 0.0859563 7.7062 0.0170862C6.86245 -0.0517839 6.01611 0.114375 5.26102 0.497139C4.50594 0.879903 3.87161 1.46431 3.42839 2.18557C2.98516 2.90683 2.75035 3.73675 2.75 4.58331V17.4166C2.75015 18.2636 2.98497 19.0939 3.4284 19.8155C3.87183 20.5371 4.50653 21.1217 5.26205 21.5044C6.01758 21.8872 6.86438 22.0531 7.70848 21.9838C8.55258 21.9145 9.36096 21.6126 10.0439 21.1117L18.7889 14.6951C19.3694 14.2694 19.8415 13.7129 20.1669 13.0708C20.4922 12.4287 20.6618 11.7189 20.6618 10.9991C20.6618 10.2792 20.4922 9.56946 20.1669 8.92734C19.8415 8.28522 19.3694 7.72877 18.7889 7.30306L18.7862 7.30398ZM17.7008 13.2165L8.95583 19.6331C8.5461 19.9326 8.0615 20.1127 7.55569 20.1538C7.04988 20.1948 6.54258 20.0951 6.08994 19.8656C5.6373 19.6362 5.25698 19.286 4.99107 18.8537C4.72516 18.4215 4.58405 17.9241 4.58333 17.4166V4.58331C4.57825 4.07488 4.7167 3.57533 4.9828 3.14206C5.24889 2.70879 5.63182 2.35938 6.08758 2.13398C6.47523 1.9368 6.90391 1.83379 7.33883 1.83331C7.92173 1.83554 8.48853 2.02479 8.95583 2.37323L17.7008 8.7899C18.0487 9.04537 18.3316 9.37913 18.5265 9.76419C18.7215 10.1493 18.8231 10.5748 18.8231 11.0064C18.8231 11.438 18.7215 11.8635 18.5265 12.2486C18.3316 12.6337 18.0487 12.9674 17.7008 13.2229V13.2165Z" />
              </svg>

              <span>Showreel</span>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};
