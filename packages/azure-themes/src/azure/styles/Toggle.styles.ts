import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { IToggleStyleProps, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { BaseColors } from '../AzureColors';

export const ToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
  const { theme, disabled, checked } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    container: {},
    pill: [
      {
        backgroundColor: semanticColors.bodyBackground,
      },
      checked && {
        backgroundColor: extendedSemanticColors.controlAccent,
      },
      disabled && {
        backgroundColor: extendedSemanticColors.controlOutlineDisabled,
      },
      !checked &&
        disabled && {
          backgroundColor: semanticColors.disabledBackground,
        },
    ],
    // toggle circle
    thumb: [
      {
        backgroundColor: extendedSemanticColors.controlOutlineHovered,
      },
      disabled && {
        backgroundColor: semanticColors.disabledBodyText,
      },
      checked &&
        !disabled && {
          backgroundColor: BaseColors.WHITE,
        },
    ],
    root: [
      {
        fontSize: FontSizes.size12,
        selectors: {
          '.ms-Toggle-stateText': {
            color: semanticColors.bodyText,
          },
        },
      },
      disabled && {
        selectors: {
          '.ms-Toggle-stateText': {
            color: semanticColors.disabledBodyText,
          },
        },
      },
    ],
  };
};
