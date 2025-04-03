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
  const [selectedTour, setSelectedTour] = useState<TourType | null>(null);

  useEffect(() => {
    Aos.init();

    document.fonts.ready.then(() => {
      setTimeout(() => setLoading(false), 3500); // затримка щоб не моргало
    });
  }, []);

  const handleToggleConsult = () => {
    setConsultPopup(!consultPopup);

    if (!consultPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleToggleOrder = (tour?: TourType) => {
    setOrderPopup(!orderPopup);

    setSelectedTour(tour ?? null);

    if (!orderPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              lenis={lenis}
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
    </QueryClientProvider>
  );
};
