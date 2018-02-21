import { IImageStyleProps, IImageStyles } from './Image.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IImageStyleProps
): IImageStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Image',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
