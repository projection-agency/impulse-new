import { useEffect, useRef, useState } from "react";
import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import s from "./ChroniclesSection.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import { useWindowSize } from "../../hooks/useWindowSize";
import { motion, useInView } from "framer-motion";

interface ImageItem {
  cars: string;
}

const fetchGallery = async () => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/travel_journal`);
  return data;
};

export const ChroniclesSection = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
  });

  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState((1 / data.length) * 100);

  const uniqueCars: string[] = Array.from(
    new Set(data.flatMap((item: ImageItem) => item.cars))
  );

  const filteredData = selectedCar
    ? data.filter((item: ImageItem) => item.cars === selectedCar)
    : data;

  useEffect(() => {
    setProgress((1 / filteredData.length) * 100);
  }, [selectedCar, filteredData]);

  const tabRef = useRef(null);
  const tabInView = useInView(tabRef, { once: false, amount: 0.3 });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className={s.section}>
      <Layout>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={s.titleContainer}
        >
          <h2>Хроники путешествий</h2>
          {!isMobile && <SiteButton />}
        </motion.div>

        {!isMobile && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={s.progressBarContainer}
          >
            <div
              className={s.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </motion.div>
        )}

        <motion.div
          ref={tabRef}
          variants={fadeUp}
          initial="hidden"
          animate={tabInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={s.tabController}
        >
          {uniqueCars.map((car, index) => (
            <div
              key={index}
              onClick={() => setSelectedCar(car === selectedCar ? null : car)}
              className={selectedCar === car ? s.active : ""}
            >
              {car}
              <span>
                ({data.filter((item: ImageItem) => item.cars === car).length})
              </span>
            </div>
          ))}
        </motion.div>

        {isMobile && (
          <div className={s.progressBarContainer}>
            <div
              className={s.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </Layout>

      <div className={s.sliderWrapper}>
        <div className={s.swiperController}>
          <div ref={prevRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0222 31.8507L23.9648 30.9081L9.52884 16.4721C9.40218 16.3454 9.33418 16.1787 9.33418 16.0001C9.33418 15.8214 9.40351 15.6547 9.52884 15.5281L23.9648 1.09208L23.0222 0.149414L8.58618 14.5854C8.20885 14.9627 8.00084 15.4654 8.00084 16.0001C8.00084 16.5347 8.20885 17.0361 8.58618 17.4147L23.0222 31.8507Z"
                fill="white"
              />
            </svg>
          </div>

          <div ref={nextRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97782 31.8507L8.03516 30.9081L22.4712 16.4721C22.5978 16.3454 22.6658 16.1787 22.6658 16.0001C22.6658 15.8214 22.5965 15.6547 22.4712 15.5281L8.03516 1.09208L8.97782 0.149414L23.4138 14.5854C23.7912 14.9627 23.9992 15.4654 23.9992 16.0001C23.9992 16.5347 23.7912 17.0361 23.4138 17.4147L8.97782 31.8507Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={0.95}
          initialSlide={0}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          modules={[Navigation]}
          onInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          onSlideChange={(swiper) => {
            const progress =
              ((swiper.activeIndex + 1) / swiper.slides.length) * 100;
            setProgress(progress);
          }}
          className={s.swiperContainer}
        >
          {filteredData.map(
            (image: {
              id: number;
              load_image_text_photo: string;
              input_way_start: string;
              input_way_end: string;
              input_date: string;
            }) =>
              image.load_image_text_photo ? (
                <motion.div
                  key={image.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <SwiperSlide className={s.slide}>
                    <img src={image.load_image_text_photo} alt="" />
                    <div className={s.slideBottomInfo}>
                      <p className={s.route}>
                        {image.input_way_start}
                        <span></span>
                        {image.input_way_end}
                      </p>
                      <p>{image.input_date}</p>
                    </div>
                  </SwiperSlide>
                </motion.div>
              ) : null
          )}
        </Swiper>
      </div>
    </section>
  );
};
