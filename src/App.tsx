import { Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage/MainPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { FixedBar } from "./components/FixedBar/FixedBar";
import { useState } from "react";
import { PopupConsultation } from "./components/PopupConsultation/PopupConsultation";
import { PopupOrder } from "./components/PopupOrder/PopupOrder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient();

function App() {
  const [consultPopup, setConsultPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);

  const handleToggleConsult = () => {
    setConsultPopup(!consultPopup);
  };
  const handleToggleOrder = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <FixedBar
        openOrder={handleToggleOrder}
        openConsult={handleToggleConsult}
      />

      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>

      <Footer />

      {consultPopup && <PopupConsultation onClose={handleToggleConsult} />}
      {orderPopup && <PopupOrder onClose={handleToggleOrder} />}
    </QueryClientProvider>
  );
}

export default App;
