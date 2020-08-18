import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const PrimaryButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      backgroundColor: semanticColors.primaryButtonBackground,
      height: StyleConstants.inputControlHeight,
      padding: '0px 16px',
      color: semanticColors.primaryButtonText,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
    },
    rootExpanded: {
      color: semanticColors.primaryButtonTextHovered,
      borderColor: semanticColors.primaryButtonBackgroundHovered,
    },
    rootFocused: {
      backgroundColor: semanticColors.primaryButtonBackground,
      color: semanticColors.primaryButtonText,
      borderColor: extendedSemanticColors.primaryCompoundButtonBorder,
    },
    rootHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      color: semanticColors.primaryButtonTextHovered,
      borderColor: semanticColors.primaryButtonBackgroundHovered,
    },
    rootPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed,
      borderColor: semanticColors.primaryButtonBackgroundPressed,
    },
    rootChecked: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed,
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
  };
};
