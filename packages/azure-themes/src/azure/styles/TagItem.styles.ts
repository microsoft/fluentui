import { ITagItemStyleProps, ITagItemStyles } from '@fluentui/react/lib/Pickers';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { transparent } from '../Constants';

export const TagItemStyles = (props: ITagItemStyleProps): Partial<ITagItemStyles> => {
  const { theme, selected } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      verticalAlign: 'middle',
      backgroundColor: semanticColors.listItemBackgroundChecked,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.listItemBackgroundCheckedHovered,
        },
      },
    },
    text: [
      selected && {
        color: semanticColors.bodyText,
      },
    ],
    close: {
      color: semanticColors.bodyText,
      verticalAlign: 'middle',
      backgroundColor: 'transparent',
      selectors: {
        '&.is-disabled': {
          backgroundColor: transparent,
        },
        ':active': {
          backgroundColor: semanticColors.listHeaderBackgroundPressed,
          color: extendedSemanticColors.controlOutlineHovered,
        },
        ':hover': {
          backgroundColor: semanticColors.listItemBackgroundCheckedHovered,
          color: semanticColors.bodyText,
        },
      },
    },
  };
};
