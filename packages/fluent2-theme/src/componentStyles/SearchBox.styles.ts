import type { ISearchBoxStyleProps, ISearchBoxStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { getFluent2InputDisabledStyles, getFluent2InputFocusStyles } from './inputStyleHelpers.utils';

export function getSearchBoxStyles(
  props: ISearchBoxStyleProps,
): IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles> {
  const { hasFocus, underlined, disabled, theme } = props;
  const { palette, semanticColors } = theme;

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

      disabled && [
        'is-disabled',
        getFluent2InputDisabledStyles(theme),
        { borderBottom: `1px solid ${semanticColors.disabledBorder}` },
      ],
    ],
    field: [
      disabled && {
        '::placeholder': {
          color: semanticColors.disabledText,
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
          color: semanticColors.disabledText,
        },
      ],
    ],
  };

  return styles;
}
