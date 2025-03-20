import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";
import { ChroniclesSection } from "../../components/ChroniclesSection/ChroniclesSection";
import { Header } from "../../components/Header/Header";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { MissionSection } from "../../components/MissionSection/MissionSection";

export const MainPage = () => {
  return (
    <main>
      <Header />

      <HomeHero />

      <ActualToursSection />

      <MissionSection />

      <ChroniclesSection />
    </main>
  );
};
