import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import {
  IStyle,
  ITheme,
  FontWeights,
  ScreenWidthMinMedium,
} from '../../Styling';

export const getStyles = (
  props: IDialogStyleProps
): IDialogStyles => {
  const {
    className,
    containerClassName,
    contentClassName,
    theme,
    hidden,
  } = props;

  const dialogDefaultMinWidth = '288px';
  const dialogDefaultMaxWidth = '340px';

  return ({
    root: [
      'ms-Dialog',
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
