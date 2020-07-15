import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export const PrimaryButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.primaryButtonBackground,
      color: semanticColors.primaryButtonText,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
    },
    rootExpanded: {
      color: semanticColors.primaryButtonText,
    },
    rootFocused: {
      color: semanticColors.primaryButtonText,
      borderColor: semanticColors.primaryButtonBorder,
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
      color: '#ffffff',
      border: 'none',
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      color: '#ffffff',
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: '#ffffff',
    },
  };
};
