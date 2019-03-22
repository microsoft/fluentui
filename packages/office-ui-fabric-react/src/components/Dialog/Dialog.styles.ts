import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { ScreenWidthMinMedium, getGlobalClassNames, mergeStyleSets } from '../../Styling';
import { IDialogContentStyles, IDialogContentStyleProps, IDialogContentProps } from './DialogContent.types';
import { IStyleFunctionOrObject } from '../../Utilities';

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

export const getMergedDialogContentStyles = (
  dialogContentProps?: IDialogContentProps,
  dialogDraggableClassName?: string
): IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles> => {
  const headerStyle = {
    header: [
      dialogDraggableClassName,
      dialogDraggableClassName && {
        cursor: 'move'
      }
    ]
  };

  if (dialogContentProps && dialogContentProps.styles) {
    if (typeof dialogContentProps.styles === 'function') {
      const styles = dialogContentProps.styles;
      return (props: IDialogContentStyleProps) => {
        return mergeStyleSets(styles(props), headerStyle);
      };
    } else {
      return mergeStyleSets(dialogContentProps.styles, headerStyle);
    }
  }

  return headerStyle;
};
