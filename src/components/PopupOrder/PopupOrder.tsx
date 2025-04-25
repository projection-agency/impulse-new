import { motion } from "framer-motion";
import s from "./PopupOrder.module.css";
import { PhoneNumberInput } from "../FormSection/PhoneNumberInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "../FormSection/CustomCheckbox";
import { TourType } from "../ActualToursSection/ActualToursSection";

import { TextAnimation } from "../TextAnimation/TextAnimation";
import { useGlobalProps } from "../../GlobalPropContext";

export const PopupOrder = ({
  onClose,
  initialTour,
}: {
  onClose: () => void;
  initialTour?: TourType | null;
}) => {
  const handleSelectChange = (value: string) => {
    console.log("Вибрано:", value);
  };
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Чекбокс:", checked);
  };

  const { tours } = useGlobalProps();

  const options = tours
    .map((item: TourType) => item.title.rendered)
    .map((item: string) => ({
      value: item,
      label: item,
    }));

  return (
    <motion.div
      data-lenis-prevent
      className={s.popupOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={s.popupContent}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <section className={s.section}>
          <div className={s.imageBlock}>
            <img src="/images/form-mountains-road.avif" alt="three cars" />

            <div className={s.title}>
              <span className="block lg:mb-[0.7vw]" data-aos="fade-up">
                Ну что
              </span>

              <h2>
                <TextAnimation texts={["Готовы начать", " путешествие?"]} />
              </h2>
            </div>
          </div>

          <div className={s.formBlock}>
            <button onClick={onClose} className={s.closeBtn}>
              <svg
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39 39L13 13M39 13L13 39"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={s.formContainer}>
              <h3>
                Заполните контактную форму и наш менеджер свяжется с вами в
                ближайшее время
              </h3>

              <form>
                <div className={s.inputsBlock}>
                  <label>
                    Имя <span>*</span>
                    <input type="text" placeholder="Введите свое имя" />
                  </label>

                  <label>
                    Instagram <span>*</span>
                    <input
                      type="text"
                      placeholder="Введите свой ник Instagram"
                    />
                  </label>

                  <label>
                    Номер телефона<span>*</span>
                    <PhoneNumberInput />
                  </label>

                  <label>
                    Тема консультации
                    <CustomSelect
                      options={options}
                      placeholder={
                        initialTour?.title?.rendered ||
                        "Выберите актуальный тур"
                      }
                      onChange={handleSelectChange}
                    />
                  </label>
                </div>

                <CustomCheckbox
                  label="Я соглашаюсь с Политикой конфиденциальности"
                  onChange={handleCheckboxChange}
                />

                <button className={s.submitBtn} type="submit">
                  оставить заявку
                  <svg
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1735_358)">
                      <path d="M2.89999 0V2.39999H8.29999L0.5 10.2L2.29999 12L10.1 4.19997V9.59998H12.5V0H2.89999Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1735_358">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};
