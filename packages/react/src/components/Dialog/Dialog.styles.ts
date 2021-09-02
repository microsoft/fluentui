import { ScreenWidthMinMedium, getGlobalClassNames } from '../../Styling';
import type { IDialogStyleProps, IDialogStyles } from './Dialog.types';

const GlobalClassNames = {
  root: 'ms-Dialog',
};

export const getStyles = (props: IDialogStyleProps): IDialogStyles => {
  const {
    className,
    containerClassName, // eslint-disable-line deprecation/deprecation
    dialogDefaultMinWidth = '288px',
    dialogDefaultMaxWidth = '340px',
    hidden,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, theme.fonts.medium, className],

    main: [
      {
        width: dialogDefaultMinWidth,
        outline: '3px solid transparent',

        selectors: {
          [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
            width: 'auto',
            maxWidth: dialogDefaultMaxWidth,
            minWidth: dialogDefaultMinWidth,
          },
        },
      },
      !hidden && { display: 'flex' },
      containerClassName,
    ],
  };
};
