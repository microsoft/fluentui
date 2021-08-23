import { debugRoot } from '../../../../styles/debugStyles';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ListStylesProps } from '../../../../components/List/List';

export const listStyles: ComponentSlotStylesPrepared<ListStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugRoot()),
    display: p.horizontal ? 'inline-flex' : 'block',
    ...(p.isListTag && {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }),
  }),
};
