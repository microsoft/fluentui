import { IStyle, keyframes } from 'office-ui-fabric-react/lib/Styling';

export interface ICardStyles {
  root: IStyle;
  fadeIn: IStyle;
}

const fadeIn: string = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

// time for which the card fade in animation is shown, after adding a card to layout from add card panel
const fadeInAnimation = {
  animationName: fadeIn,
  animationDuration: '1.35s'
};

export const getCardStyles = (): ICardStyles => {
  return {
    root: {
      height: 'calc(100vh - 100px)'
    },
    fadeIn: [fadeInAnimation]
  };
};
