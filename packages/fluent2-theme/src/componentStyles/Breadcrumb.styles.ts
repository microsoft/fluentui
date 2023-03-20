import type { IBreadcrumbStyleProps, IBreadcrumbStyles, IStyleFunctionOrObject } from '@fluentui/react';

export function getBreadcrumbStyles(
  props: IBreadcrumbStyleProps,
): IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<IBreadcrumbStyles> = {
    itemLink: {
      borderRadius: effects.roundedCorner4,
      '.ms-Fabric--isFocusVisible &:focus::after': {
        borderRadius: effects.roundedCorner4,
      },
    },
  };

  return styles;
}
