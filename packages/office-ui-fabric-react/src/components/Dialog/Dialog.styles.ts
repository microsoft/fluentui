import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { ScreenWidthMinMedium, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Dialog'
};

export const getStyles = (props: IDialogStyleProps): IDialogStyles => {
  const { className, containerClassName, dialogDefaultMinWidth = '288px', dialogDefaultMaxWidth = '340px', hidden, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, theme.fonts.medium, className],

    main: [
      {
        width: dialogDefaultMinWidth,

        selectors: {
          [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
            width: 'auto',
            maxWidth: dialogDefaultMaxWidth,
            minWidth: dialogDefaultMinWidth
          }
        }
      },
      !hidden && { display: 'flex' },
      containerClassName
    ]
  };
};
