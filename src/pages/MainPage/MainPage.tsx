import { DescSection } from "../../components/DescSection/DescSection";
import { ChroniclesSection } from "../../components/ChroniclesSection/ChroniclesSection";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { MissionSection } from "../../components/MissionSection/MissionSection";
import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";
import { ServicesSection } from "../../components/ServicesSection/ServicesSection";
import { CarsSection } from "../../components/CarsSection/CarsSection";
import { EssenceSection } from "../../components/EssenceSection/EssenceSection";
import { GallerySection } from "../../components/GallerySection/GallerySection";
import { ReviewSection } from "../../components/ReviewSection/ReviewSection";
import { FaqSection } from "../../components/FaqSection/FaqSection";
import { FormSection } from "../../components/FormSection/FormSection";
import { FC } from "react";

interface MainPageProps {
  openOrder: () => void;
  openConsult: () => void;
  loading: boolean;
}

export const MainPage: FC<MainPageProps> = ({
  openOrder,
  openConsult,
  loading,
}) => {
  return (
    <main>
      <HomeHero
        loading={loading}
        openOrder={openOrder}
        openConsult={openConsult}
      />

      <DescSection />

      <MissionSection />

      <ChroniclesSection />

      <ActualToursSection openOrder={openOrder} />

      <ServicesSection />

      <CarsSection />

      <EssenceSection />

      <GallerySection />

      <ReviewSection />

      <FormSection />

      <FaqSection />
    </main>
  );
};
