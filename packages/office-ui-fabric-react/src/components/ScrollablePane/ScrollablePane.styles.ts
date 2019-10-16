import { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import { HighContrastSelector, IStyle, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-ScrollablePane',
  contentContainer: 'ms-ScrollablePane--contentContainer'
};

export const getStyles = (props: IScrollablePaneStyleProps): IScrollablePaneStyles => {
  const { className, theme, experimentalLayoutImprovements } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const AboveAndBelowStyles: IStyle = {
    position: 'absolute',
    pointerEvents: experimentalLayoutImprovements ? 'none' : 'auto'
  };

  const positioningStyle: IStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    WebkitOverflowScrolling: 'touch'
  };

  const _scrollbarVisibility = experimentalLayoutImprovements || props.scrollbarVisibility === 'always' ? 'scroll' : 'auto';

  return {
    root: [classNames.root, theme.fonts.medium, positioningStyle, className],
    contentContainer: [
      classNames.contentContainer,
      {
        overflowY: _scrollbarVisibility,
        overflowX: _scrollbarVisibility
      },
      positioningStyle
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
      AboveAndBelowStyles,
      {
        width: '100%'
      }
    ]
  };
};
