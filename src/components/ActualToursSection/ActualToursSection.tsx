import { Layout } from "../Layout/Layout";
import s from "./ActualToursSection.module.css";

const tourItems = [
  {
    title: "Lamborghini 2.0",
    date: "01 – 05.06",
    route: "germany – italy",
    location: "Италия",
    image: "/temp/tour-item/1.jpg",
    price: "6 250€",
  },

  {
    title: "Multibrandtour",
    date: "25 – 29.06",
    route: "germany – Austria – switzerland – italy",
    location: "Италия",
    image: "/temp/tour-item/2.jpg",
    price: "5 500€",
  },
];

export const ActualToursSection = () => {
  return (
    <section className={s.section}>
      <Layout>
        <h2>
          Актуальные
          <br /> event-туры
        </h2>

        <div className={s.list}>
          {tourItems.map((item, index) => (
            <div className={s.item} key={index}>
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
                      <span> {item.location}</span>

                      <span>
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.6" clip-path="url(#clip0_1340_1948)">
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

                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className={s.priceBlock}>
                    <svg
                      width="42"
                      height="20"
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
                    / <span>от</span> {item.price}
                  </div>
                </div>
              </div>

              <div className={s.btnContainer}>
                <div>Забронировать</div>
                <div>Детальнее</div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </section>
  );
};
