import CustomCheckbox from "../../components/FormSection/CustomCheckbox";
import { PhoneNumberInput } from "../../components/FormSection/PhoneNumberInput";
import { TextAnimation } from "../../components/TextAnimation/TextAnimation";
import { useWindowSize } from "../../hooks/useWindowSize";
import s from "./ContactPage.module.css";

export const ContactPage = () => {
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Чекбокс:", checked);
  };

  const { width } = useWindowSize();

  const isMobile = width < 1024;

  return (
    <main>
      <section className={s.section}>
        <div className={s.imageBlock}>
          <img
            src={
              isMobile
                ? "/images/contact-bg-mobile.avif"
                : "/images/contact-bg.avif"
            }
            alt="three cars"
          />

          <div className={s.title}>
            <h2>
              {isMobile ? (
                "Ваше путешествие начинается здесь"
              ) : (
                <TextAnimation
                  texts={["Ваше путешествие", "начинается здесь"]}
                />
              )}
            </h2>
          </div>
        </div>

        <div className={s.formBlock}>
          <div className={s.formContainer}>
            <h3>
              Оставьте ваши контакты, и мы свяжемся с вами, чтобы обсудить все
              детали и ответить на любые вопросы
            </h3>

            <form>
              <div className={s.inputsBlock}>
                <label>
                  Имя <span>*</span>
                  <input type="text" placeholder="Введите свое имя" />
                </label>

                <label>
                  Instagram <span>*</span>
                  <input type="text" placeholder="Введите свой ник Instagram" />
                </label>

                <label>
                  Номер телефона<span>*</span>
                  <PhoneNumberInput />
                </label>

                <label>
                  Тема консультации<span>*</span>
                  <textarea placeholder="Опишите интересующий вопрос"></textarea>
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
                  <g clipPath="url(#clip0_1735_358)">
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
    </main>
  );
};
