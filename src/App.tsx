import { Route, Routes, useLocation } from "react-router";
import { PrivateToursPage } from "./pages/PrivateToursPage/PrivateToursPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useEffect, useRef, useState } from "react";
import { PopupConsultation } from "./components/PopupConsultation/PopupConsultation";
import { PopupOrder } from "./components/PopupOrder/PopupOrder";
import { useQuery } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { TourType } from "./components/ActualToursSection/ActualToursSection";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { MenuPopup } from "./components/MenuPopup/MenuPopup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { MainPage } from "./pages/MainPage/MainPage";
import { GlobalPropsContext } from "./GlobalPropContext";
import { TourPage } from "./pages/TourPage/TourPage";
import axios from "axios";
import { EventToursPage } from "./pages/EventToursPage/EventToursPage";
import { ContactPage } from "./pages/ContactPage/ContactPage";
import { BuisnessToursPage } from "./pages/BuisnessToursPage/BuisnessToursPage";
import { useWindowSize } from "./hooks/useWindowSize";

export const API_URL = "https://api.impulse-sportcars.com/";

const fetchGallery = async () => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/tour`);
  return data;
};

export const App = () => {
  const [consultPopup, setConsultPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourType | null>(null);

  const [menuPopupIsOpen, setMenuPopupIsopen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const { data = [] } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchGallery,
  });

  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    Aos.init();

    if (window.innerWidth >= 1024) {
      const lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const handleToggleConsult = () => {
    setConsultPopup((prev) => !prev);
    document.body.style.overflow = consultPopup ? "" : "hidden";
  };

  const handleToggleOrder = (tour?: TourType) => {
    setOrderPopup((prev) => !prev);
    setSelectedTour(tour ?? null);
    document.body.style.overflow = orderPopup ? "" : "hidden";
  };

  const handleToggleMenuPopup = () => {
    setMenuPopupIsopen((prev) => !prev);
    document.body.style.overflow = menuPopupIsOpen ? "" : "hidden";
  };

  const globalProps = {
    menuToggle: handleToggleMenuPopup,
    tours: data,
  };

  return (
    <GlobalPropsContext.Provider value={globalProps}>
      <div>
        <Header
          toggleMenuPopup={handleToggleMenuPopup}
          openConsult={handleToggleConsult}
          menuIsOpen={menuPopupIsOpen}
        />

        <Routes>
          <Route
            path="/private-tours"
            element={
              <PrivateToursPage
                openOrder={handleToggleOrder}
                openConsult={handleToggleConsult}
              />
            }
          />
          <Route
            path="/business-tours"
            element={
              <BuisnessToursPage
                openOrder={handleToggleOrder}
                openConsult={handleToggleConsult}
              />
            }
          />
          <Route
            path="/tour/:slug"
            element={
              <TourPage
                openOrder={handleToggleOrder}
                openConsult={handleToggleConsult}
              />
            }
          />

          <Route
            path="/actual-tours"
            element={<EventToursPage openOrder={handleToggleOrder} />}
          />

          <Route path="/contact" element={<ContactPage />} />

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
      </div>
    </GlobalPropsContext.Provider>
  );
};
