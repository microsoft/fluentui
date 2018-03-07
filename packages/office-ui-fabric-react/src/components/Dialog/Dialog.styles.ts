import { IDialogStyleProps, IDialogStyles } from './Dialog.types';

export const getStyles = (
  props: IDialogStyleProps
): IDialogStyles => {

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
