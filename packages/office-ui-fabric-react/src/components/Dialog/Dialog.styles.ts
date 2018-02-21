import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IDialogStyleProps
): IDialogStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Dialog',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
