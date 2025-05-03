import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";
import s from "./ReviewSection.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";

const fetchReviews = async () => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/review`);
  return data;
};

export const ReviewSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const totalSlides = data.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    pauseVideo();
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause(); // 🛑 СТОП відео
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video?.addEventListener("play", handlePlay);
    video?.addEventListener("pause", handlePause);

    return () => {
      video?.removeEventListener("play", handlePlay);
      video?.removeEventListener("pause", handlePause);
    };
  }, [currentIndex]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const currentItem = data[currentIndex];
  const hasVideo = Boolean(currentItem?.load_video_text);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data[currentIndex]) {
    return null;
  }

  return (
    <section id="reviews" className={s.section}>
      <Layout className={s.container}>
        <h2>
          <AnimatedHeading text="отзывы участников" />
        </h2>
        <div className={s.reviewContainer}>
          <div className={s.reviewerInfoContainer}>
            <div>
              <div className={s.tourDesc}>
                <span>{data[currentIndex].input_name}</span>
                <div></div>
                <span>{data[currentIndex].review_tour.input_location}</span>
                <div></div>
                <span>{data[currentIndex].review_tour.input_title}</span>
                <div></div>
                <span>{data[currentIndex].review_tour.input_date_end}</span>
              </div>
              <h3
                dangerouslySetInnerHTML={{
                  __html: data[currentIndex].input_quote,
                }}
              ></h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: data[currentIndex].input_review,
                }}
              ></p>
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
                {data.map((_: unknown, index: number) => (
                  <span
                    key={index}
                    className={
                      totalSlides === 1 || index === currentIndex
                        ? s.activeBullet
                        : s.bullet
                    }
                  ></span>
                ))}
              </div>

              <div className={s.slideCount}>
                {currentIndex + 1}/{totalSlides}
              </div>

              {isMobile && (
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
              src={
                currentItem.load_image_text_image || "/images/review-bg.avif"
              }
              alt=""
              className={`${s.poster} ${isPlaying ? s.posterHidden : ""}`}
            />
            {hasVideo ? (
              <video
                key={`video-${currentIndex}`}
                ref={videoRef}
                className={`${s.video} ${s.active}`}
                poster={currentItem.load_image_text_image || null}
                loop
                playsInline
                muted={false}
                autoPlay={false}
              >
                <source src={currentItem?.load_video_text} type="video/mp4" />
              </video>
            ) : (
              <img src={currentItem?.load_image_text_image || null} />
            )}

            {hasVideo && !isPlaying && currentItem?.load_video_text && (
              <button className={s.playButton} onClick={handlePlayClick}>
                {isMobile ? (
                  <svg
                    width="375"
                    height="150"
                    viewBox="0 0 375 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="-741"
                      y1="74.5"
                      x2="113"
                      y2="74.5"
                      stroke="white"
                    />
                    <line
                      x1="263"
                      y1="74.5"
                      x2="1117"
                      y2="74.5001"
                      stroke="white"
                    />
                    <rect
                      opacity="0.2"
                      x="113.5"
                      y="0.5"
                      width="149"
                      height="149"
                      rx="74.5"
                      stroke="white"
                    />
                    <path
                      d="M195.786 71.304L187.041 64.8874C186.358 64.3872 185.55 64.086 184.706 64.0171C183.862 63.9483 183.016 64.1144 182.261 64.4972C181.506 64.88 180.872 65.4644 180.428 66.1856C179.985 66.9069 179.75 67.7368 179.75 68.5834V81.4167C179.75 82.2636 179.985 83.094 180.428 83.8156C180.872 84.5371 181.507 85.1218 182.262 85.5045C183.018 85.8872 183.864 86.0532 184.708 85.9838C185.553 85.9145 186.361 85.6127 187.044 85.1118L195.789 78.6951C196.369 78.2694 196.841 77.713 197.167 77.0708C197.492 76.4287 197.662 75.719 197.662 74.9991C197.662 74.2793 197.492 73.5695 197.167 72.9274C196.841 72.2853 196.369 71.7288 195.789 71.3031L195.786 71.304ZM194.701 77.2165L185.956 83.6332C185.546 83.9326 185.062 84.1128 184.556 84.1538C184.05 84.1949 183.543 84.0951 183.09 83.8657C182.637 83.6362 182.257 83.286 181.991 82.8538C181.725 82.4216 181.584 81.9242 181.583 81.4167V68.5834C181.578 68.0749 181.717 67.5754 181.983 67.1421C182.249 66.7088 182.632 66.3594 183.088 66.134C183.475 65.9369 183.904 65.8338 184.339 65.8334C184.922 65.8356 185.489 66.0249 185.956 66.3733L194.701 72.79C195.049 73.0454 195.332 73.3792 195.527 73.7643C195.721 74.1493 195.823 74.5749 195.823 75.0065C195.823 75.4381 195.721 75.8636 195.527 76.2487C195.332 76.6337 195.049 76.9675 194.701 77.223V77.2165Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 212 212"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.2"
                      x="0.5"
                      y="0.5"
                      width="211"
                      height="211"
                      rx="105.5"
                      stroke="white"
                    />
                    <path
                      d="M113.786 102.304L105.041 95.8874C104.358 95.3872 103.55 95.086 102.706 95.0171C101.862 94.9483 101.016 95.1144 100.261 95.4972C99.5059 95.88 98.8716 96.4644 98.4284 97.1856C97.9852 97.9069 97.7504 98.7368 97.75 99.5834V112.417C97.7502 113.264 97.985 114.094 98.4284 114.816C98.8718 115.537 99.5065 116.122 100.262 116.504C101.018 116.887 101.864 117.053 102.708 116.984C103.553 116.915 104.361 116.613 105.044 116.112L113.789 109.695C114.369 109.269 114.841 108.713 115.167 108.071C115.492 107.429 115.662 106.719 115.662 105.999C115.662 105.279 115.492 104.57 115.167 103.927C114.841 103.285 114.369 102.729 113.789 102.303L113.786 102.304ZM112.701 108.217L103.956 114.633C103.546 114.933 103.062 115.113 102.556 115.154C102.05 115.195 101.543 115.095 101.09 114.866C100.637 114.636 100.257 114.286 99.9911 113.854C99.7252 113.422 99.584 112.924 99.5833 112.417V99.5834C99.5782 99.0749 99.7167 98.5754 99.9828 98.1421C100.249 97.7088 100.632 97.3594 101.088 97.134C101.475 96.9369 101.904 96.8338 102.339 96.8334C102.922 96.8356 103.489 97.0249 103.956 97.3733L112.701 103.79C113.049 104.045 113.332 104.379 113.527 104.764C113.721 105.149 113.823 105.575 113.823 106.006C113.823 106.438 113.721 106.864 113.527 107.249C113.332 107.634 113.049 107.967 112.701 108.223V108.217Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            )}

            {hasVideo && isPlaying && (
              <button
                onClick={() => videoRef.current?.pause()}
                className={s.pauseButton}
              >
                Pause
              </button>
            )}

            <div className={s.impulse}>
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
