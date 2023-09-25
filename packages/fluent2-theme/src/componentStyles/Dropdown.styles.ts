import { IDropdownStyleProps, IDropdownStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';
import { IExtendedSemanticColors } from '../types';
import { getFluent2InputDisabledStyles } from './inputStyleHelpers.utils';

export function getDropdownStyles(
  props: IDropdownStyleProps,
): IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> {
  const { theme, disabled } = props;
  const { semanticColors, palette } = theme!;

  const bottomBorderFocusColor =
    (semanticColors as IExtendedSemanticColors)?.inputBottomBorderFocus ?? palette.themePrimary;

  const focusBottomBorder = `2px solid ${bottomBorderFocusColor}`;

  return {
    dropdown: [
      disabled && getFluent2InputDisabledStyles(theme!),
      !disabled && {
        selectors: {
          '&:focus:after': [
            {
              borderRadius: theme?.effects.roundedCorner4,
              borderColor: semanticColors.focusBorder,
              borderBottom: focusBottomBorder,
              clipPath: 'inset(calc(100% - 2px) 0 0 0)',
            },
          ],
        },
      },
    ],
    title: [{ borderRadius: theme?.effects.roundedCorner4 }, disabled && { backgroundColor: 'unset' }],
    caretDown: { color: theme?.palette.neutralQuaternary },
    label: { fontWeight: FontWeights.regular },
  };
}
