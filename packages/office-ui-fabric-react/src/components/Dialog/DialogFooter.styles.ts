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
    actions: [
      'ms-Dialog-actions',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
