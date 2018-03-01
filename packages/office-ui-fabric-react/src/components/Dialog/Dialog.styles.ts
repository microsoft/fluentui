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
    isRight,
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
    ],

    actions: [
      {
        position: 'relative',
        width: '100%',
        minHeight: '24px',
        lineHeight: '24px',
        margin: '20px 0 0',
        fontSize: '0',

        selectors: {
          '.ms-Button': {
            lineHeight: 'normal',
          }
        }
      }
    ],

    actionsRight: [
      {
        textAlign: 'right',
        marginRight: '-4px',
      }
    ],

    action: [
      isRight && {
        margin: '0 4px',
      }
    ]
  });
};
