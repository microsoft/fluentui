import { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import {
  HighContrastSelector,
  IStyle,
  ZIndexes,
  getGlobalClassNames,
} from '../../Styling';

const GlobalClassNames = {
  root: 'ms-ScrollablePane',
  contentContainer: 'ms-ScrollablePane--contentContainer'
};

export const getStyles = (
  props: IScrollablePaneStyleProps
): IScrollablePaneStyles => {
  const {
    className,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const AboveAndBelowStyles: IStyle = {
    position: 'absolute',
    pointerEvents: 'auto',
    width: '100%',
    zIndex: ZIndexes.ScrollablePane,
    overflowY: 'hidden',
    overflowX: 'auto'
  };

  const maxHeightStyles: IStyle = {
    height: 'inherit',
    maxHeight: 'inherit',
    zIndex: ZIndexes.ScrollablePane
  };

  return ({
    root: [
      classNames.root,
      {
        WebkitOverflowScrolling: 'touch',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      maxHeightStyles,
      className
    ],
    contentContainer: [
      classNames.contentContainer,
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
