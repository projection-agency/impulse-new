import s from "./FixedBar.module.css";

export const FixedBar = ({
  openConsult,
  openOrder,
}: {
  openConsult: () => void;
  openOrder: () => void;
}) => {
  return (
    <div className={s.bar}>
      <button onClick={openOrder}>
        <span>Заказать сейчас</span>
      </button>
      <button>
        <span onClick={openConsult}>задать вопрос</span>
      </button>
    </div>
  );
};
