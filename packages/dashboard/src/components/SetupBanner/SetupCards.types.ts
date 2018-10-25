import { ISetupCardProps } from './SetupCard.types';

export interface ISetupCardsProps {
  cardData: ISetupCardProps[];
  cardWidth: number;
  cardHeight: number;
  cardsHeight: number;
  cardHorizontalSpacing: number;
  cardDualVerticalSpacing: number;
  cardAnimationDelay: number;
  cardVerticalOffset: number;
  cardHoritonztalOffset: number;
}
