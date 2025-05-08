import { useEffect, useState } from "react";
import s from "./FixedBar.module.css";
import { useTranslation } from "react-i18next";

export const FixedBar = ({
  openConsult,
  openOrder,
}: {
  openConsult: () => void;
  openOrder: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${s.bar} ${isVisible ? s.visible : ""}`}>
      <button onClick={openOrder}>
        <span>{t("order_now")}</span>
      </button>
      <button onClick={openConsult}>
        <span>{t("ask_question")}</span>
      </button>
    </div>
  );
};
