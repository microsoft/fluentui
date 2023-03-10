import type { ISearchBoxStyleProps, ISearchBoxStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { getFluent2InputDisabledStyles, getFluent2InputFocusStyles } from './inputStyleHelpers.utils';

export function getSearchBoxStyles(
  props: ISearchBoxStyleProps,
): IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles> {
  const { hasFocus, underlined, disabled, theme } = props;
  const { palette } = theme;

  const restBottomBorder = `1px solid ${palette.neutralPrimary}`;

  const styles: Partial<ISearchBoxStyles> = {
    root: [
      {
        borderRadius: underlined ? 0 : theme.effects.roundedCorner4,
        borderBottom: restBottomBorder,
      },

      hasFocus && [
        'is-active',
        {
          position: 'relative',
          borderColor: 'unset',
        },
        getFluent2InputFocusStyles(theme),
      ],

      disabled && ['is-disabled', getFluent2InputDisabledStyles(theme)],
    ],
    field: [
      disabled && {
        '::placeholder': {
          color: palette.neutralQuaternaryAlt,
        },
      },
    ],
    iconContainer: [
      {
        color: theme.palette.neutralPrimary,
      },
      disabled && [
        'is-disabled',
        {
          color: palette.neutralQuaternaryAlt,
        },
      ],
    ],
  };

  return styles;
}
