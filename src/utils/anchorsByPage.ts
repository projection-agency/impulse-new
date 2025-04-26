export const anchorsByPage: Record<string, { label: string; href: string }[]> =
  {
    "/": [
      { label: "Автопарк", href: "#cars" },
      { label: "Туры", href: "#tours" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Тарифы", href: "#tariffs" },
      { label: "Галерея", href: "#tour-memories" },
    ],
    "/private-tours": [
      { label: "Автопарк", href: "#cars" },
      { label: "Туры", href: "#tours" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Галерея", href: "#gallery" },
    ],
    "/business-tours": [
      { label: "Автопарк", href: "#cars" },
      { label: "Туры", href: "#tours" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Галерея", href: "#gallery" },
    ],
    "/actual-tours": [
      { label: "Автопарк", href: "/#cars" },
      { label: "Туры", href: "/#tours" },
      { label: "Отзывы", href: "/#reviews" },
      { label: "Галерея", href: "/#gallery" },
      { label: "Тарифы", href: "/#tariffs" },
    ],
    "/tour": [
      { label: "Описание тура", href: "#tour-description" },
      { label: "Программа", href: "#tour-program" },
      { label: "Галерея", href: "#tour-memories" },
      { label: "Цена", href: "#tour-price" },
      { label: "Автопарк", href: "#cars" },
    ],
    "/contact": [{ label: "Оставить заявку", href: "/#cars" }],
  };
