import * as React from 'react';
import { getPartitionedNativeProps, omit, slot } from '@fluentui/react-utilities';
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
  const { button, root, contentBefore, contentAfter } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
  });

  const tabState = useTab_unstable(omit(props, ['root', 'style', 'className']), ref);

  return {
    ...tabState,
    components: {
      ...tabState.components,
      root: 'div',
      button: 'button',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),
    button: slot.always(button, {
      defaultProps: {
        ...tabState.root,
        ...nativeProps.primary,
      },
      elementType: 'button',
    }),
    contentBefore: slot.optional(contentBefore, { elementType: 'span' }),
    contentAfter: slot.optional(contentAfter, { elementType: 'span' }),
  };
};
