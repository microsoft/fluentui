import { getGlobalClassNames, HighContrastSelector } from '../../Styling';
import { IExpandingCardStyles, IExpandingCardStyleProps } from './ExpandingCard.types';

const GlobalClassNames = {
  root: 'ms-ExpandingCard-root',
  compactCard: 'ms-ExpandingCard-compactCard',
  expandedCard: 'ms-ExpandingCard-expandedCard',
  expandedCardScroll: 'ms-ExpandingCard-expandedCardScrollRegion'
};

export function getStyles(props: IExpandingCardStyleProps): IExpandingCardStyles {
  const { theme, needsScroll, expandedCardFirstFrameRendered, compactCardHeight, expandedCardHeight, className } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        width: '340px',
        pointerEvents: 'none',
        selectors: {
          '.ms-Callout': {
            boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
            border: 'none',
            selectors: {
              [HighContrastSelector]: {
                border: '1px solid WindowText'
              }
            }
          }
        }
      },
      className
    ],
    compactCard: [
      classNames.compactCard,
      {
        pointerEvents: 'auto',
        position: 'relative',
        height: compactCardHeight
      }
    ],
    expandedCard: [
      classNames.expandedCard,
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
            left: '24px',
            width: '292px',
            height: '1px',
            backgroundColor: palette.neutralLighter
          }
        }
      },
      expandedCardFirstFrameRendered && {
        height: expandedCardHeight
      }
    ],
    expandedCardScroll: [
      classNames.expandedCardScroll,
      needsScroll && {
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }
    ]
  };
}
