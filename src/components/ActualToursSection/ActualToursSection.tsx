import { useState } from "react";
import { Layout } from "../Layout/Layout";
import s from "./ActualToursSection.module.css";
import { PopupTour } from "../PopupTour/PopupTour";

const tourItems = [
  {
    id: 1,
    title: "Lamborghini 2.0",
    date: "01 – 05.06",
    route: "germany – italy",
    location: "Италия",
    image: "/temp/tour-item/1.jpg",
    price: "6 250€",
    days: [
      {
        date: "25.06",
        image: "/temp/tour-slider/1.jpg",
        location: "Munich, Germany",
        time: "",
        description:
          "Слёт всех участников в Мюнхене, заселение в отель Andaz и отдых. Затем посещение Motorworld – музея, где собраны 30 самых дорогих автобрендов мира. Завершаем день знакомственным ужином – мини-мероприятие, на котором представляемся и рассказываем о предстоящем туре.",
      },
      {
        date: "26.06",
        image: "/temp/tour-slider/2.jpg",
        location: "Munich, Germany → Austria",
        time: " 217 км — 3 ч 10 м",

        description:
          "Старт автопробега. Участники выезжают из Мюнхена и отправляются в сторону Австрии. Остановка в гоночном кафе PolePosition для небольшого отдыха. Затем прибытие в отель Das Central, расположенный в живописном месте в Австрии. Вечерняя программа включает ужин и обсуждение планов следующего дня.",
      },
      {
        date: "27.06",
        image: "/temp/tour-slider/2.jpg",
        location: "Austria → Zugspitze, Germany",
        time: "212 км —  4 ч 15 м",
        description:
          "День начинается с путешествия к самой высокой горе Германии – Zugspitze. Участники поднимаются на смотровую площадку, откуда открывается захватывающий вид на Альпы. Затем следуем дальше по маршруту с остановками для фото и отдыха. Заселение в отель и вечерняя программа.",
      },
      {
        date: "28.06",
        image: "/temp/tour-slider/3.jpg",
        location: "Austria → St. Moritz, Switzerland",
        time: "116 км — 2 ч",
        description:
          "Продолжаем путешествие через живописные альпийские дороги. Сегодня финишируем в элитном швейцарском курорте St. Moritz. Заселение в пятизвёздочный отель. Вечером – ужин и свободное время для прогулок по городу.",
      },
      {
        date: "29.06",
        image: "/temp/tour-slider/4.jpg",
        location: "St. Moritz, Switzerland → Como, Italy",
        time: "",
        description:
          "Финальный день тура – вечер в стиле dolce vita. Мы вспоминаем лучшие моменты автопутешествия, наслаждаемся изысканной кухней, шоу-программой и беседуем с приглашёнными спикерами. Завершаем вечер кинопремьерой автопробега «Мультибренд»",
      },
    ],
  },
  {
    id: 2,
    title: "Multibrandtour",
    date: "25 – 29.06",
    route: "germany – Austria – switzerland – italy",
    location: "Италия",
    image: "/temp/tour-item/2.jpg",
    price: "5 500€",
    days: [
      {
        date: "25.06",
        image: "/temp/tour-slider/1.jpg",
        location: "Munich, Germany",
        time: "",
        description:
          "Слёт всех участников в Мюнхене, заселение в отель Andaz и отдых. Затем посещение Motorworld – музея, где собраны 30 самых дорогих автобрендов мира. Завершаем день знакомственным ужином – мини-мероприятие, на котором представляемся и рассказываем о предстоящем туре.",
      },
      {
        date: "26.06",
        image: "/temp/tour-slider/2.jpg",
        location: "Munich, Germany → Austria",
        time: " 217 км — 3 ч 10 м",

        description:
          "Старт автопробега. Участники выезжают из Мюнхена и отправляются в сторону Австрии. Остановка в гоночном кафе PolePosition для небольшого отдыха. Затем прибытие в отель Das Central, расположенный в живописном месте в Австрии. Вечерняя программа включает ужин и обсуждение планов следующего дня.",
      },
      {
        date: "27.06",
        image: "/temp/tour-slider/2.jpg",
        location: "Austria → Zugspitze, Germany",
        time: "212 км —  4 ч 15 м",
        description:
          "День начинается с путешествия к самой высокой горе Германии – Zugspitze. Участники поднимаются на смотровую площадку, откуда открывается захватывающий вид на Альпы. Затем следуем дальше по маршруту с остановками для фото и отдыха. Заселение в отель и вечерняя программа.",
      },
      {
        date: "28.06",
        image: "/temp/tour-slider/3.jpg",
        location: "Austria → St. Moritz, Switzerland",
        time: "116 км — 2 ч",
        description:
          "Продолжаем путешествие через живописные альпийские дороги. Сегодня финишируем в элитном швейцарском курорте St. Moritz. Заселение в пятизвёздочный отель. Вечером – ужин и свободное время для прогулок по городу.",
      },
      {
        date: "29.06",
        image: "/temp/tour-slider/4.jpg",
        location: "St. Moritz, Switzerland → Como, Italy",
        time: "",
        description:
          "Финальный день тура – вечер в стиле dolce vita. Мы вспоминаем лучшие моменты автопутешествия, наслаждаемся изысканной кухней, шоу-программой и беседуем с приглашёнными спикерами. Завершаем вечер кинопремьерой автопробега «Мультибренд»",
      },
    ],
  },
];

export const ActualToursSection = () => {
  const [activeTourId, setActiveTourId] = useState<number | null>(null);

  const handleTourPopup = (tourId: number) => {
    setActiveTourId(activeTourId === tourId ? null : tourId);
  };

  return (
    <section className={s.section}>
      <Layout>
        <h2>
          Актуальные
          <br /> event-туры
        </h2>

        <div className={s.list}>
          {tourItems.map((item) => (
            <>
              <div className={s.item} key={item.id}>
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                  }}
                  className={s.imageContainer}
                >
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                  <p className={s.verticalText}>{item.route}</p>
                </div>

                <div>
                  <div className={s.bottomHeading}>
                    <div>
                      <h4>{item.title}</h4>
                      <div className={s.location}>
                        <span>{item.location}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <div className={s.priceBlock}>
                      / <span>от</span> {item.price}
                    </div>
                  </div>
                </div>

                <div className={s.btnContainer}>
                  <div>Забронировать</div>
                  <div onClick={() => handleTourPopup(item.id)}>Детальнее</div>
                </div>
              </div>
              {activeTourId === item.id && (
                <PopupTour info={item} onClose={() => setActiveTourId(null)} />
              )}
            </>
          ))}
        </div>
      </Layout>
    </section>
  );
};
