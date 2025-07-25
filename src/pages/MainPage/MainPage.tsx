import { HomeHero } from "../../components/HomeHero/HomeHero";
import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";
import { CarsSection } from "../../components/CarsSection/CarsSection";
import { EssenceSection } from "../../components/EssenceSection/EssenceSection";
import { GallerySection } from "../../components/GallerySection/GallerySection";
import { ReviewSection } from "../../components/ReviewSection/ReviewSection";
import { FC } from "react";
import { DescMainSection } from "../../components/DescMainSection/DescMainSection";
import { TariffSection } from "../../components/TariffSection/TariffSection";

export interface MainPageProps {
  openOrder: () => void;
  openConsult: () => void;
  loading?: boolean;
}

export const MainPage: FC<MainPageProps> = ({ openOrder, openConsult }) => {
  return (
    <main>
      <HomeHero openOrder={openOrder} openConsult={openConsult} />

      <DescMainSection />

      <CarsSection />

      <GallerySection />

      <TariffSection />

      <ActualToursSection openOrder={openOrder} />

      <ReviewSection />

      <EssenceSection />
    </main>
  );
};
