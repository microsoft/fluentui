import { IBodyTextStyles } from './BodyText.types';

export const getStyles = (): IBodyTextStyles => {
  return {
    root: {
      fontFamily: '"Segoe UI Regular WestEuropean","Segoe UI","Segoe WP",Tahoma,Arial,sans-serif',
      fontWeight: 'bold',
      lineHeight: '16px',
      fontSize: '12px',
      color: '#000000'
    },
    bodyText: {
      fontFamily: '"Segoe UI Regular WestEuropean","Segoe UI","Segoe WP",Tahoma,Arial,sans-serif',
      lineHeight: '14px',
      fontSize: '12px',
      color: '#000000',
      opacity: 0.6
    }
  };
};
