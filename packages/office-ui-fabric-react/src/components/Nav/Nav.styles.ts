import { INavStyleProps, INavStyles } from './Nav.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: INavStyleProps
): INavStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Nav',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
