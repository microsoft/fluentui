import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { IToggleStyleProps, IToggleStyles } from '@fluentui/react/lib/Toggle';
import * as StyleConstants from '../Constants';

export const ToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
  const { theme, disabled, checked } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    container: {},
    pill: [
      {
        height: StyleConstants.choiceFieldHeight,
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          '&:hover': {
            backgroundColor: extendedSemanticColors.radioButtonPillUncheckedHover,
          },
          '&::after': {
            outlineColor: `${extendedSemanticColors.ButtonBorderFocus} !important`,
          },
        },
      },
      checked && [
        {
          backgroundColor: extendedSemanticColors.controlAccent,
          selectors: {
            '&:hover': {
              backgroundColor: extendedSemanticColors.radioButtonPillCheckedHover,
            },
          },
        },
        disabled && {
          backgroundColor: extendedSemanticColors.checkBoxDisabled,
          selectors: {
            '&:hover': {
              backgroundColor: `${extendedSemanticColors.checkBoxDisabled}`,
            },
          },
        },
      ],
      !checked && [
        {
          backgroundColor: extendedSemanticColors.bodyBackground,
          border: `1px solid ${extendedSemanticColors.ButtonBorderFocus} !important`,

          selectors: {
            '&:hover': {
              border: `1px solid ${extendedSemanticColors.buttonTextHovered} !important`,
            },
          },
        },
        disabled && {
          border: `1px solid ${extendedSemanticColors.checkBoxDisabled} !important`,

          selectors: {
            '&:hover': {
              backgroundColor: extendedSemanticColors.bodyBackground,
              border: `1px solid ${extendedSemanticColors.checkBoxDisabled} !important`,
            },
          },
        },
      ],
    ],
    // toggle circle
    thumb: [
      {
        borderWidth: 5.5,
        height: StyleConstants.choiceFieldCircle,
        width: StyleConstants.choiceFieldCircle,
      },
      checked && [
        {
          backgroundColor: extendedSemanticColors.buttonBackground,
        },
        disabled && {
          backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
        },
      ],
      !checked && [
        {
          backgroundColor: extendedSemanticColors.ButtonBorderFocus,
          selectors: {
            '&:hover': {
              backgroundColor: extendedSemanticColors.buttonTextHovered,
            },
          },
        },
        disabled && {
          backgroundColor: extendedSemanticColors.checkBoxDisabled,
          selectors: {
            '&:hover': {
              backgroundColor: extendedSemanticColors.checkBoxDisabled,
            },
          },
        },
      ],
    ],
    root: [
      {
        fontSize: theme.fonts.medium.fontSize,
        selectors: {
          '.ms-Toggle-stateText': {
            color: semanticColors.bodyText,
          },
          '&:hover': {
            '.ms-Toggle-stateText': {
              color: extendedSemanticColors.buttonTextHovered,
            },
          },
        },
      },
      disabled && {
        selectors: {
          '.ms-Toggle-stateText': {
            color: semanticColors.disabledBodyText,
          },
          '&:hover': {
            '.ms-Toggle-stateText': {
              color: semanticColors.disabledBodyText,
            },
          },
        },
      },
    ],
  };
};
