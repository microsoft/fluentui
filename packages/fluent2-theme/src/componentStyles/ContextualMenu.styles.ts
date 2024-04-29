import type { IContextualMenuStyleProps, IContextualMenuStyles, IStyleFunctionOrObject } from '@fluentui/react';

export function getContextualMenuStyles(
  props: IContextualMenuStyleProps,
): IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<IContextualMenuStyles> = {
    root: {
      borderRadius: effects.roundedCorner4,
      boxShadow: effects.elevation8,
    },
    container: {
      borderRadius: effects.roundedCorner4,
    },
    list: {
      padding: '4px',
    },
    subComponentStyles: {
      callout: {},
      menuItem: {
        root: {
          borderRadius: effects.roundedCorner2,
          '&:after': {
            borderRadius: effects.roundedCorner2,
          },
        },
        divider: {
          margin: '4px',
        },
        icon: {
          color: 'inherit',
        },
      },
    },
  };

  return styles;
}
