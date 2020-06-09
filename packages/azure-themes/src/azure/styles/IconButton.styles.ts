import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.primaryButtonBackground,
    },
    rootDisabled: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.buttonTextDisabled,
    },
    rootHovered: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.primaryButtonBackgroundHovered,
    },
    rootPressed: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.primaryButtonBackgroundPressed,
    },
    rootChecked: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.primaryButtonBackgroundPressed,
    },
    rootCheckedHovered: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.primaryButtonBackgroundHovered,
    },
  };
};
