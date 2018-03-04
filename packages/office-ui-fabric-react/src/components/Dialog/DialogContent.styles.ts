import { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';

export const getStyles = (
  props: IDialogContentStyleProps
): IDialogContentStyles => {

  return ({
    content: [
      'ms-DialogContent',
      {
        // Insert css properties

      }
    ],

    // Insert className styles
  });
};
