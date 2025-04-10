import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import s from "./ActualToursSection.module.css";
import { PopupTour } from "../PopupTour/PopupTour";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { TextAnimation } from "../TextAnimation/TextAnimation";

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
  input_desc: string;
  input_route: string;
  save_data_text: Day[];
  price_include: string[];
  price_uninclude: string[];
  load_image_text_image: string;
}

const fetchGallery = async () => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/tour`);
  return data;
};

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

const getYear = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.getFullYear();
};

export const ActualToursSection = ({
  lenis,
  openOrder,
}: {
  lenis?: InstanceType<typeof Lenis>;
  openOrder: (tour: TourType) => void;
}) => {
  const [activeTourId, setActiveTourId] = useState<number | null>(null);

  useEffect(() => {
    if (activeTourId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeTourId, lenis]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchGallery,
  });

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

  const handleTourPopup = (tourId: number) => {
    setActiveTourId(activeTourId === tourId ? null : tourId);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section id="tours" className={s.section}>
      <Layout>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <TextAnimation texts={["Актуальные", "event-туры"]} />
        </motion.h2>

        <div className={s.list}>
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
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.6" clipPath="url(#clip0_1340_1948)">
                          <path
                            d="M6.66667 10H5C4.08083 10 3.33333 10.7475 3.33333 11.6667V13.3333C3.33333 14.2525 4.08083 15 5 15H6.66667C7.58583 15 8.33333 14.2525 8.33333 13.3333V11.6667C8.33333 10.7475 7.58583 10 6.66667 10ZM5 13.3333V11.6667H6.66667V13.3333H5ZM15.8333 1.66667H15V0.833333C15 0.373333 14.6275 0 14.1667 0C13.7058 0 13.3333 0.373333 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.373333 6.29417 0 5.83333 0C5.3725 0 5 0.373333 5 0.833333V1.66667H4.16667C1.86917 1.66667 0 3.53583 0 5.83333V15.8333C0 18.1308 1.86917 20 4.16667 20H15.8333C18.1308 20 20 18.1308 20 15.8333V5.83333C20 3.53583 18.1308 1.66667 15.8333 1.66667ZM4.16667 3.33333H15.8333C17.2117 3.33333 18.3333 4.455 18.3333 5.83333V6.66667H1.66667V5.83333C1.66667 4.455 2.78833 3.33333 4.16667 3.33333ZM15.8333 18.3333H4.16667C2.78833 18.3333 1.66667 17.2117 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 17.2117 17.2117 18.3333 15.8333 18.3333Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1340_1948">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>
                        {getYear(item.input_date_start) || ""}.
                        {yearEditor(
                          item.input_date_start,
                          item.input_date_end
                        ) || ""}
                      </span>
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
                <div onClick={() => openOrder(item)}>Забронировать</div>
                <div onClick={() => handleTourPopup(item.id)}>Детальнее</div>
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
