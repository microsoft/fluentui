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
        selectors: {
          '&:hover': {
            backgroundColor: extendedSemanticColors.radioButtonPillUncheckedHover,
          },
        },
      },
      checked && {
        backgroundColor: extendedSemanticColors.controlAccent,
        selectors: {
          '&:hover': {
            backgroundColor: extendedSemanticColors.radioButtonPillCheckedHover,
          },
        },
      },
      disabled && {
        backgroundColor: extendedSemanticColors.radioButtonPillDisabled,
        selectors: {
          '&:hover': {
            backgroundColor: `${extendedSemanticColors.radioButtonPillDisabled}`,
          },
        },
      },

      !checked &&
        disabled && {
          border: `1px solid ${extendedSemanticColors.radioButtonPillBorderDisabled} !important`,
          backgroundColor: extendedSemanticColors.radioButtonPillDisabled,
        },
      disabled &&
        !checked && {
          backgroundColor: extendedSemanticColors.radioButtonPillUncheckedDisabled,
          selectors: {
            '&:hover': {
              backgroundColor: extendedSemanticColors.radioButtonPillUncheckedDisabled,
            },
          },
        },
    ],
    // toggle circle
    thumb: [
      {
        backgroundColor: extendedSemanticColors.controlOutlineHovered,
      },
      disabled && {
        backgroundColor: extendedSemanticColors.radioButtonThumbCheckedDisabled,
      },
      !checked && {
        backgroundColor: extendedSemanticColors.radioButtonThumbUnchecked,
      },
      checked &&
        !disabled && {
          backgroundColor: BaseColors.WHITE,
        },
      disabled &&
        !checked && {
          backgroundColor: extendedSemanticColors.radioButtonThumbUncheckedDisabled,
        },
    ],
    root: [
      {
        fontSize: theme.fonts.medium.fontSize,
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
