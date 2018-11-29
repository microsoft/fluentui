import { IAddCardStyles } from './AddCard.types';

export const getStyles = (): IAddCardStyles => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '32px'
    },
    imageWrapper: {
      width: '150px',
      height: '100px',
      overflow: 'hidden',
      boxShadow: '0 .6px 1.8px rgba(0,0,0,.18), 0 3.2px 7.2px rgba(0,0,0,.22)'
    },
    textContainer: {
      marginLeft: '32px',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
      overflow: 'hidden'
    },
    header: {
      marginBottom: '8px',
      fontSize: '12px',
      lineHeight: '16px',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold'
    },
    bodyText: {
      fontSize: '12px',
      lineHeight: '16px'
    },
    icon: {
      // do not remove even though empty. Used for styling add card plus button in panel
      // look in AddCard.tsx file for it's usage
    },
    iconWrapper: {
      width: '14px',
      height: '14px',
      marginRight: '13px'
    }
  };
};
