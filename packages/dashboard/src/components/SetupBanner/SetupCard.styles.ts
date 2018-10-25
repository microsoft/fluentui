import { ISetupCardStyles } from './SetupCard.types';

export const getStyles = (): ISetupCardStyles => {
  return {
    root: {
      fill: 'none'
    },
    title: {
      fill: 'black',
      fontFamily: 'Segoe UI Semibold',
      fontSize: '10px'
    }
  };
};
