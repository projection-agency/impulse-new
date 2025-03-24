import { DescSection } from "../../components/DescSection/DescSection";
import { ChroniclesSection } from "../../components/ChroniclesSection/ChroniclesSection";
import { Header } from "../../components/Header/Header";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { MissionSection } from "../../components/MissionSection/MissionSection";
import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";
import { ServicesSection } from "../../components/ServicesSection/ServicesSection";
import { CarsSection } from "../../components/CarsSection/CarsSection";
import { EssenceSection } from "../../components/EssenceSection/EssenceSection";
import { GallerySection } from "../../components/GallerySection/GallerySection";
import { ReviewSection } from "../../components/ReviewSection/ReviewSection";
import { FaqSection } from "../../components/FaqSection/FaqSection";

export const MainPage = () => {
  return (
    <main>
      <Header />

      <HomeHero />

      <DescSection />

      <MissionSection />

      <ChroniclesSection />

      <ActualToursSection />

      <ServicesSection />

      <CarsSection />

      <EssenceSection />

      <GallerySection />

      <ReviewSection />

      <FaqSection />
    </main>
  );
};
