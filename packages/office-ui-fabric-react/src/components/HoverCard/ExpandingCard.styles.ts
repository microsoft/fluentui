import { IExpandingCardStyles } from './ExpandingCard.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyleSets,
  before,
  ITheme
} from '../../Styling';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IExpandingCardStyles
): IExpandingCardStyles => {

  const styles: IExpandingCardStyles = {
    root: {
      width: '340px',
      'pointer-events': 'none',
      '.ms-Callout': {
        'box-shadow': '0 0 20px rgba(0, 0, 0, .2)',
        border: 'none'
      }
    },
    compactCard: {
      'pointer-events': 'auto',
      position: 'relative'
    },
    expandedCard: [
      {
        height: '1px',
        'overflow-y': 'hidden',
        'pointer-events': 'auto',
        transition: 'height 0.467s cubic-bezier(0.5, 0, 0, 1)'
      },
      before({
        content: '""',
        position: 'relative',
        display: 'block',
        top: '0',
        left: '24px',
        width: '292px',
        height: '1px',
        'background-color': theme.palette.neutralLighter
      })
    ],
    expandedCardScroll: {
      height: '100%',
      'box-sizing': 'border-box',
      'overflow-y': 'auto'
    }
  };

  return mergeStyleSets(styles, customStyles)!;
});