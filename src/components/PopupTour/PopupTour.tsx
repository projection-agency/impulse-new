import { FC, useState } from "react";
import s from "./PopupTour.module.css";

interface Day {
  date: string;
  image: string;
  location: string;
  time: string;
  description: string;
}

interface PopupTourProps {
  info: {
    title: string;
    date: string;
    days: Day[];
  };
  onClose: () => void;
}

export const PopupTour: FC<PopupTourProps> = ({ info, onClose }) => {
  const [currentDay, setCurrentDay] = useState(0);

  const totalDays = info.days.length;
  const currentSlide = info.days[currentDay];

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
    <div className={s.popupOverlay}>
      <div className={s.popupContent}>
        <div className={s.mainInfo}>
          <div className={s.tourInfo}>
            <span>{info.date}</span>
            <h3>{info.title}</h3>

            <p>
              Погружение в мир скорости, роскоши и незабываемых эмоций.
              Уникальное автопутешествие через живописные Доломиты на
              Lamborghini с участием предпринимателей и экспертов со всего мира.
              Тур включает в себя вождение на немецких автобанах без ограничений
              скорости, ночёвки в премиальных отелях 4-5*, эксклюзивные
              развлечения и вертолётный тур над Альпами. Финальный аккорд —
              прощальный ужин в атмосфере стиля и элегантности.
            </p>
          </div>
        </div>

        <div
          className={s.sliderContainer}
          style={{
            backgroundImage: currentSlide
              ? `url(${currentSlide.image})`
              : "none",
          }}
        >
          <button onClick={onClose} className={s.closeBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              fill="none"
            >
              <path
                d="M39 39L13 13M39 13L13 39"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={s.daysSlider}>
            <div>
              <div className={s.counter}>
                <span className={s.current}>0{currentDay + 1}</span>
                <div></div>
                <span>0{info.days.length}</span>
              </div>

              <p className={s.date}>
                <span>ДЕНЬ</span>
                <span>{currentDay + 1}</span>
                <span>({currentSlide.date})</span>
              </p>

              <div className={s.image}>
                <img src={currentSlide.image} alt="image" />
                <div className={s.location}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 9 17"
                    fill="none"
                  >
                    <rect x="4" y="4.5" width="1" height="12" fill="white" />
                    <circle cx="4.5" cy="5" r="4" fill="white" />
                  </svg>
                  {currentSlide.location}
                </div>
              </div>

              <p className={s.dayDescription}>{currentSlide.description}</p>
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
      </div>
    </div>
  );
};
