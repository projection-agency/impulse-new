import { DescSection } from "../../components/DescSection/DescSection";
import { ChroniclesSection } from "../../components/ChroniclesSection/ChroniclesSection";
import { Header } from "../../components/Header/Header";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { MissionSection } from "../../components/MissionSection/MissionSection";
import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";

export const MainPage = () => {
  return (
    <main>
      <Header />

      <HomeHero />

      <DescSection />

      <MissionSection />

      <ChroniclesSection />

      <ActualToursSection />
    </main>
  );
};
