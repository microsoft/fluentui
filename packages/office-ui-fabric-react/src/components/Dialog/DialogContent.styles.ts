import { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IDialogContentStyleProps
): IDialogContentStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-DialogContent',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
