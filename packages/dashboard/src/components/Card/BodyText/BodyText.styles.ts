import { IBodyTextStyles } from './BodyText.types';

export const getStyles = (): IBodyTextStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    subHeaderText: {
      fontFamily: 'Segoe UI',
      fontWeight: 'bold',
      lineHeight: '16px',
      fontSize: '12px',
      color: '#000000'
    },
    bodyText: {
      fontFamily: 'Segoe UI',
      lineHeight: '16px',
      fontSize: '12px',
      paddingTop: '8px',
      flexWrap: 'wrap',
      color: '#000000'
    }
  };
};
