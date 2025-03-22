import { useState, useEffect } from "react";
import s from "./ServicesSection.module.css";
import { Layout } from "../Layout/Layout";

const tabs = [
  {
    id: 1,
    tab: "Полет на вертолете",
    title: "Полет на <br/> вертолете",
    image: "/images/services-images/helicopter.avif",
    description:
      "Захватывающий вид с высоты, яркие эмоции и уникальная возможность увидеть самые красивые места маршрута с недоступной на земле перспективы",
  },
  {
    id: 2,
    tab: "Проживание в  роскошных отелях",
    title: "Проживание в <br/> роскошных отелях",
    image: "/images/services-images/hotels.avif",
    description:
      "Изысканные номера в отелях, соответствующих высочайшим стандартам премиального отдыха",
  },
  {
    id: 3,
    tab: "Гастрономические приключения",
    title: "Гастрономические <br/> приключения",
    image: "/images/services-images/hastro.avif",
    description:
      "Погружение в мир уникальных вкусов с изысканными блюдами и авторской кухней",
  },
  {
    id: 4,
    tab: "Профессиональная  фото и видеосъёмка",
    title: "Профессиональная <br/> фото и видеосъёмка",
    image: "/images/services-images/photos.avif",
    description:
      "Лучшие моменты вашего отдыха в кадрах, выполненных с непревзойдённым мастерством и уникальным стилем",
  },
  {
    id: 5,
    tab: "Брендирование авто, вертолётов и локаций",
    title: "Брендирование авто, <br/> вертолётов и локаций",
    image: "/images/services-images/hastro.avif",
    description: "Уникальная деталь для полного погружения в эксклюзивность",
  },
  {
    id: 6,
    tab: "Индивидуальные номерные знаки",
    title: "Индивидуальные <br/> номерные знаки",
    image: "/images/services-images/numbers.avif",
    description: "Частичка вас, дополняющая атмосферу путешествия",
  },
];

export const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    // Створюємо новий інтервал лише один раз при ініціалізації компонента
    const newInterval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab % tabs.length) + 1);
    }, 10000);

    // Очищаємо інтервал при розмонтуванні компонента
    return () => clearInterval(newInterval);
  }, []); // Пустий масив залежностей для запуску лише один раз

  return (
    <section
      className={s.section}
      style={{
        backgroundImage: `url(${
          tabs.find((tab) => tab.id === activeTab)?.image
        })`,
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Layout>
        <div className={s.tabsController}>
          <ul className={s.tabs}>
            {tabs.map((tab) => (
              <li key={tab.id} onClick={() => setActiveTab(tab.id)}>
                <p className={`${tab.id === activeTab && s.active}`}>
                  <span>0{tab.id}</span>
                  <span>{tab.tab}</span>
                </p>

                <div className={s.progressLayout}>
                  <div
                    className={s.progressBar}
                    style={{
                      width: activeTab === tab.id ? "100%" : "0%",
                      height: "2px",
                      backgroundColor: "white",
                      transition:
                        activeTab === tab.id ? "width 10s linear" : "none",
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setActiveTab((prev) => (prev % tabs.length) + 1)}
          >
            <svg
              viewBox="0 0 42 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z" />
            </svg>
          </button>
        </div>

        <div className={s.tabContent}>
          <div className={s.titleContainer}>
            <p>Дополнительные бонусы к вашему путешествию</p>

            <h2
              dangerouslySetInnerHTML={{
                __html: tabs[activeTab - 1]?.title?.includes("<br")
                  ? tabs[activeTab - 1]?.title.replace(/<br\s*\/?>/g, "<br /> ")
                  : tabs[activeTab - 1]?.title || "",
              }}
            ></h2>
          </div>

          <div className={s.tabDesc}>
            <p>{tabs[activeTab - 1].description}</p>
          </div>
        </div>
      </Layout>
    </section>
  );
};
