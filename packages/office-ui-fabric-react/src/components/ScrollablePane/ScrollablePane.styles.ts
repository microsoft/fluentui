import { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import {
  HighContrastSelector,
  IStyle,
  globalClassNamesWhenEnabled
} from '../../Styling';

export const getStyles = (
  props: IScrollablePaneStyleProps
): IScrollablePaneStyles => {
  const {
    className,
    theme,
  } = props;

  const AboveAndBelowStyles: IStyle = {
    position: 'absolute',
    pointerEvents: 'auto',
    width: '100%',
    zIndex: 1
  };

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-ScrollablePane']),
      {
        overflowY: 'auto',
        maxHeight: 'inherit',
        height: 'inherit',
        WebkitOverflowScrolling: 'touch'
      },
      className
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
    ]
  });
};
