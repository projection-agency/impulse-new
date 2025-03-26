import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import s from "./Accordion.module.css"; // Замініть на ваш шлях до стилів

const Accordion = ({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`${s.accordion} ${isOpen ? s.opened : s.disabled}`}>
      <div className={s.header} onClick={onClick}>
        <span>{title}</span>
        <motion.svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <path
              d="M5.27344 18H30.7293"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M18.0025 30.7279L18.0025 5.27208M30.7305 18L5.27463 18"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          )}
        </motion.svg>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
        className={`${s.content} ${isOpen && s.active}`}
      >
        <div style={{ overflow: "hidden" }}>{children}</div>
      </motion.div>
    </div>
  );
};

const AccordionGroup = ({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => (
        <Accordion
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionGroup;
