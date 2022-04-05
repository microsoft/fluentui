import { IButtonStyles } from '@fluentui/react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from '@fluentui/react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const PrimaryButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      height: StyleConstants.inputControlHeight,
      padding: '0px 16px',
      border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
    },
    rootFocused: {
      selectors: {
        '::after': {
          outlineColor: `${semanticColors.primaryButtonText} !important`,
        },
      },
      backgroundColor: semanticColors.primaryButtonBackground,
      color: semanticColors.primaryButtonText,
      borderColor: extendedSemanticColors.primaryCompoundButtonBorder,
    },
    rootChecked: {
      border: 'none',
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      color: semanticColors.primaryButtonTextHovered,
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed,
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
    },
  };
};
