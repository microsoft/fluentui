import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/';

export const primaryButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  console.dir(theme);
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.primaryButtonBackground,
      color: semanticColors.primaryButtonText
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled
    },
    rootHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      color: semanticColors.primaryButtonTextHovered
    },
    rootPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed
    }
  };
};
