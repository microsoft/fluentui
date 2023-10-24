import type { ISpinButtonStyleProps, ISpinButtonStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';

export function getSpinButtonStyles(
  props: ISpinButtonStyleProps,
): IStyleFunctionOrObject<ISpinButtonStyleProps, ISpinButtonStyles> {
  const { theme, isFocused, disabled } = props;
  const { semanticColors } = theme;
  const SpinButtonRootBorderColorFocused = semanticColors.disabledBorder; // sorry for the broken semantics
  let SpinButtonRootBorderColor = semanticColors.inputBorder;
  let SpinButtonBorderBottomColor = isFocused ? theme.palette.themePrimary : theme.palette.neutralPrimary;

  if (disabled) {
    SpinButtonBorderBottomColor = semanticColors.disabledBorder;
    SpinButtonRootBorderColor = semanticColors.disabledBorder;
  }

  const styles: Partial<ISpinButtonStyles> = {
    label: {
      fontWeight: FontWeights.regular,
    },
    input: {
      backgroundColor: 'unset',
    },
    spinButtonWrapper: [
      {
        borderBottomColor: SpinButtonBorderBottomColor,
        backgroundColor: 'unset',
      },
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
          borderBottomColor: SpinButtonBorderBottomColor,
          borderRadius: theme.effects.roundedCorner4,
        },
      },
      !disabled && [
        {
          ':hover :': {
            ':after': {
              borderStyle: 'solid',
              borderColor: SpinButtonRootBorderColorFocused,
              borderBottom: theme.palette.themePrimary,
              borderWidth: '1px',
            },
          },
        },
        isFocused && [
          {
            ':hover:after, :after': {
              borderStyle: 'solid',
              borderColor: SpinButtonRootBorderColorFocused,
              borderBottomColor: SpinButtonBorderBottomColor,
              borderWidth: '1px',
            },
          },
        ],
      ],
    ],
  };

  return styles;
}
