import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { FlexStylesProps } from '../../../../components/Flex/Flex';

import { toFlexAlignment } from './utils';
import { FlexVariables } from './flexVariables';

export const flexStyles: ComponentSlotStylesPrepared<FlexStylesProps, FlexVariables> = {
  root: ({ props: p, variables: v }) => ({
    display: 'flex',
    ...(p.debug && { border: '1px dotted grey', background: 'lightgrey' }),

    ...(p.inline && { display: 'inline-flex' }),

    ...(p.column && { flexDirection: 'column' }),

    ...(p.hAlign &&
      (p.column ? { alignItems: toFlexAlignment(p.hAlign) } : { justifyContent: toFlexAlignment(p.hAlign) })),
    ...(p.vAlign &&
      (p.column ? { justifyContent: toFlexAlignment(p.vAlign) } : { alignItems: toFlexAlignment(p.vAlign) })),

    ...(p.space && { justifyContent: `space-${p.space}` }),

    ...(p.wrap && { flexWrap: 'wrap' }),

    ...(p.fill && {
      width: '100%',
      height: '100%',
    }),

    ...(p.padding && { padding: v[p.padding] }),

    ...(p.gap && {
      '> *:not(:last-child)': {
        [p.column ? 'marginBottom' : 'marginRight']: v[p.gap],
      },
    }),
  }),
};
