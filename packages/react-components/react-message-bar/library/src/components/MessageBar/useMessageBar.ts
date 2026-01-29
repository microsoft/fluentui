'use client';

import * as React from 'react';
import { slot, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useAnnounce } from '@fluentui/react-shared-contexts';
import type { MessageBarProps, MessageBarState, MessageBarBaseProps, MessageBarBaseState } from './MessageBar.types';
import { getIntentIcon } from './getIntentIcon';
import { useMessageBarReflow } from './useMessageBarReflow';
import { useMessageBarTransitionContext } from '../../contexts/messageBarTransitionContext';
import { useMotionForwardedRef } from '../MotionRefForwarder';

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
  'use no memo';

  const { shape = 'rounded', ...restProps } = props;

  const baseState = useMessageBarBase_unstable(restProps, ref);

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { className: transitionClassName, nodeRef } = useMessageBarTransitionContext();
  const motionRef = useMotionForwardedRef();

  baseState.root.ref = useMergedRefs(baseState.root.ref, nodeRef, motionRef);

  return {
    ...baseState,
    icon: slot.optional(props.icon, {
      renderByDefault: true,
      elementType: 'div',
      defaultProps: { children: getIntentIcon(baseState.intent) },
    }),
    shape,
    transitionClassName,
  };
};

/**
 * Base hook for MessageBar component, manages state and structure common to all variants of MessageBar
 *
 * @param props - base props from this instance of MessageBar
 * @param ref - reference to root HTMLElement of MessageBar
 */
export const useMessageBarBase_unstable = (
  props: MessageBarBaseProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarBaseState => {
  const { layout = 'auto', politeness, bottomReflowSpacer, icon, intent = 'info', ...rest } = props;
  const autoReflow = layout === 'auto';
  const { ref: reflowRef, reflowing } = useMessageBarReflow(autoReflow);

  const computedPoliteness = politeness ?? (intent === 'info' ? 'polite' : 'assertive');
  const computedLayout = autoReflow ? (reflowing ? 'multiline' : 'singleline') : layout;

  const actionsRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const { announce } = useAnnounce();
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
      {
        ref: useMergedRefs(ref, reflowRef),
        role: 'group',
        'aria-labelledby': titleId,
        ...rest,
      },
      { elementType: 'div' },
    ),
    icon: slot.optional(icon, {
      elementType: 'div',
    }),
    bottomReflowSpacer: slot.optional(bottomReflowSpacer, {
      renderByDefault: computedLayout === 'multiline',
      elementType: 'div',
    }),
    layout: computedLayout,
    intent,
    actionsRef,
    bodyRef,
    titleId,
  };
};
