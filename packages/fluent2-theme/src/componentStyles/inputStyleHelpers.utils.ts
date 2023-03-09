import { IRawStyle, ITheme } from '@fluentui/react';
import { IExtendedSemanticColors } from '../types';

export const getFluent2InputFocusStyles = (
  theme: ITheme,
  isUnderline: boolean = false,
  isError: boolean = false,
): IRawStyle => {
  const { semanticColors } = theme;

  const bottomBorderFocusColor =
    (semanticColors as IExtendedSemanticColors)?.inputBottomBorderFocus ?? theme.palette.themePrimary;

  const focusBottomBorder = `2px solid ${isError ? semanticColors.errorText : bottomBorderFocusColor}`;

  return {
    borderColor: semanticColors.focusBorder,
    ':after': {
      borderColor: semanticColors.focusBorder,
      borderBottom: isUnderline ? 'unset' : focusBottomBorder,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
    },
  };
};

export const getFluent2InputDisabledStyles = (theme: ITheme): IRawStyle => {
  return {
    borderBottom: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    color: theme.palette.neutralQuaternaryAlt,
    backgroundColor: 'unset',
  };
};
