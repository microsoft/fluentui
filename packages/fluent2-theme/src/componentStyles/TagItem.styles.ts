import type { IStyleFunctionOrObject, ITagItemStyleProps, ITagItemStyles } from '@fluentui/react';

export function getTagItemStyles(
  props: ITagItemStyleProps,
): IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles> {
  const { theme } = props;

  return {
    root: {
      borderRadius: theme.effects.roundedCorner4,
    },
  };
}
