import { FC, useState } from "react";
import s from "./TourDaysSection.module.css";
import { Day } from "../ActualToursSection/ActualToursSection";

interface TourDaysProps {
  info: {
    title: { rendered: string };
    input_desc: string;
    input_date_start: string;
    input_date_end: string;
    save_data_text: Day[];
    coast_booking: string;
    coast_content_11: string;
    coast_content_12: string;
    coast_content_21: string;
    coast_content_22: string;
    coast_title_1: string;
    coast_title_2: string;
    price_include: string[];
    price_uninclude: string[];
    load_image_text_image: string;
  };
}

export const TourDaysSection: FC<TourDaysProps> = ({ info }) => {
  const [currentDay, setCurrentDay] = useState(0);

  const totalDays = info.save_data_text.length;
  const currentSlide = info.save_data_text[currentDay];

  const handlePrev = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNext = () => {
    if (currentDay < totalDays - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <section id="tour-program" className={s.section}>
      <div
        className={s.sliderContainer}
        style={{
          backgroundImage: currentSlide
            ? `url(${currentSlide.hl_image_image})`
            : "none",
        }}
      >
        <div style={{ display: "none" }}>
          {info.save_data_text.map((day, index) => (
            <img
              key={index}
              src={day.hl_image_image}
              alt={`Preload day ${index}`}
            />
          ))}
        </div>

        <div className={s.daysSlider}>
          <div>
            <div className={s.counter}>
              <span className={s.current}>0{currentDay + 1}</span>
              <div></div>
              <span>0{info.save_data_text.length}</span>
            </div>

            <p className={s.date}>
              <span>{currentSlide.hl_input_title}</span>
            </p>

            <div className={s.image}>
              <img src={currentSlide.hl_image_image} alt="image" />
              <div className={s.location}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 9 17"
                  fill="none"
                >
                  <rect x="4" y="4.5" width="1" height="12" fill="white" />
                  <circle cx="4.5" cy="5" r="4" fill="white" />
                </svg>
                {currentSlide.hl_input_way}
              </div>
            </div>

            <p className={s.distance}>{currentSlide.hl_input_distance}</p>

            <p className={s.dayDescription}>
              {currentSlide.hl_input_description}
            </p>
          </div>

          <div className={s.controller}>
            <button onClick={handlePrev} disabled={currentDay === 0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path d="M15.6841 21.5671L16.3125 20.9386L6.6885 11.3146C6.60406 11.2302 6.55872 11.1191 6.55872 11C6.55872 10.8809 6.60495 10.7697 6.6885 10.6853L16.3125 1.06131L15.6841 0.432861L6.06006 10.0569C5.8085 10.3084 5.66983 10.6435 5.66983 11C5.66983 11.3564 5.8085 11.6906 6.06006 11.9431L15.6841 21.5671Z" />
              </svg>
            </button>

            <div className={s.progressBarWrapper}>
              <div
                className={s.progressBar}
                style={{ width: `${((currentDay + 1) / totalDays) * 100}%` }}
              ></div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentDay === totalDays - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path d="M6.31594 21.5671L5.6875 20.9386L15.3115 11.3146C15.3959 11.2302 15.4413 11.1191 15.4413 11C15.4413 10.8809 15.3951 10.7697 15.3115 10.6853L5.6875 1.06131L6.31594 0.432861L15.9399 10.0569C16.1915 10.3084 16.3302 10.6435 16.3302 11C16.3302 11.3564 16.1915 11.6906 15.9399 11.9431L6.31594 21.5671Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={s.routeContainer}>
        <h3>маршрут</h3>

        <div className={s.routeImage}>
          <img src={info.load_image_text_image} alt="" />
        </div>
      </div>
    </section>
  );
};
