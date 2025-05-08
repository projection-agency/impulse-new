import { useLocation } from "react-router";
import { Layout } from "../Layout/Layout";
import { TextAnimation } from "../TextAnimation/TextAnimation";
import s from "./EssenceSection.module.css";
import { motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";

export const EssenceSection = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const { t } = useTranslation();

  return (
    <motion.section
      className={s.section}
      style={pathname == "/" && isMobile ? { paddingTop: "20vw" } : {}}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <Layout className={s.container}>
        <motion.div className={s.imageBlock} variants={fadeUp}>
          <img src="/images/essence.avif" alt="Essence" />

          <svg
            className={s.filter}
            viewBox="0 0 1112 1042"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1357_543)">
              <ellipse cx="556" cy="521" rx="262" ry="227" fill="black" />
            </g>
            <defs>
              <filter
                id="filter0_f_1357_543"
                x="0"
                y="0"
                width="1112"
                height="1042"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="147"
                  result="effect1_foregroundBlur_1357_543"
                />
              </filter>
            </defs>
          </svg>

          <motion.a
            href=""
            className={s.inst}
            variants={fadeUp}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className={s.icon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1689_43)">
                  <path d="M18.9752 4.44141C18.654 4.44141 18.3926 4.70283 18.3926 5.02406C18.3926 5.3453 18.654 5.60672 18.9752 5.60672C19.2965 5.60672 19.5579 5.34534 19.5579 5.02406C19.5579 4.70278 19.2965 4.44141 18.9752 4.44141Z" />
                  <path d="M11.9975 6.83301C9.14925 6.83301 6.83203 9.15023 6.83203 11.9984C6.83203 14.8467 9.14925 17.1639 11.9975 17.1639C14.8457 17.1639 17.163 14.8467 17.163 11.9985C17.163 9.15027 14.8457 6.83301 11.9975 6.83301Z" />
                  <path d="M17.4208 0H6.57923C2.95144 0 0 2.95144 0 6.57928V17.4208C0 21.0486 2.95144 24 6.57923 24H17.4208C21.0486 24 24 21.0486 24 17.4208V6.57928C24 2.95144 21.0486 0 17.4208 0ZM12 18.5828C8.37023 18.5828 5.4173 15.6298 5.4173 12C5.4173 8.37023 8.37028 5.41734 12 5.41734C15.6297 5.41734 18.5828 8.37028 18.5828 12C18.5828 15.6297 15.6297 18.5828 12 18.5828ZM18.9765 7.02356C17.8737 7.02356 16.9765 6.12637 16.9765 5.02359C16.9765 3.92081 17.8737 3.02358 18.9765 3.02358C20.0792 3.02358 20.9764 3.92077 20.9764 5.02355C20.9764 6.12633 20.0792 7.02356 18.9765 7.02356Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1689_43">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className={s.desc}>
              <p>@mark_butkin</p>
              <span>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1350_1614)">
                    <path d="M9.85821 9.63406C11.1818 9.63406 12.3278 9.15936 13.2643 8.22278C14.2007 7.28635 14.6754 6.14057 14.6754 4.81688C14.6754 3.49364 14.2007 2.34771 13.2641 1.41097C12.3275 0.474699 11.1816 0 9.85821 0C8.53452 0 7.38873 0.474699 6.4523 1.41113C5.51587 2.34756 5.04102 3.49349 5.04102 4.81688C5.04102 6.14057 5.51587 7.2865 6.45245 8.22293C7.38904 9.1592 8.53497 9.63406 9.85821 9.63406Z" />
                    <path d="M18.2863 15.3793C18.2593 14.9896 18.2047 14.5645 18.1242 14.1156C18.0431 13.6633 17.9385 13.2358 17.8134 12.845C17.6842 12.4411 17.5084 12.0423 17.2911 11.66C17.0656 11.2633 16.8007 10.9178 16.5034 10.6336C16.1926 10.3362 15.8121 10.0971 15.372 9.92267C14.9335 9.74918 14.4475 9.66129 13.9276 9.66129C13.7234 9.66129 13.526 9.74506 13.1447 9.99332C12.91 10.1464 12.6355 10.3234 12.3291 10.5191C12.0671 10.6861 11.7122 10.8425 11.2738 10.9841C10.8461 11.1225 10.4118 11.1927 9.98322 11.1927C9.5546 11.1927 9.12048 11.1225 8.69232 10.9841C8.25439 10.8426 7.89948 10.6862 7.63779 10.5193C7.33429 10.3253 7.05963 10.1483 6.82144 9.99316C6.44058 9.7449 6.24298 9.66113 6.03882 9.66113C5.5188 9.66113 5.03296 9.74918 4.59457 9.92282C4.15482 10.0969 3.77411 10.336 3.46298 10.6337C3.16589 10.9181 2.90085 11.2635 2.67563 11.66C2.4585 12.0423 2.28271 12.441 2.15332 12.8452C2.02835 13.2359 1.92383 13.6633 1.84265 14.1156C1.76224 14.5639 1.70761 14.9892 1.6806 15.3798C1.65405 15.7625 1.64062 16.1597 1.64062 16.5608C1.64062 17.6048 1.9725 18.45 2.62695 19.0733C3.27332 19.6884 4.12857 20.0004 5.16861 20.0004H14.7987C15.8388 20.0004 16.6937 19.6886 17.3402 19.0733C17.9948 18.4505 18.3267 17.6051 18.3267 16.5607C18.3266 16.1577 18.313 15.7602 18.2863 15.3793Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1350_1614">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                13,4K
              </span>
            </div>
          </motion.a>
        </motion.div>

        <motion.div className={s.descBlock} variants={fadeUp}>
          <p className={s.essence}>{t("essence_title")}</p>

          <h3>
            <TextAnimation
              texts={[
                t("essence_text_1"),
                t("essence_text_2"),
                t("essence_text_3"),
                t("essence_text_4"),
              ]}
            />
          </h3>

          <span className={s.span}>{t("essence_author")}</span>

          <p className={s.bottomDesc}>{t("essence_desc")}</p>
        </motion.div>
      </Layout>
    </motion.section>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
