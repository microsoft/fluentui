import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.iconButtonColor,
    },
    rootDisabled: {
      backgroundColor: StyleConstants.transparent,
      color: semanticColors.iconButtonDisabledColor,
    },
    rootHovered: {
      backgroundColor: StyleConstants.buttonBackgroundHoveredDefault,
      color: semanticColors.iconHoveredColor,
    },
    rootPressed: {
      backgroundColor: StyleConstants.buttonBackgroundPressed,
      color: semanticColors.iconPressedColor,
    },
    rootChecked: {
      backgroundColor: StyleConstants.buttonBackgroundHoveredDefault,
      color: semanticColors.iconHoveredColor,
    },
    rootCheckedHovered: {
      backgroundColor: StyleConstants.buttonBackgroundPressed,
      color: semanticColors.iconPressedColor,
    },
  };
};
