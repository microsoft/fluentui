import * as React from 'react';
import { getNativeElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { MessageBarProps, MessageBarState } from './MessageBar.types';
import { getIntentIcon } from './getIntentIcon';
import { useMessageBarReflow } from './useMessageBarReflow';
import { useMessageBarTransitionContext } from '../../contexts/messageBarTransitionContext';

/**
 * Create the state required to render MessageBar.
 *
 * The returned state can be modified with hooks such as useMessageBarStyles_unstable,
 * before being passed to renderMessageBar_unstable.
 *
 * @param props - props from this instance of MessageBar
 * @param ref - reference to root HTMLElement of MessageBar
 */
export const useMessageBar_unstable = (props: MessageBarProps, ref: React.Ref<HTMLElement>): MessageBarState => {
  const { layout = 'auto', intent = 'info' } = props;
  const autoReflow = layout === 'auto';
  const { ref: reflowRef, reflowing } = useMessageBarReflow(autoReflow);
  const computedLayout = autoReflow ? (reflowing ? 'multiline' : 'singleline') : layout;
  const transitionClassName = useMessageBarTransitionContext();

  return {
    components: {
      root: 'div',
      icon: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, reflowRef),
        ...props,
      }),
      { elementType: 'div' },
    ),

    icon: slot.optional(props.icon, {
      renderByDefault: true,
      elementType: 'div',
      defaultProps: { children: getIntentIcon(intent) },
    }),
    layout: computedLayout,
    intent,
    transitionClassName,
  };
};
