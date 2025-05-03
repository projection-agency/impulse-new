import { Link } from "react-router";
import { Layout } from "../Layout/Layout";
import s from "./TariffSection.module.css";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";

const svg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1905_3648)">
      <path
        d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
        fill="white"
      />
      <path
        d="M10 11.667C5.85977 11.6716 2.50461 15.0268 2.5 19.167C2.5 19.6272 2.87309 20.0003 3.33332 20.0003H16.6666C17.1269 20.0003 17.5 19.6272 17.5 19.167C17.4954 15.0268 14.1402 11.6716 10 11.667Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1905_3648">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const arrow = (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2505_289)">
      <path
        d="M2.89999 0V2.39999H8.29999L0.5 10.2L2.29999 12L10.1 4.19997V9.59998H12.5V0H2.89999Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_2505_289">
        <rect width="12" height="12" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const TariffSection = () => {
  return (
    <section id="tariffs" className={s.section}>
      <Layout className={s.layout}>
        <div className={s.titleContainer}>
          <h2>
            <AnimatedHeading text="Тарифы" />
          </h2>

          <p data-aos="fade-up">
            Индивидуальные туры лучшее решение, где вы сами выбираете даты
            путешествий на спорткарах для своих важных событий
          </p>
        </div>

        <ul className={s.list}>
          <li data-aos="fade-up">
            <div className={s.infoBlock}>
              <div>
                <div className={s.memberQty}>{svg} Любое кол-во участников</div>

                <h4>Туры для бизнеса</h4>
              </div>

              <div className={s.bottomFlex}>
                <p>Для тимбилдингов и бизнес встреч с партнерами</p>

                <Link to="/business-tours">
                  <span>подробнее</span> {arrow}
                </Link>
              </div>
            </div>
          </li>
          <li data-aos="fade-up">
            <div className={s.infoBlock}>
              <div>
                <div className={s.memberQty}>{svg} Любое кол-во участников</div>

                <h4>приватные туры</h4>
              </div>

              <div className={s.bottomFlex}>
                <p>Для пар, друзей и важных событий</p>

                <Link to="/private-tours">
                  <span>подробнее</span> {arrow}
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </Layout>
    </section>
  );
};
