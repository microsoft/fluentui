import { IButtonStyles } from '@fluentui/react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from '@fluentui/react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const PrimaryButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      height: StyleConstants.inputControlHeight,
      padding: StyleConstants.buttonPadding,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
      selectors: {
        // danger button
        '&.danger': {
          outlineColor: extendedSemanticColors.ButtonBackgroundDanger,
          borderColor: `${extendedSemanticColors.ButtonBorderDanger} !important`,
          backgroundColor: extendedSemanticColors.ButtonBackgroundDanger,
          color: extendedSemanticColors.ButtonBackgroundDangerText,
          selectors: {
            ':hover': {
              outlineColor: extendedSemanticColors.ButtonBackgroundDangerHovered,
              borderColor: `${extendedSemanticColors.ButtonBorderDangerHovered} !important`,
              backgroundColor: extendedSemanticColors.ButtonBackgroundDangerHovered,
              color: extendedSemanticColors.ButtonBackgroundDangerTextHovered,
            },
            ':active': {
              outlineColor: extendedSemanticColors.ButtonBackgroundDangerPressed,
              borderColor: extendedSemanticColors.ButtonBorderDangerPressed,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundDangerPressed} !important`,
              color: extendedSemanticColors.ButtonBackgroundDangerTextHovered,
            },
            ':focus': {
              outlineColor: `${extendedSemanticColors.ButtonBackgroundDangerPressed} !important`,
              borderColor: `${extendedSemanticColors.ButtonBackgroundDangerPressed} !important`,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundDangerPressed} !important`,
              color: `${extendedSemanticColors.ButtonBackgroundDangerTextHovered} !important`,
            },
          },
        },
        // tag button
        '&.tag': {
          outlineColor: extendedSemanticColors.ButtonBackgroundTag,
          borderColor: `${extendedSemanticColors.ButtonBorderTag} !important`,
          backgroundColor: extendedSemanticColors.ButtonBackgroundTag,
          color: extendedSemanticColors.ButtonBackgroundTagText,
          selectors: {
            ':hover': {
              outlineColor: extendedSemanticColors.ButtonBackgroundTagHovered,
              borderColor: `${extendedSemanticColors.ButtonBorderTagHovered} !important`,
              backgroundColor: extendedSemanticColors.ButtonBackgroundTagHovered,
              color: extendedSemanticColors.ButtonBackgroundTagTextHovered,
            },
            ':active': {
              outlineColor: extendedSemanticColors.ButtonBackgroundTagPressed,
              borderColor: extendedSemanticColors.ButtonBorderTagPressed,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              color: extendedSemanticColors.ButtonBackgroundTagTextHovered,
            },
            ':focus': {
              outlineColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              borderColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              color: `${extendedSemanticColors.ButtonBackgroundTagTextHovered} !important`,
            },
          },
        },
      },
    },
    rootFocused: {
      selectors: {
        '::after': {
          outlineColor: `${semanticColors.primaryButtonText} !important`,
        },
      },
      backgroundColor: semanticColors.primaryButtonBackground,
      color: semanticColors.primaryButtonText,
      borderColor: extendedSemanticColors.primaryCompoundButtonBorder,
    },
    rootChecked: {
      border: 'none',
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      color: semanticColors.primaryButtonTextHovered,
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed,
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
    },
  };
};
