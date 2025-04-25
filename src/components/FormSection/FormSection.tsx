import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "./CustomCheckbox";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { useWindowSize } from "../../hooks/useWindowSize";
import s from "./FormSection.module.css";
import { TextAnimation } from "../TextAnimation/TextAnimation";
import { useGlobalProps } from "../../GlobalPropContext";
import { TourType } from "../ActualToursSection/ActualToursSection";

gsap.registerPlugin(ScrollTrigger);

export const FormSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  const { tours } = useGlobalProps();

  const options = tours
    .map((item: TourType) => item.title.rendered)
    .map((item: string) => ({
      value: item,
      label: item,
    }));

  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const handleSelectChange = (value: string) => {
    console.log("Вибрано:", value);
  };
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Чекбокс:", checked);
  };

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !pinWrapperRef.current ||
      !imageRef.current ||
      !formRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinWrapperRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      tl.to(titleRef.current, {
        transform: "translateX(-160%) translateY(-50%)",
      });

      tl.to(imageRef.current, {
        clipPath: "inset(0% 50% 0% 0%)",
        ease: "power2.out",
        immediateRender: false, // 👈
      }).to(
        formRef.current,
        {
          opacity: 1,
          pointerEvents: "auto",
          ease: "power2.out",
          immediateRender: false, // 👈
        },
        "<"
      );

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 7000);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {isMobile ? (
        <section className={s.section}>
          <div className={s.imageBlock}>
            <img src="/images/form-mountains-road.avif" alt="mountains road" />
            <div className={s.title}>
              <span className="mb-[4vw] block" data-aos="fade-up">
                Ну что
              </span>
              <h2>
                <TextAnimation texts={["Готовы начать", "путешествие?"]} />
              </h2>
            </div>
          </div>

          <div className={`${s.formBlock} ${s.mobile}`}>
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
                  <span>оставить заявку</span>
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
      ) : (
        <div className={s.outer}>
          <section className={s.section} ref={sectionRef}>
            <div ref={pinWrapperRef} className={s.pinWrapper}>
              <div className={s.imageBlock} ref={imageRef}>
                <img
                  src="/images/form-mountains-road.avif"
                  alt="mountains road"
                />
                <div ref={titleRef} className={s.title}>
                  <span className={s.span} data-aos="fade-up">
                    Ну что
                  </span>
                  <h2>
                    {/* <AnimatedHeading text="Готовы начать путешествие?" /> */}
                    <TextAnimation texts={["Готовы начать", "путешествие?"]} />
                  </h2>
                </div>
              </div>

              <div className={s.formBlock} ref={formRef}>
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
                        Интересующий тур <span>*</span>
                        <CustomSelect
                          options={options}
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
                      <span>оставить заявку</span>
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
            </div>
          </section>
        </div>
      )}
    </>
  );
};
