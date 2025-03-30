import { useEffect, useState } from "react";
import s from "./FixedBar.module.css";

export const FixedBar = ({
  openConsult,
  openOrder,
}: {
  openConsult: () => void;
  openOrder: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
        <span>Заказать сейчас</span>
      </button>
      <button>
        <span onClick={openConsult}>задать вопрос</span>
      </button>
    </div>
  );
};
