import { FC } from "react";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { MainPageProps } from "../MainPage/MainPage";
import { matchPath, useLocation } from "react-router";
import { TourType } from "../../components/ActualToursSection/ActualToursSection";
import { useGlobalProps } from "../../GlobalPropContext";
import { TourSwiperSection } from "../../components/TourSwiperSection/TourSwiperSection";
import { TourDaysSection } from "../../components/TourDaysSection/TourDaysSection";
import { GallerySection } from "../../components/GallerySection/GallerySection";
import { ServicesSection } from "../../components/ServicesSection/ServicesSection";
import { CarsSection } from "../../components/CarsSection/CarsSection";
import { FormSection } from "../../components/FormSection/FormSection";
import { FaqSection } from "../../components/FaqSection/FaqSection";
import { TourAccordionSection } from "../../components/TourAccordionSection/TourAccordionSection";

export const TourPage: FC<MainPageProps> = ({
  openOrder,
  openConsult,
  loading,
  openVideo,
}) => {
  const { tours } = useGlobalProps();
  const { pathname } = useLocation();
  const match = matchPath("/tour/:slug", pathname);
  const actualTour = tours.find(
    (item: TourType) => item.slug === match?.params.slug
  );

  return (
    <main>
      <HomeHero
        openVideo={openVideo}
        loading={loading}
        openOrder={openOrder}
        openConsult={openConsult}
        actualTour={actualTour}
      />

      <TourSwiperSection />

      {actualTour && <TourDaysSection info={actualTour} />}

      <GallerySection />

      <ServicesSection />

      <TourAccordionSection openOrder={openOrder} item={actualTour!} />

      <CarsSection />

      <FormSection />

      <FaqSection />
    </main>
  );
};
