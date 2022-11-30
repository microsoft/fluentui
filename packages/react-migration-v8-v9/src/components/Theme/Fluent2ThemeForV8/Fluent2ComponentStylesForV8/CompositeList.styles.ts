import type { IStyleFunctionOrObject } from '@fluentui/react';
import type { ICompositeListStyleProps, ICompositeListStyles } from '@m365-admin/composite-list';

export function getCompositeStyles(
  props: ICompositeListStyleProps,
): IStyleFunctionOrObject<ICompositeListStyleProps, ICompositeListStyles> {
  const styles: Partial<ICompositeListStyles> = {
    subComponentStyles: {
      commandBar: {
        root: {
          borderRadius: 0,
        },
      },
      pivot: {},
      pivotSearchBox: {},
      emptyState: {},
      customPivotSearchCloseStyles: {},
    },
  };

  return styles;
}
