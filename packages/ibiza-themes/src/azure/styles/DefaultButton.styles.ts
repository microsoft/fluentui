import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from 'office-ui-fabric-react/';

export const defaultButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonText}`
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      border: `0px`
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`
    }
  };
};
