'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useAnnounce } from '@fluentui/react-shared-contexts';
import type { MessageBarBaseProps, MessageBarBaseState, MessageBarProps, MessageBarState } from './MessageBar.types';
import { getIntentIcon } from './getIntentIcon';
import { useMessageBarReflow } from './useMessageBarReflow';
import { useMessageBarTransitionContext } from '../../contexts/messageBarTransitionContext';
import { useMotionForwardedRef } from '@fluentui/react-motion';

/**
 * Returns the text of the body with a space after MessageBarTitle. The styled MessageBarTitle renders that space
 * with generated content (`::after`), which `textContent` does not include.
 */
const getBodyMessage = (body: HTMLElement | null, titleId: string): string => {
  const message = body?.textContent ?? '';
  // The ids are compared directly, because an id is not always valid inside a selector
  const title = Array.from(body?.querySelectorAll('[id]') ?? []).find(element => element.id === titleId);

  if (!body || !title) {
    return message;
  }

  const range = body.ownerDocument.createRange();
  range.selectNodeContents(body);
  range.setEndAfter(title);

  const messageUpToTitle = range.toString();
  const messageAfterTitle = message.slice(messageUpToTitle.length);

  if (!messageUpToTitle || !messageAfterTitle || /\s$/.test(messageUpToTitle) || /^\s/.test(messageAfterTitle)) {
    return message;
  }

  return `${messageUpToTitle} ${messageAfterTitle}`;
};

/**
 * Returns the text of the actions. Each child is read on its own, so that the labels of two actions are not joined
 * into one word.
 */
const getActionsMessage = (actions: HTMLElement | null): string =>
  Array.from(actions?.childNodes ?? [])
    .filter(node => node.nodeType !== node.COMMENT_NODE)
    .map(node => node.textContent?.trim())
    .filter(Boolean)
    .join(',');

/**
 * Create the base state required to render MessageBar without design-specific props.
 *
 * @param props - props from this instance of MessageBar (without shape)
 * @param ref - reference to root HTMLElement of MessageBar
 */
export const useMessageBarBase_unstable = (
  props: MessageBarBaseProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarBaseState => {
  const { layout = 'auto', intent = 'info', politeness } = props;
  const computedPoliteness = politeness ?? (intent === 'info' ? 'polite' : 'assertive');
  const autoReflow = layout === 'auto';
  const { ref: reflowRef, reflowing } = useMessageBarReflow(autoReflow);
  const computedLayout = autoReflow ? (reflowing ? 'multiline' : 'singleline') : layout;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { className: transitionClassName, nodeRef } = useMessageBarTransitionContext();

  const actionsRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const { announce } = useAnnounce();
  const titleId = useId();

  React.useEffect(() => {
    const bodyMessage = getBodyMessage(bodyRef.current, titleId);
    const actionsMessage = getActionsMessage(actionsRef.current);

    const message = [bodyMessage, actionsMessage].filter(Boolean).join(',');
    announce(message, { polite: computedPoliteness === 'polite', alert: computedPoliteness === 'assertive' });
  }, [bodyRef, actionsRef, announce, computedPoliteness, titleId]);

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
  };
};

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
  const { shape = 'rounded', ...baseProps } = props;

  const motionRef = useMotionForwardedRef();
  const state = useMessageBarBase_unstable(baseProps, useMergedRefs(ref, motionRef));

  return {
    ...state,
    shape,
    icon: slot.optional(props.icon, {
      defaultProps: {
        children: getIntentIcon(state.intent),
      },
      renderByDefault: true,
      elementType: 'div',
    }),
  };
};
