import * as React from 'react';
import { getIntrinsicElementProps, slot, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useAnnounce_unstable } from '@fluentui/react-shared-contexts';
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
export const useMessageBar_unstable = (props: MessageBarProps, ref: React.Ref<HTMLDivElement>): MessageBarState => {
  const { layout = 'auto', intent = 'info', politeness, shape = 'rounded' } = props;
  const computedPoliteness = politeness ?? intent === 'info' ? 'polite' : 'assertive';
  const autoReflow = layout === 'auto';
  const { ref: reflowRef, reflowing } = useMessageBarReflow(autoReflow);
  const computedLayout = autoReflow ? (reflowing ? 'multiline' : 'singleline') : layout;
  const { className: transitionClassName, nodeRef } = useMessageBarTransitionContext();
  const actionsRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const { announce } = useAnnounce_unstable();
  const titleId = useId();

  React.useEffect(() => {
    const bodyMessage = bodyRef.current?.textContent;
    const actionsMessage = actionsRef.current?.textContent;

    const message = [bodyMessage, actionsMessage].filter(Boolean).join(',');
    announce(message, { polite: computedPoliteness === 'polite', alert: computedPoliteness === 'assertive' });
  }, [bodyRef, actionsRef, announce, computedPoliteness]);

  return {
    components: {
      root: 'div',
      icon: 'div',
      bottomReflowSpacer: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, reflowRef, nodeRef),
        role: 'group',
        'aria-labelledby': titleId,
        ...props,
      }),
      { elementType: 'div' },
    ),

    icon: slot.optional(props.icon, {
      renderByDefault: true,
      elementType: 'div',
      defaultProps: { children: getIntentIcon(intent) },
    }),
    bottomReflowSpacer: slot.optional(props.bottomReflowSpacer, {
      renderByDefault: computedLayout === 'multiline',
      elementType: 'div',
    }),
    layout: computedLayout,
    intent,
    transitionClassName,
    actionsRef,
    bodyRef,
    titleId,
    shape,
  };
};
