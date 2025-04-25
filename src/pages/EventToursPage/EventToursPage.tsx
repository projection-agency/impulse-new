import { FC } from "react";
import { ActualToursSection } from "../../components/ActualToursSection/ActualToursSection";

interface EventPageProps {
  openOrder: () => void;
}

export const EventToursPage: FC<EventPageProps> = ({ openOrder }) => {
  return (
    <main>
      <ActualToursSection openOrder={openOrder} />
    </main>
  );
};
