import * as React from 'react';
import { getNativeElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';
import type { MessageBarProps, MessageBarState } from './MessageBar.types';
import { getIntentIcon } from './getIntentIcon';
import { useMessageBarReflow } from './useMessageBarReflow';

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
  const { layout = 'auto', intent = 'info', visible = true, onDismiss, animate = 'exit-only' } = props;
  const autoReflow = layout === 'auto';
  const { ref: reflowRef, reflowing } = useMessageBarReflow(autoReflow);
  const computedLayout = autoReflow ? (reflowing ? 'multiline' : 'singleline') : layout;
  const motionState = useMotion(visible, { animateOnFirstMount: true });

  React.useEffect(() => {
    if (motionState.type === 'exited' && onDismiss) {
      onDismiss();
    }
  }, [motionState.type, onDismiss]);

  return {
    components: {
      root: 'div',
      icon: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, reflowRef, motionState.ref),
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
    motionState,
    animate,
  };
};
