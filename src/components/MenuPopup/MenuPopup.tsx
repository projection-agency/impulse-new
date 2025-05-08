import { motion } from "framer-motion";
import s from "./MenuPopup.module.css";
import { Link, useLocation } from "react-router";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useGlobalProps } from "../../GlobalPropContext";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MenuPopup = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const [hasMounted, setHasMounted] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { pathname } = useLocation();

  const { menuToggle } = useGlobalProps();

  useEffect(() => {
    if (hasMounted) {
      menuToggle();
    } else {
      setHasMounted(true);
    }
  }, [pathname]);

  return (
    <motion.div
      data-lenis-prevent
      className={s.popupOverlay}
      initial={{ x: "" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {!isMobile && (
        <motion.div
          className={s.imageWrapper}
          initial={{ x: "200%" }}
          animate={{ x: 0 }}
          exit={{ x: "200%" }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        />
      )}

      <motion.div
        className={s.popupContent}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={s.navBlock}>
          {isMobile && (
            <div className={s.langController}>
              <div
                onClick={() => changeLanguage("ru")}
                className={i18n.language === "ru" ? s.active : ""}
              >
                РУ
              </div>
              <div
                onClick={() => changeLanguage("en")}
                className={i18n.language === "en" ? s.active : ""}
              >
                EN
              </div>
            </div>
          )}

          <h3>{t("Меню")}</h3>

          <ul>
            <li>
              <Link data-text={t("Приватные туры")} to="/private-tours">
                {t("Приватные туры")}
              </Link>
            </li>
            <li>
              <Link data-text={t("туры для бизнеса")} to="/business-tours">
                {t("туры для бизнеса")}
              </Link>
            </li>
            <li>
              <Link data-text={t("Актуальные Event-туры")} to="/actual-tours">
                {t("Актуальные Event-туры")}
              </Link>
            </li>
            <li>
              <Link data-text={t("контакты")} to="/contact">
                {t("контакты")}
              </Link>
            </li>
          </ul>
        </div>

        <div className={s.popupContactBlock}>
          <address>
            <div>
              <p>{t("написать нам")}</p>
              <a data-text={t("email")} href={`mailto:${t("email")}`}>
                {t("email")}
              </a>
            </div>
            <div>
              <p>{t("позвонить нам")}</p>
              <a
                data-text={t("phone")}
                href={`tel:${t("phone").replace(/[^+\d]/g, "")}`}
              >
                {t("phone")}
              </a>
            </div>
          </address>

          <div className={s.socialBlock}>
            <ul>
              <li>
                <a href="">
                  {/* Telegram icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.96307 11.8729L6.79339 13.5134L18.2611 6.50257C18.4274 6.4009 18.5977 6.62667 18.4543 6.75864L9.77238 14.75L9.44952 19.2239C9.42493 19.5642 9.83491 19.7537 10.0782 19.5145L12.7514 16.8858L17.6381 20.5852C18.1649 20.984 18.9276 20.7029 19.0697 20.0577L22.4724 4.6077C22.6665 3.72633 21.8029 2.9826 20.96 3.30537L1.93849 10.5892C1.34179 10.8177 1.35804 11.6675 1.96307 11.8729Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="">
                  {/* Viber icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1730_84)">
                      <path d="M12.003 0H11.997C5.3805 0 0 5.382 0 12C0 14.625 0.846 17.058 2.2845 19.0335L0.789 23.4915L5.4015 22.017C7.299 23.274 9.5625 24 12.003 24C18.6195 24 24 18.6165 24 12C24 5.3835 18.6195 0 12.003 0Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1730_84">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
              <li>
                <a href="">
                  {/* Instagram icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.4208 0H6.57923C2.95144 0 0 2.95144 0 6.57928V17.4208C0 21.0486 2.95144 24 6.57923 24H17.4208C21.0486 24 24 21.0486 24 17.4208V6.57928C24 2.95144 21.0486 0 17.4208 0Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
