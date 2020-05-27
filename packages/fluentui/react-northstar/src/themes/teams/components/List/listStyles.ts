import { debugRoot } from '../../../../styles/debugStyles';
import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ListStylesProps } from '../../../../components/List/List';

const listStyles: ComponentSlotStylesPrepared<ListStylesProps> = {
  root: ({ props: p }): any => ({
    ...(p.debug && debugRoot()),

    display: { __specialFlag: true, css: 'display:block', declaration: 'display:block' },

    ...(p.horizontal && {
      display: 'inline-flex',
    }),

    ...(p.isListTag && {
      listStyle: { __specialFlag: true, css: 'list-style:none', declaration: 'list-style:none' },
      padding: { __specialFlag: true, css: 'padding:0', declaration: 'padding:0' },
      margin: { __specialFlag: true, css: 'margin:0', declaration: 'margin:0' },
    }),
  }),
};

export default listStyles;
