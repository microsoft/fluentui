import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed
    },
    rootChecked: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered
    }
  };
};
