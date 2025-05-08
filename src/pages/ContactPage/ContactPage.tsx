import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
                t("trip_full")
              ) : (
                <TextAnimation texts={[t("trip_title_1"), t("trip_title_2")]} />
              )}
            </h2>
          </div>
        </div>

        <div className={s.formBlock}>
          <div className={s.formContainer}>
            <h3>{t("contactFormTitle")}</h3>

            <form>
              <div className={s.inputsBlock}>
                <label>
                  {t("form_name_label")} <span>*</span>
                  <input type="text" placeholder={t("form_name_placeholder")} />
                </label>

                <label>
                  {t("form_instagram_label")} <span>*</span>
                  <input
                    type="text"
                    placeholder={t("form_instagram_placeholder")}
                  />
                </label>

                <label>
                  {t("form_phone_label")} <span>*</span>
                  <PhoneNumberInput />
                </label>

                <label>
                  {t("textarea_label")} <span>*</span>
                  <textarea placeholder={t("textarea_placeholder")}></textarea>
                </label>
              </div>

              <CustomCheckbox
                label={t("form_checkbox")}
                onChange={handleCheckboxChange}
              />

              <button className={s.submitBtn} type="submit">
                <span>{t("form_submit")}</span>

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
