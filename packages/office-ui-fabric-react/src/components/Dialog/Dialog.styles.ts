import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { ScreenWidthMinMedium, getGlobalClassNames, mergeStyleSets } from '../../Styling';
import { IDialogContentStyles, IDialogContentProps } from './DialogContent.types';
import { memoizeFunction } from '../../Utilities';

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
        outline: '3px solid transparent',

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

export const getMergedDialogContentStyles = memoizeFunction(
  (dialogContentProps?: IDialogContentProps, dialogDraggableClassName?: string): Partial<IDialogContentStyles> => {
    const headerStyle = {
      header: [
        dialogDraggableClassName,
        dialogDraggableClassName && {
          cursor: 'move'
        }
      ]
    };

    return dialogContentProps ? mergeStyleSets(dialogContentProps.styles, headerStyle) : headerStyle;
  }
);
