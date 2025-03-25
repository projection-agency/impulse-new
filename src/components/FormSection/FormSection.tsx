import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "./CustomCheckbox";
import s from "./FormSection.module.css";
import { PhoneNumberInput } from "./PhoneNumberInput";

export const FormSection = () => {
  const handleSelectChange = (value: string) => {
    console.log("Вибрано:", value);
  };
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Чекбокс:", checked);
  };

  return (
    <section className={s.section}>
      <div className={s.imageBlock}>
        <img src="/images/form-mountains-road.avif" alt="mountains road" />

        <div className={s.title}>
          <span>Ну что</span>

          <h2>Готовы начать путешествие?</h2>
        </div>
      </div>

      <div className={s.formBlock}>
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
                <input type="text" placeholder="Введите свой ник Instagram" />
              </label>

              <label>
                Номер телефона<span>*</span>
                <PhoneNumberInput />
              </label>

              <label>
                Интересующий тур <span>*</span>
                <CustomSelect
                  options={[
                    { value: "ua", label: "Lamborghini 2.0" },
                    { value: "us", label: "Multibrand Tour" },
                  ]}
                  placeholder="Выберите актуальный тур"
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
  );
};
