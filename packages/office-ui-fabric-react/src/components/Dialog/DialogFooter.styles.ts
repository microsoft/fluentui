import { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IDialogFooterStyleProps
): IDialogFooterStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-DialogFooter',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
