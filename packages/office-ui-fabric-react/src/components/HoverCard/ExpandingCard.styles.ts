import { IExpandingCardStyles } from './ExpandingCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets,
  ITheme
} from '../../Styling';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IExpandingCardStyles
): IExpandingCardStyles => {

  const styles: IExpandingCardStyles = {
    root: {
      width: '340px',
      pointerEvents: 'none',
      selectors: {
        '& .ms-Callout': {
          boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
          border: 'none'
        }
      }
    },
    compactCard: {
      pointerEvents: 'auto',
      position: 'relative'
    },
    expandedCard: [
      {
        height: '1px',
        overflowY: 'hidden',
        pointerEvents: 'auto',
        transition: 'height 0.467s cubic-bezier(0.5, 0, 0, 1)',
        selectors: {
          ':before': {
            content: '""',
            position: 'relative',
            display: 'block',
            top: '0',
            left: '0',
            right: '0',
            height: '1px',
            backgroundColor: theme.palette.neutralLighter
          }
        }
      }
    ],
    expandedCardScroll: {
      height: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }
  };

  return mergeStyleSets(styles, customStyles)!;
});