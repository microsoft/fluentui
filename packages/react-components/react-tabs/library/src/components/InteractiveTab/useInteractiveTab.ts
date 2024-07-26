import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { InteractiveTabProps, InteractiveTabState } from './InteractiveTab.types';
import { useTab_unstable } from '../Tab/useTab';

/**
 * Create the state required to render InteractiveTab.
 *
 * The returned state can be modified with hooks such as useInteractiveTabStyles_unstable,
 * before being passed to renderTab_unstable.
 *
 * @param props - props from this instance of InteractiveTab
 * @param ref - reference to root HTMLElement of InteractiveTab
 */
export const useInteractiveTab_unstable = (
  props: InteractiveTabProps,
  ref: React.Ref<HTMLElement>,
): InteractiveTabState => {
  const tabState = useTab_unstable(props, ref);

  return {
    ...tabState,
    components: {
      ...tabState.components,
      root: 'div',
      button: 'button',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    root: slot.always<React.ComponentPropsWithoutRef<'div'>>('div', { elementType: 'div' }),
    button: tabState.root,
    contentBefore: slot.optional(props.contentBefore, { elementType: 'span' }),
    contentAfter: slot.optional(props.contentAfter, { elementType: 'span' }),
  };
};
