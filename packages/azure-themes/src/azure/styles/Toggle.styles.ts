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
        backgroundColor: BaseColors.GRAY_C8C6C4,
      },
      !checked &&
        disabled && {
          backgroundColor: semanticColors.disabledBackground,
        },
      disabled &&
        !checked && {
          backgroundColor: extendedSemanticColors.toggleDisabledBackground,
        },
    ],
    // toggle circle
    thumb: [
      {
        backgroundColor: extendedSemanticColors.controlOutlineHovered,
      },
      disabled && {
        backgroundColor: extendedSemanticColors.buttonBackgroundHovered,
      },
      !checked && {
        backgroundColor: extendedSemanticColors.controlOutlineHovered,
      },
      checked &&
        !disabled && {
          backgroundColor: BaseColors.WHITE,
        },
      disabled &&
        !checked && {
          backgroundColor: BaseColors.GRAY_C8C6C4,
        },
    ],
    root: [
      {
        fontSize: FontSizes.size13,
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
