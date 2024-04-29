import { IButtonStyles } from '@fluentui/react/lib/Button';
import { ITheme } from '@fluentui/react/lib/Styling';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      backgroundColor: StyleConstants.transparent,
      color: extendedSemanticColors.iconButtonFill,
      selectors: {
        // standard button
        '&.is-expanded': {
          backgroundColor: extendedSemanticColors.buttonBackgroundHovered,
          color: extendedSemanticColors.iconButtonFillHovered,
        },
      },
    },
    rootDisabled: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.buttonTextDisabled,
    },
    rootHovered: {
      backgroundColor: extendedSemanticColors.buttonBackgroundHovered,
      color: extendedSemanticColors.iconButtonFillHovered,
    },
    rootPressed: {
      backgroundColor: extendedSemanticColors.buttonBackgroundPressed,
      color: extendedSemanticColors.iconButtonFillHovered,
    },
    rootChecked: {
      backgroundColor: extendedSemanticColors.buttonBackgroundPressed,
      color: extendedSemanticColors.iconButtonFillHovered,
    },
    rootCheckedHovered: {
      backgroundColor: extendedSemanticColors.buttonBackgroundPressed,
      color: extendedSemanticColors.iconButtonFillHovered,
    },
  };
};
