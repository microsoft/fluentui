import { IBodyTextStyles } from './BodyText.types';

export const getStyles = (): IBodyTextStyles => {
  return {
    root: {
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      lineHeight: '16px',
      fontSize: '12px',
      color: '#000000'
    },
    bodyText: {
      fontFamily: 'Segoe UI',
      lineHeight: '14px',
      fontSize: '12px',
      color: '#000000',
      opacity: 0.6
    }
  };
};
