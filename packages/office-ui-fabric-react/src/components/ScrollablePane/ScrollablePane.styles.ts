import { IScrollablePaneStyleProps, IScrollablePaneStyles } from './ScrollablePane.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IScrollablePaneStyleProps
): IScrollablePaneStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-ScrollablePane',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
