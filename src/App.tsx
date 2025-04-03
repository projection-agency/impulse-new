import { Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage/MainPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { PopupConsultation } from "./components/PopupConsultation/PopupConsultation";
import { PopupOrder } from "./components/PopupOrder/PopupOrder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Loader/Loader";

export const API_URL = "https://www.impulse.projection-learn.website/";

const queryClient = new QueryClient();

export const App = () => {
  const [consultPopup, setConsultPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setTimeout(() => setLoading(false), 3500); // затримка щоб не моргало
    });
  }, []);

  const handleToggleConsult = () => {
    setConsultPopup(!consultPopup);
  };

  const handleToggleOrder = () => {
    setOrderPopup(!orderPopup);
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
              openOrder={handleToggleOrder}
              openConsult={handleToggleConsult}
            />
          }
        />
      </Routes>

      <Footer />

      {consultPopup && <PopupConsultation onClose={handleToggleConsult} />}
      {orderPopup && <PopupOrder onClose={handleToggleOrder} />}
    </QueryClientProvider>
  );
};
