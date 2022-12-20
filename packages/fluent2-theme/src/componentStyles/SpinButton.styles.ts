import type { ISpinButtonStyleProps, ISpinButtonStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { FontWeights, getInputFocusStyle } from '@fluentui/react';

export function getSpinButtonStyles(
  props: ISpinButtonStyleProps,
): IStyleFunctionOrObject<ISpinButtonStyleProps, ISpinButtonStyles> {
  const { theme, isFocused, disabled } = props;
  const { semanticColors } = theme;
  const SpinButtonRootBorderColor = semanticColors.inputBorder;
  const SpinButtonRootBorderColorHovered = semanticColors.inputBorderHovered;
  const SpinButtonRootBorderColorFocused = semanticColors.inputFocusBorderAlt;

  const styles: Partial<ISpinButtonStyles> = {
    label: {
      fontWeight: FontWeights.regular,
    },
    spinButtonWrapper: [
      {
        // setting border using pseudo-element here in order to prevent:
        // input and chevron buttons to overlap border under certain resolutions
        ':after': {
          pointerEvents: 'none',
          content: "''",
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: SpinButtonRootBorderColor,
          borderBottomColor: theme.palette.neutralPrimary,
          borderRadius: theme.effects.roundedCorner4,
        },
      },
      !disabled && [
        {
          ':hover :': { ':after': { borderColor: SpinButtonRootBorderColorHovered } },
        },
        isFocused && {
          selectors: {
            '&&': getInputFocusStyle(SpinButtonRootBorderColorFocused, theme.effects.roundedCorner4),
          },
        },
      ],
    ],
  };

  return styles;
}
