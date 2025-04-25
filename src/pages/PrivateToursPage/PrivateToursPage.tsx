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

export interface PageProps {
  openOrder: () => void;
  openConsult: () => void;
  loading: boolean;
  openVideo: () => void;
}

export const PrivateToursPage: FC<PageProps> = ({
  openOrder,
  openConsult,
  loading,
  openVideo,
}) => {
  return (
    <main>
      <HomeHero
        openVideo={openVideo}
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
