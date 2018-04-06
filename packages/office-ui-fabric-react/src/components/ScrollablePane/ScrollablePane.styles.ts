import { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import {
  HighContrastSelector,
  IStyle
} from '../../Styling';

export const getStyles = (
  props: IScrollablePaneStyleProps
): IScrollablePaneStyles => {
  const { className } = props;

  const AboveAndBelowStyles: IStyle = {
    position: 'absolute',
    pointerEvents: 'auto',
    width: '100%',
    zIndex: 1,
    background: '#ffffff',
    overflowY: 'hidden',
    overflowX: 'auto'
  };

  const maxHeightStyles: IStyle = {
    height: 'inherit',
    maxHeight: 'inherit'
  }

  return ({
    root: [
      'ms-ScrollablePane',
      {
        WebkitOverflowScrolling: 'touch',
        position: 'relative'
      },
      maxHeightStyles,
      className
    ],
    contentContainer: [
      'ms-ScrollablePane--contentContainer',
      {
        overflowY: 'auto',
        position: 'relative',
        WebkitOverflowScrolling: 'touch'
      },
      maxHeightStyles
    ],
    stickyAbove: [
      {
        top: 0,
        selectors: {
          [HighContrastSelector]: {
            borderBottom: '1px solid WindowText'
          }
        }
      },
      AboveAndBelowStyles
    ],
    stickyBelow: [
      {
        bottom: 0,
        selectors: {
          [HighContrastSelector]: {
            borderTop: '1px solid WindowText'
          }
        }
      },
      AboveAndBelowStyles
    ],
    stickyBelowItems: [
      {
        bottom: 0
      },
      AboveAndBelowStyles
    ]
  });
};
