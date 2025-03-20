import { Layout } from "../Layout/Layout";
import { SiteButton } from "../SiteButton/SiteButton";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import s from "./ActualToursSection.module.css";

export const ActualToursSection = () => {
  return (
    <section className={s.section}>
      <Layout>
        <div className="flex justify-between">
          <div className="w-[30.4vw]">
            <img src="/images/actual-tours/lambos.avif" alt="Lamborghini" />
          </div>

          <div className="flex gap-[1.2vw]">
            <div className="w-[20.3vw]">
              <img src="/images/actual-tours/drone.avif" alt="Drone" />
            </div>

            <div className="w-[14.1vw]">
              <img src="/images/actual-tours/plate.avif" alt="Plate" />
            </div>
          </div>
        </div>

        <div className={s.infoBlock}>
          <SiteLogo fill="black" />

          <h2>
            Погрузитесь в путешествие <br /> <span>с самыми близкими, </span>{" "}
            где всё создано по вашему личному сценарию
          </h2>

          <div className={s.aside}>
            <p>
              Наши приватные туры дают возможность сменить обстановку, оставить
              позади рутину и насладиться каждым километром лучших европейских
              дорог за рулём роскошного спорткара — с вашей второй половинкой
              или в компании друзей.
            </p>

            <SiteButton />
          </div>
        </div>

        <div className="flex gap-[18vw] ml-[14.5vw]">
          <div className="flex gap-[1.2vw]">
            <div>
              <img src="/images/actual-tours/home.avif" alt="Home" />
            </div>
            <div>
              <img src="/images/actual-tours/bed.avif" alt="Bed" />
            </div>
          </div>

          <div>
            <img src="/images/actual-tours/mountain.avif" alt="Bed" />
          </div>
        </div>
      </Layout>
    </section>
  );
};
