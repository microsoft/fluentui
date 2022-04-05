import { HighContrastSelector, getGlobalClassNames } from '../../Styling';
import type { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import type { IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-ScrollablePane',
  contentContainer: 'ms-ScrollablePane--contentContainer',
};

export const getStyles = (props: IScrollablePaneStyleProps): IScrollablePaneStyles => {
  const { className, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const AboveAndBelowStyles: IStyle = {
    position: 'absolute',
    pointerEvents: 'none',
  };

  const positioningStyle: IStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    WebkitOverflowScrolling: 'touch',
  };

  return {
    root: [classNames.root, theme.fonts.medium, positioningStyle, className],
    contentContainer: [
      classNames.contentContainer,
      {
        overflowY: props.scrollbarVisibility === 'always' ? 'scroll' : 'auto',
      },
      positioningStyle,
    ],
    stickyAbove: [
      {
        top: 0,
        zIndex: 1,
        selectors: {
          [HighContrastSelector]: {
            borderBottom: '1px solid WindowText',
          },
        },
      },
      AboveAndBelowStyles,
    ],
    stickyBelow: [
      {
        bottom: 0,
        selectors: {
          [HighContrastSelector]: {
            borderTop: '1px solid WindowText',
          },
        },
      },
      AboveAndBelowStyles,
    ],
    stickyBelowItems: [
      {
        bottom: 0,
      },
      AboveAndBelowStyles,
      {
        width: '100%',
      },
    ],
  };
};
