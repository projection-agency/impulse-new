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
import { TourType } from "./components/ActualToursSection/ActualToursSection";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { MenuPopup } from "./components/MenuPopup/MenuPopup";
import { VideoPopup } from "./components/VideoPopup/VideoPopup";

export const API_URL = "https://www.impulse.projection-learn.website/";

const queryClient = new QueryClient();

export const App = () => {
  const [consultPopup, setConsultPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourType | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const [menuPopupIsOpen, setMenuPopupIsopen] = useState(false);

  useEffect(() => {
    Aos.init();

    setTimeout(() => {
      setFadeOutLoader(true);
      setLoading(false);
    }, 6000);

    if (window.innerWidth >= 1024) {
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

  const handleToggleMenuPopup = () => {
    setMenuPopupIsopen(!menuPopupIsOpen);
    document.body.style.overflow = !menuPopupIsOpen ? "hidden" : "";
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
        <Header
          toggleMenuPopup={handleToggleMenuPopup}
          openConsult={handleToggleConsult}
          menuIsOpen={menuPopupIsOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                loading={loading}
                openOrder={handleToggleOrder}
                openConsult={handleToggleConsult}
                openVideo={() => setVideoOpen(true)}
              />
            }
          />
        </Routes>
        <Footer />

        <AnimatePresence>
          {consultPopup && <PopupConsultation onClose={handleToggleConsult} />}
          {orderPopup && (
            <PopupOrder
              initialTour={selectedTour}
              onClose={handleToggleOrder}
            />
          )}
          {menuPopupIsOpen && <MenuPopup />}
        </AnimatePresence>
        <VideoPopup
          isOpen={videoOpen}
          onClose={() => {
            setVideoOpen(false);
            document.body.style.overflow = "";
          }}
          videoSrc="/temp/hero-video.mp4"
        />
      </div>
    </QueryClientProvider>
  );
};
