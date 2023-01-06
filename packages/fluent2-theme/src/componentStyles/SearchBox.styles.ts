import type { ISearchBoxStyleProps, ISearchBoxStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { getInputFocusStyle } from '@fluentui/react';

export function getSearchBoxStyles(
  props: ISearchBoxStyleProps,
): IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles> {
  const { hasFocus, underlined, theme } = props;

  const styles: Partial<ISearchBoxStyles> = {
    root: [
      {
        borderRadius: underlined ? 0 : theme.effects.roundedCorner4,
      },

      hasFocus && [
        'is-active',
        {
          position: 'relative',
        },
        getInputFocusStyle(
          theme.semanticColors.inputFocusBorderAlt,
          underlined ? 0 : theme.effects.roundedCorner4,
          underlined ? 'borderBottom' : 'border',
        ),
      ],
    ],
    iconContainer: {
      color: theme.palette.neutralPrimary,
    },
  };

  return styles;
}
