import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // для підвантаження перекладів
  .use(initReactI18next) // інтеграція з React
  .init({
    fallbackLng: "ru", // мова за замовченням
    supportedLngs: ["ru", "en"],
    debug: false, // true → якщо хочеш бачити в консолі помилки перекладу
    interpolation: {
      escapeValue: false, // React і так екранує
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // де лежать файли
    },
  });

export default i18n;
