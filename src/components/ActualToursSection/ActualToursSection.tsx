import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import s from "./ActualToursSection.module.css";
import { PopupTour } from "../PopupTour/PopupTour";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { TextAnimation } from "../TextAnimation/TextAnimation";
import { Link, useLocation } from "react-router";
import { useGlobalProps } from "../../GlobalPropContext";
import { Car } from "../CarsSection/CarsSection";

export interface Day {
  hl_input_title: string;
  hl_image_image: string;
  hl_input_way: string;
  hl_input_distance: string;
  hl_input_description: string;
}

export interface TourType {
  id: number;
  title: { rendered: string };
  load_image_text_main_image: string;
  input_location?: string;
  price?: string;
  input_date_start: string;
  input_date_end: string;
  input_main_price: string;
  coast_booking: string;
  coast_content_11: string;
  coast_content_12: string;
  coast_content_21: string;
  coast_content_22: string;
  coast_title_1: string;
  coast_title_2: string;
  input_sec_desk: string;
  input_desc: string;
  input_route: string;
  save_data_text: Day[];
  price_include: string[];
  price_uninclude: string[];
  load_image_text_image: string;
  slug: string;
  cars: Car[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const yearEditor = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const formattedStartDate = startDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
  });

  const formattedEndDate = endDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${formattedStartDate} – ${formattedEndDate}`;
};

export const ActualToursSection = ({
  lenis,
  openOrder,
}: {
  lenis?: InstanceType<typeof Lenis>;
  openOrder: (tour: TourType) => void;
}) => {
  const [activeTourId, setActiveTourId] = useState<number | null>(null);
  const { pathname } = useLocation();
  const { tours: data } = useGlobalProps();

  useEffect(() => {
    if (activeTourId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeTourId, lenis]);

  const dateEditor = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startDay = startDate.getDate();

    const formattedEndDate = endDate.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });

    const formattedStartDay = startDay < 10 ? "0" + startDay : startDay;

    return `${formattedStartDay} – ${formattedEndDate}`;
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="tours" className={s.section}>
      <Layout>
        <h2 data-aos="fade-up">
          <TextAnimation texts={["Актуальные", "event-туры"]} />
        </h2>

        <div
          className={`${s.list} ${
            pathname === "/actual-tours" ? s.eventPage : ""
          }`}
        >
          {data.map((item: TourType, index: number) => (
            <motion.div
              key={item.id}
              className={s.item}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                style={{
                  backgroundImage: `url(${item.load_image_text_main_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                }}
                className={s.imageContainer}
              >
                <h3>
                  {item.title.rendered.split(" ").map((word, index) =>
                    index === 0 ? (
                      <span key={index}>
                        {word}
                        <br />
                      </span>
                    ) : (
                      <span key={index}> {word}</span>
                    )
                  )}
                </h3>

                <div>
                  <span>
                    {dateEditor(
                      item.input_date_start || "",
                      item.input_date_end || ""
                    )}
                  </span>
                </div>

                <div className={s.verticalText}>{item.input_route}</div>
              </div>
              <div>
                <div className={s.bottomHeading}>
                  <div>
                    <h4>{item.title.rendered}</h4>
                    <div className={s.location}>
                      <span>{item.input_location}</span>
                    </div>
                  </div>

                  <div className={s.priceBlock}>
                    <svg
                      viewBox="0 0 42 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                        fill="white"
                      />
                      <path
                        d="M10 11.6665C5.85977 11.6711 2.50461 15.0263 2.5 19.1665C2.5 19.6267 2.87309 19.9998 3.33332 19.9998H16.6666C17.1269 19.9998 17.5 19.6267 17.5 19.1665C17.4954 15.0263 14.1402 11.6711 10 11.6665Z"
                        fill="white"
                      />
                      <path
                        d="M31.672 17V8.288H28.396V6.272H28.936C30.646 6.272 31.69 5.372 31.816 4.022H34.318V17H31.672Z"
                        fill="white"
                      />
                    </svg>
                    <div className={s.slash}>/</div> <span>от</span>{" "}
                    {item.input_main_price || "Не указано"}
                  </div>
                </div>
              </div>
              <div className={s.btnContainer}>
                <div onClick={() => openOrder(item)}>Забронировать </div>
                <Link to={`/tour/${item.slug}`}>Подробнее</Link>
              </div>
              <AnimatePresence>
                {activeTourId === item.id && (
                  <PopupTour
                    info={item}
                    onClose={() => setActiveTourId(null)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Layout>
    </section>
  );
};
