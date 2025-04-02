import axios from "axios";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";
import s from "./FaqSection.module.css";
import { API_URL } from "../../App";
import { useQuery } from "@tanstack/react-query";

interface faqItem {
  faq_question: string;
  faq_answer: string;
}

const fetchFaqs = async () => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/faq`);

  return data;
};

export const FaqSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const { data = [] } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  return (
    <section className={s.section}>
      <Layout>
        <div className={s.itemContainer}>
          <div></div>
          <h2>FAQ</h2>
          <div></div>
        </div>

        {!isMobile && (
          <ul>
            {data.map((question: faqItem, index: number) => (
              <li className={s.itemContainer} key={index}>
                <div className={s.questionNumber}>0{++index}</div>
                <div className={s.question}>{question.faq_question}</div>
                <div className={s.answer}>{question.faq_answer}</div>
              </li>
            ))}
          </ul>
        )}

        {isMobile && (
          <ul>
            {data.map((question: faqItem, index: number) => (
              <li className={s.itemContainer} key={index}>
                <div className={s.questionNumber}>0{++index}</div>
                <div>
                  <div className={s.question}>{question.faq_question}</div>
                  <div className={s.answer}>{question.faq_answer}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    </section>
  );
};
