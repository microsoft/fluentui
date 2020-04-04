import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

import * as StyleConstants from '../Constants';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      backgroundColor: StyleConstants.transparent,
      color: extendedSemanticColors.iconButtonColor,
    },
    rootDisabled: {
      backgroundColor: StyleConstants.transparent,
      color: extendedSemanticColors.iconButtonDisabledColor,
    },
    rootHovered: {
      backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
      color: extendedSemanticColors.iconHoveredColor,
    },
    rootPressed: {
      backgroundColor: extendedSemanticColors.buttonBackgroundPressed,
      color: extendedSemanticColors.iconPressedColor,
    },
    rootChecked: {
      backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
      color: extendedSemanticColors.iconHoveredColor,
    },
    rootCheckedHovered: {
      backgroundColor: extendedSemanticColors.buttonBackgroundPressed,
      color: extendedSemanticColors.iconPressedColor,
    },
  };
};
