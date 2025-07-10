import { Link } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./Footer.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const isMobile = width < 1024;

  return (
    <footer className={s.footer}>
      <Layout>
        <div className={s.footerTopContainer}>
          <div className={s.logoBlock}>
            <div className="flex justify-between items-center mb-[8.5vw] lg:mb-[0]">
              <a href="">
                <SiteLogo fill={"white"} />
              </a>
              {isMobile && (
                <div className={s.anchor} onClick={() => window.scrollTo(0, 0)}>
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M31.8498 23.0222L30.9071 23.9648L16.4711 9.52884C16.3444 9.40218 16.1778 9.33418 15.9991 9.33418C15.8204 9.33418 15.6538 9.40351 15.5271 9.52884L1.0911 23.9648L0.148437 23.0222L14.5844 8.58618C14.9618 8.20884 15.4644 8.00084 15.9991 8.00084C16.5338 8.00084 17.0351 8.20884 17.4138 8.58618L31.8498 23.0222Z" />
                  </svg>
                </div>
              )}
            </div>

            {!isMobile && (
              <div className={s.desc}>
                <p>{t("footer_desc_1")}</p>
                <p>{t("footer_desc_2")}</p>
              </div>
            )}

            {isMobile && (
              <div className={s.desc}>
                <p>
                  {t("footer_desc_1")} {t("footer_desc_2")}
                </p>
              </div>
            )}

            <img
              className={s.footerBgLogo}
              src="/images/footer-bg-logo.svg"
              alt="logo"
            />
          </div>

          <div className={s.contactBlock}>
            <div className={s.address}>
              <p>{t("footer_contact")}</p>

              <address>
                <a
                  data-text="impulsetravel7@gmail.com"
                  href="mailto:impulsetravel7@gmail.com"
                >
                  impulsetravel7@gmail.com
                </a>

                <a data-text="+380 (95) 344 09 73" href="tel:380953440973">
                  +380 (95) 344 09 73
                </a>
              </address>
            </div>

            <div className={s.socialBlock}>
              <ul>
                <li>
                  <a href="">
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1730_84)">
                        <path d="M12.003 0H11.997C5.3805 0 0 5.382 0 12C0 14.625 0.846 17.058 2.2845 19.0335L0.789 23.4915L5.4015 22.017C7.299 23.274 9.5625 24 12.003 24C18.6195 24 24 18.6165 24 12C24 5.3835 18.6195 0 12.003 0ZM18.9855 16.9455C18.696 17.763 17.547 18.441 16.6305 18.639C16.0035 18.7725 15.1845 18.879 12.4275 17.736C8.901 16.275 6.63 12.6915 6.453 12.459C6.2835 12.2265 5.028 10.5615 5.028 8.8395C5.028 7.1175 5.9025 6.279 6.255 5.919C6.5445 5.6235 7.023 5.4885 7.482 5.4885C7.6305 5.4885 7.764 5.496 7.884 5.502C8.2365 5.517 8.4135 5.538 8.646 6.0945C8.9355 6.792 9.6405 8.514 9.7245 8.691C9.81 8.868 9.8955 9.108 9.7755 9.3405C9.663 9.5805 9.564 9.687 9.387 9.891C9.21 10.095 9.042 10.251 8.865 10.47C8.703 10.6605 8.52 10.8645 8.724 11.217C8.928 11.562 9.633 12.7125 10.671 13.6365C12.0105 14.829 13.0965 15.21 13.485 15.372C13.7745 15.492 14.1195 15.4635 14.331 15.2385C14.5995 14.949 14.931 14.469 15.2685 13.9965C15.5085 13.6575 15.8115 13.6155 16.1295 13.7355C16.4535 13.848 18.168 14.6955 18.5205 14.871C18.873 15.048 19.1055 15.132 19.191 15.2805C19.275 15.429 19.275 16.1265 18.9855 16.9455Z" />
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.9752 4.44141C18.654 4.44141 18.3926 4.70283 18.3926 5.02406C18.3926 5.3453 18.654 5.60672 18.9752 5.60672C19.2965 5.60672 19.5579 5.34534 19.5579 5.02406C19.5579 4.70278 19.2965 4.44141 18.9752 4.44141Z" />
                      <path d="M11.9975 6.83203C9.14925 6.83203 6.83203 9.14925 6.83203 11.9975C6.83203 14.8457 9.14925 17.163 11.9975 17.163C14.8457 17.163 17.163 14.8457 17.163 11.9975C17.163 9.1493 14.8457 6.83203 11.9975 6.83203Z" />
                      <path d="M17.4208 0H6.57923C2.95144 0 0 2.95144 0 6.57928V17.4208C0 21.0486 2.95144 24 6.57923 24H17.4208C21.0486 24 24 21.0486 24 17.4208V6.57928C24 2.95144 21.0486 0 17.4208 0ZM12 18.5828C8.37023 18.5828 5.4173 15.6298 5.4173 12C5.4173 8.37023 8.37028 5.41734 12 5.41734C15.6297 5.41734 18.5828 8.37028 18.5828 12C18.5828 15.6297 15.6297 18.5828 12 18.5828ZM18.9765 7.02356C17.8737 7.02356 16.9765 6.12637 16.9765 5.02359C16.9765 3.92081 17.8737 3.02358 18.9765 3.02358C20.0792 3.02358 20.9764 3.92077 20.9764 5.02355C20.9764 6.12633 20.0792 7.02356 18.9765 7.02356Z" />
                    </svg>
                  </a>
                </li>
              </ul>

              {!isMobile && (
                <div className={s.anchor} onClick={() => window.scrollTo(0, 0)}>
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M31.8498 23.0222L30.9071 23.9648L16.4711 9.52884C16.3444 9.40218 16.1778 9.33418 15.9991 9.33418C15.8204 9.33418 15.6538 9.40351 15.5271 9.52884L1.0911 23.9648L0.148437 23.0222L14.5844 8.58618C14.9618 8.20884 15.4644 8.00084 15.9991 8.00084C16.5338 8.00084 17.0351 8.20884 17.4138 8.58618L31.8498 23.0222Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <span className={s.bigText}>
          {isMobile ? (
            <img src="/images/footer-mob-big-text.svg" alt="impulse" />
          ) : (
            <img src="/images/footer-big-text.svg" alt="impulse sc tours" />
          )}
        </span>

        <div className={s.footerBottomLinks}>
          <p>©2025 Impulse. All rights Reserved</p>
          <Link to="">{t("footer_privacy")}</Link>
          <p>
            {t("footer_dev")} <a href="https://www.instagram.com/before_after.agency?igsh=MTVyMTIxaTE4ZmRobA==" target="_blank">{t("footer_dev_name")}</a>
          </p>
        </div>
      </Layout>
    </footer>
  );
};
