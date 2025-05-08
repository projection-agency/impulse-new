import { useTranslation } from "react-i18next";

type Anchor = { label: string; href: string; isConsult?: boolean };
type AnchorsByPage = {
  [key: string]: Anchor[];
};

export const useAnchorsByPage = (): AnchorsByPage => {
  const { t } = useTranslation();

  return {
    "/": [
      { label: t("Автопарк"), href: "#cars" },
      { label: t("Галерея"), href: "#tour-memories" },
      { label: t("Тарифы"), href: "#tariffs" },
      { label: t("Туры"), href: "#tours" },
      { label: t("Отзывы"), href: "#reviews" },
    ],
    "/private-tours": [
      { label: t("Автопарк"), href: "#cars" },
      { label: t("Туры"), href: "#tours" },
      { label: t("Отзывы"), href: "#reviews" },
      { label: t("Галерея"), href: "#gallery" },
    ],
    "/business-tours": [
      { label: t("Автопарк"), href: "#cars" },
      { label: t("Туры"), href: "#tours" },
      { label: t("Отзывы"), href: "#reviews" },
      { label: t("Галерея"), href: "#gallery" },
    ],
    "/actual-tours": [
      { label: t("Автопарк"), href: "/#cars" },
      { label: t("Туры"), href: "/#tours" },
      { label: t("Отзывы"), href: "/#reviews" },
      { label: t("Галерея"), href: "/#gallery" },
      { label: t("Тарифы"), href: "/#tariffs" },
    ],
    "/tour": [
      { label: t("Описание тура"), href: "#tour-description" },
      { label: t("Программа"), href: "#tour-program" },
      { label: t("Галерея"), href: "#tour-memories" },
      { label: t("Цена"), href: "#tour-price" },
      { label: t("Автопарк"), href: "#cars" },
    ],
    "/contact": [{ label: t("Оставить заявку"), href: "/#cars" }],
  };
};
