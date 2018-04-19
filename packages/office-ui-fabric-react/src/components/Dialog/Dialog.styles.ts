import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import {
  ScreenWidthMinMedium,
  globalClassNamesWhenEnabled,
} from '../../Styling';

export const getStyles = (
  props: IDialogStyleProps
): IDialogStyles => {
  const {
    className,
    containerClassName,
    dialogDefaultMinWidth = '288px',
    dialogDefaultMaxWidth = '340px',
    hidden,
    theme
  } = props;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog']),
      className,
    ],

    main: [
      {
        width: dialogDefaultMinWidth,

        selectors: {
          [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
            width: 'auto',
            maxWidth: dialogDefaultMaxWidth,
            minWidth: dialogDefaultMinWidth,
          }
        }
      },
      !hidden && { display: 'flex' },
      containerClassName,
    ]
  });
};
