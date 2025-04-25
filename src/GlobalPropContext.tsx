import { createContext, useContext } from "react";
import { TourType } from "./components/ActualToursSection/ActualToursSection";

interface GlobalProps {
  menuToggle: () => void;
  tours: TourType[];
}

export const GlobalPropsContext = createContext<GlobalProps | null>(null);

export const useGlobalProps = () => {
  const context = useContext(GlobalPropsContext);
  if (!context) {
    throw new Error("useGlobalProps must be used within GlobalPropsProvider");
  }
  return context;
};
