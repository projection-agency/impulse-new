import { Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage/MainPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { PopupConsultation } from "./components/PopupConsultation/PopupConsultation";
import { PopupOrder } from "./components/PopupOrder/PopupOrder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Loader/Loader";
import Aos from "aos";
import "aos/dist/aos.css";

export const API_URL = "https://www.impulse.projection-learn.website/";

const queryClient = new QueryClient();

import Lenis from "lenis";
import { TourType } from "./components/ActualToursSection/ActualToursSection";

const lenis = new Lenis({
  lerp: 0.05,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export const App = () => {
  const [consultPopup, setConsultPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false); // для анімації
  const [selectedTour, setSelectedTour] = useState<TourType | null>(null);

  useEffect(() => {
    Aos.init();

    document.fonts.ready.then(() => {
      setTimeout(() => {
        setFadeOutLoader(true);
        setTimeout(() => setLoading(false), 1000);
      }, 2500);
    });

    // Ініціалізуємо Lenis тільки на десктопі
    if (window.innerWidth >= 768) {
      const lenis = new Lenis({
        lerp: 0.05,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }, []);

  const handleToggleConsult = () => {
    setConsultPopup(!consultPopup);
    document.body.style.overflow = !consultPopup ? "hidden" : "";
  };

  const handleToggleOrder = (tour?: TourType) => {
    setOrderPopup(!orderPopup);
    setSelectedTour(tour ?? null);
    document.body.style.overflow = !orderPopup ? "hidden" : "";
  };

  return (
    <QueryClientProvider client={queryClient}>
      {loading && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-1000 bg-white ${
            fadeOutLoader ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Loader />
        </div>
      )}

      <div
        className={`transition-opacity duration-1000 ${
          fadeOutLoader ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header openConsult={handleToggleConsult} />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                openOrder={handleToggleOrder}
                openConsult={handleToggleConsult}
              />
            }
          />
        </Routes>
        <Footer />
        {consultPopup && <PopupConsultation onClose={handleToggleConsult} />}
        {orderPopup && (
          <PopupOrder initialTour={selectedTour} onClose={handleToggleOrder} />
        )}
      </div>
    </QueryClientProvider>
  );
};
