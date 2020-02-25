import { debugRoot } from '../../../../styles/debugStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ListProps } from '../../../../components/List/List';

export type ListStylesProps = Pick<ListProps, 'debug' | 'horizontal'> & { isListTag: boolean };

const listStyles: ComponentSlotStylesPrepared<ListStylesProps> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugRoot()),
    display: p.horizontal ? 'inline-flex' : 'block',
    ...(p.isListTag && {
      listStyle: 'none',
      padding: 0,
      margin: 0
    })
  })
};

export default listStyles;
