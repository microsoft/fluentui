'use client';

import * as React from 'react';
import { omit, slot } from '@fluentui/react-utilities';
import type { TabProps, TabState } from './Tab.types';
import { useTabListContext_unstable } from '../TabList';
import { useTabBase_unstable } from './useTabBase';

/**
 * Create the state required to render Tab.
 *
 * The returned state can be modified with hooks such as useTabStyles_unstable,
 * before being passed to renderTab_unstable.
 *
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTab_unstable = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  const { content } = props;

  const state = useTabBase_unstable(props, ref);

  const appearance = useTabListContext_unstable(ctx => ctx.appearance);
  const reserveSelectedTabSpace = useTabListContext_unstable(ctx => ctx.reserveSelectedTabSpace);
  const size = useTabListContext_unstable(ctx => ctx.size ?? 'medium');

  const contentReservedSpace: typeof content =
    content && typeof content === 'object' ? omit(content, ['ref' as keyof typeof content]) : content;

  return {
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, contentReservedSpace: 'span' },
    contentReservedSpace: slot.optional(contentReservedSpace, {
      renderByDefault: !state.selected && !state.iconOnly && reserveSelectedTabSpace,
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
    appearance,
    size,
  };
};
