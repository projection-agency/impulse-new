import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";
import s from "./ReviewSection.module.css";

const reviews = [
  {
    reviewer: "Макс",
    location: "Италия",
    car: "Lamborghini Aventador",
    year: "2024",
    title: "“Они воплотили мои детские мечты в реальность”",
    review:
      "В детстве я играл с маленькими Lamborghini, а теперь смог погоняю на них по потрясающих маршрутам, и не просто на одной, а на трёх разных! Это просто жир. Я до сих пор пересматриваю видео из тура и ловлю те же эмоции, что и в момент поездки.",
    video: "/temp/review-temp-image.jpg",
  },
  {
    reviewer: "Макс",
    location: "Италия",
    car: "Lamborghini Aventador",
    year: "2024",
    title: "“Они воплотили мои детские мечты в реальность”",
    review:
      "В детстве я играл с маленькими Lamborghini, а теперь смог погоняю на них по потрясающих маршрутам, и не просто на одной, а на трёх разных! Это просто жир. Я до сих пор пересматриваю видео из тура и ловлю те же эмоции, что и в момент поездки.",
    video: "/temp/review-temp-image.jpg",
  },
];

import { useState } from "react";

export const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowSize();

  const isMobile = width < 1024;

  const totalSlides = reviews.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    console.log(currentIndex);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className={s.section}>
      <Layout className={s.container}>
        <div className={s.reviewContainer}>
          <div className={s.reviewerInfoContainer}>
            <div>
              <div className={s.tourDesc}>
                <span>{reviews[currentIndex].reviewer}</span>
                <div></div>
                <span>{reviews[currentIndex].location}</span>
                <div></div>
                <span>{reviews[currentIndex].car}</span>
                <div></div>
                <span>{reviews[currentIndex].year}</span>
              </div>
              <h3>{reviews[currentIndex].title}</h3>
              <p>{reviews[currentIndex].review}</p>
            </div>

            <div className={s.controller}>
              {!isMobile && (
                <button onClick={prevSlide}>
                  <svg
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.584015 8.57143L9.05573 0L10.4677 1.42857L2.99422 8.99L42 8.99L42 11.01H2.99422L10.4677 18.5714L9.05573 20L0.584015 11.4286C-0.194679 10.6407 -0.194679 9.35929 0.584015 8.57143Z" />
                  </svg>
                </button>
              )}

              <div className={s.pagination}>
                {reviews.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === currentIndex ? s.activeBullet : s.bullet
                    }
                  ></span>
                ))}
              </div>

              <div className={s.slideCount}>
                {currentIndex + 1}/{totalSlides}
              </div>

              {isMobile && (
                <button onClick={nextSlide}>
                  <svg
                    viewBox="0 0 42 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.584015 8.57143L9.05573 0L10.4677 1.42857L2.99422 8.99L42 8.99L42 11.01H2.99422L10.4677 18.5714L9.05573 20L0.584015 11.4286C-0.194679 10.6407 -0.194679 9.35929 0.584015 8.57143Z" />
                  </svg>
                </button>
              )}

              <button onClick={nextSlide}>
                <svg
                  viewBox="0 0 42 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className={s.videoContainer}>
            <img
              src={reviews[currentIndex].video}
              alt={reviews[currentIndex].reviewer}
            />

            <div className={s.impulse}>
              IMpulSE
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842854 3.84344 0 5.87827 0 8C0 10.1217 0.842854 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 14.4C7.15949 14.4 6.32721 14.2344 5.55067 13.9128C4.77414 13.5911 4.06857 13.1197 3.47423 12.5254C2.8799 11.931 2.40845 11.2255 2.0868 10.4489C1.76515 9.67239 1.5996 8.84011 1.5996 7.9996C1.5996 7.15909 1.76515 6.32681 2.0868 5.55027C2.40845 4.77374 2.8799 4.06817 3.47423 3.47383C4.06857 2.8795 4.77414 2.40805 5.55067 2.0864C6.32721 1.76475 7.15949 1.5992 8 1.5992C9.69749 1.5992 11.3255 2.27353 12.5258 3.47383C13.7261 4.67414 14.4004 6.30211 14.4004 7.9996C14.4004 9.69709 13.7261 11.3251 12.5258 12.5254C11.3255 13.7257 9.69749 14.4 8 14.4Z"
                  fill="#1D1D1D"
                />
                <path
                  d="M11.2008 6.4C11.2008 5.76348 10.9479 5.15303 10.4978 4.70294C10.0477 4.25286 9.4373 4 8.80078 4H4.80078V12H6.40078V8.8H7.56878L9.70478 12H11.6248L9.42478 8.704C9.93223 8.56737 10.3808 8.26797 10.7016 7.85175C11.0225 7.43553 11.1978 6.92551 11.2008 6.4ZM8.80078 7.2H6.40078V5.6H8.80078C9.01295 5.6 9.21644 5.68429 9.36647 5.83431C9.5165 5.98434 9.60078 6.18783 9.60078 6.4C9.60078 6.61217 9.5165 6.81566 9.36647 6.96569C9.21644 7.11571 9.01295 7.2 8.80078 7.2Z"
                  fill="#1D1D1D"
                />
              </svg>
            </div>
          </div>
        </div>
      </Layout>
    </section>
  );
};
