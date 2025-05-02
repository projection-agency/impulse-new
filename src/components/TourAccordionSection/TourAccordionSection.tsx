import AccordionGroup from "../Accordion/Accordion";
import { TourType } from "../ActualToursSection/ActualToursSection";
import { Layout } from "../Layout/Layout";
import s from "./TourAccordionSection.module.css";

export const TourAccordionSection = ({
  item,
  openOrder,
}: {
  item: TourType;
  openOrder: (tour?: TourType) => void;
}) => {
  if (!item) return null;

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

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  const shortTourInfo = {
    title: item.title.rendered, // "LAMBORGHINI, FERRARI..." → "LAMBORGHINI"
    location: "Германия, Италия", // можеш витягувати з input_route якщо треба динамічно
    date: `${formatDate(item.input_date_start)} – ${formatDate(
      item.input_date_end
    ).slice(5)}`,
  };

  const arrow = (
    <svg
      className={s.arrow}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.6" clipPath="url(#clip0_1367_719)">
        <path
          d="M7.39999 17V14.6H12.8L5 6.79999L6.79999 5L14.6 12.8V7.40002H17V17H7.39999Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1367_719">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="matrix(1 0 0 -1 5 17)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <section id="tour-price" className={s.section}>
      <Layout className={s.container}>
        <div
          data-aos="fade-up"
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

        <div className={s.mainitem}>
          <div className={s.touritem}>
            <h3 data-aos="fade-up">{shortTourInfo.title}</h3>

            <div data-aos="fade-up" className={s.shortInfo}>
              <p>{shortTourInfo.location}</p>

              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" clipPath="url(#clip0_1960_2488)">
                  <path d="M6.66667 10H5C4.08083 10 3.33333 10.7475 3.33333 11.6667V13.3333C3.33333 14.2525 4.08083 15 5 15H6.66667C7.58583 15 8.33333 14.2525 8.33333 13.3333V11.6667C8.33333 10.7475 7.58583 10 6.66667 10ZM5 13.3333V11.6667H6.66667V13.3333H5ZM15.8333 1.66667H15V0.833333C15 0.373333 14.6275 0 14.1667 0C13.7058 0 13.3333 0.373333 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.373333 6.29417 0 5.83333 0C5.3725 0 5 0.373333 5 0.833333V1.66667H4.16667C1.86917 1.66667 0 3.53583 0 5.83333V15.8333C0 18.1308 1.86917 20 4.16667 20H15.8333C18.1308 20 20 18.1308 20 15.8333V5.83333C20 3.53583 18.1308 1.66667 15.8333 1.66667ZM4.16667 3.33333H15.8333C17.2117 3.33333 18.3333 4.455 18.3333 5.83333V6.66667H1.66667V5.83333C1.66667 4.455 2.78833 3.33333 4.16667 3.33333ZM15.8333 18.3333H4.16667C2.78833 18.3333 1.66667 17.2117 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 17.2117 17.2117 18.3333 15.8333 18.3333Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1960_2488">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>{shortTourInfo.date}</span>
            </div>

            <div
              className={s.a}
              onClick={() => openOrder(item)}
              data-aos="fade-up"
            >
              Забронировать
              <svg
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1398_14919)">
                  <path
                    d="M2.39999 0V2.39999H7.79999L0 10.2L1.79999 12L9.60001 4.19997V9.59998H12V0H2.39999Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1398_14919">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div data-aos="fade-up" className={s.accordionContainer}>
            <AccordionGroup
              items={[
                {
                  title: "Включено в стоимость",
                  content: (
                    <ul>
                      {item.price_include.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ),
                },

                {
                  title: "Не включено в стоимость",
                  content: (
                    <ul>
                      {item.price_uninclude.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  ),
                },

                {
                  title: "стоимость тура",
                  content: (
                    <div className={s.accordion}>
                      <div className={s.priceAcardon}>
                        <div>
                          <h4>1. {item.coast_title_1}</h4>
                          <ul>
                            <p>- Шеринг спорткара между двумя участниками</p>
                            <p>- Проживание в отеле в двухместном номере</p>
                          </ul>

                          {item.coast_content_11 && (
                            <div className={s.priceBlock}>
                              {arrow}
                              <p>{item.coast_content_11}</p>
                            </div>
                          )}

                          <p className="lg:mb-[0.8vw]  mb-[2.1vw]">
                            Специальная цена при бронировании двух мест сразу
                            (для друзей или пар):
                          </p>

                          {item.coast_content_12 && (
                            <div className={s.priceBlock}>
                              {arrow}
                              <p>{item.coast_content_12}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <h4>2. {item.coast_title_2}</h4>
                          <ul>
                            <p>- Шеринг спорткара между двумя участниками</p>
                            <p>- Проживание в отеле в двухместном номере</p>
                          </ul>

                          {item.coast_content_21 && (
                            <div className={s.priceBlock}>
                              {arrow}
                              <p>{item.coast_content_21}</p>
                            </div>
                          )}

                          {item.coast_content_22 && (
                            <>
                              <p className="lg:mb-[0.8vw] mb-[2.1vw]">
                                Специальная цена при бронировании двух мест
                                сразу (для друзей или пар):
                              </p>

                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{item.coast_content_22}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <p className={s.coastBooking}>* {item.coast_booking}</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Layout>
    </section>
  );
};
