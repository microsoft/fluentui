import { IAddCardStyles } from './AddCard.types';
import { FontSizes } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (): IAddCardStyles => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '32px',
      cursor: 'move',
      selectors: {
        ':hover': {
          selectors: {
            i: {
              display: 'block'
            }
          }
        },
        ':not(:hover)': {
          selectors: {
            i: {
              display: 'none'
            }
          }
        },
        ':focus-within': {
          selectors: {
            i: {
              display: 'block'
            }
          }
        }
      }
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
      fontSize: FontSizes.small,
      lineHeight: '16px',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold'
    },
    bodyText: {
      fontSize: FontSizes.small,
      lineHeight: '16px'
    },
    iconWrapper: {
      width: '14px',
      height: '14px',
      marginRight: '13px'
    }
  };
};
