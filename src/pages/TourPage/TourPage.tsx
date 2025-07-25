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

export const TourPage: FC<MainPageProps> = ({ openOrder, openConsult }) => {
  const { tours } = useGlobalProps();
  const { pathname } = useLocation();
  const match = matchPath("/tour/:slug", pathname);
  const actualTour = tours.find(
    (item: TourType) => item.slug === match?.params.slug
  );

  return (
    <main>
      <HomeHero
        openOrder={openOrder}
        openConsult={openConsult}
        actualTour={actualTour}
      />

      {actualTour && <TourSwiperSection actualTour={actualTour} />}

      {actualTour && <TourDaysSection info={actualTour} />}

      <GallerySection />

      <ServicesSection type="custom" data={actualTour} />

      <TourAccordionSection openOrder={openOrder} item={actualTour!} />

      <CarsSection tourCars={actualTour} />

      <FormSection />

      <FaqSection />
    </main>
  );
};
