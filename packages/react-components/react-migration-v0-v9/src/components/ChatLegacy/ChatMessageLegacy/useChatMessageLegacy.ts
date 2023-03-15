import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ChatMessageLegacyProps, ChatMessageLegacyState } from './ChatMessageLegacy.types';
import { getDecorationIcon } from '../utils/getDecorationIcon';
import { useChatMessageFocusableGroup } from '../utils/useChatMessageFocusableGroup';
import { useChatMessagePopoverTrigger } from '../utils/useChatMessagePopoverTrigger';

/**
 * Create the state required to render ChatMessageLegacy.
 *
 * The returned state can be modified with hooks such as useChatMessageLegacyStyles_unstable,
 * before being passed to renderChatMessageLegacy_unstable.
 *
 * @param props - props from this instance of ChatMessageLegacy
 * @param ref - reference to root HTMLElement of ChatMessageLegacy
 */
export const useChatMessageLegacy_unstable = (
  props: ChatMessageLegacyProps,
  ref: React.Ref<HTMLDivElement>,
): ChatMessageLegacyState => {
  const {
    attached,
    author,
    avatar,
    body,
    decoration,
    decorationIcon,
    decorationLabel,
    details,
    persistentTimestamp,
    reactions,
    root,
    showAnimation,
    timestamp,
  } = props;

  /**
   * Splits the native props into ones that go to the `root` slot, and ones that go to the primary slot.
   * The primary slot is the `body` slot in this case.
   */
  const nativeProps = getPartitionedNativeProps<
    ChatMessageLegacyProps & Pick<React.HTMLAttributes<HTMLElement>, 'style' | 'className' | 'tabIndex'>,
    'tabIndex'
  >({
    primarySlotTagName: 'div',
    props,
    excludedPropNames: ['tabIndex'], // tabIndex from props will not be applied to the primary slot, as it should always be 0 for tabster navigation
  });

  const state: ChatMessageLegacyState = {
    attached,
    decoration,
    persistentTimestamp,
    showAnimation,

    body: resolveShorthand(body, {
      required: true,
      defaultProps: {
        ref,
        ...nativeProps.primary,
        tabIndex: 0,
      },
    }),
    root: resolveShorthand(root, {
      required: true,
      defaultProps: nativeProps.root,
    }),

    author: resolveShorthand(author),
    avatar: attached && attached !== 'top' ? undefined : resolveShorthand(avatar),
    decorationIcon: resolveShorthand(decorationIcon, {
      required: !!decoration,
    }),
    decorationLabel: resolveShorthand(decorationLabel),
    details: resolveShorthand(details),
    reactions: resolveShorthand(reactions),
    timestamp: resolveShorthand(timestamp),

    components: {
      author: 'div',
      avatar: 'div',
      body: 'div',
      decorationIcon: 'div',
      decorationLabel: 'div',
      details: 'div',
      reactions: 'div',
      root: 'div',
      timestamp: 'span',
    },
  };

  if (state.decorationIcon && !state.decorationIcon.children) {
    state.decorationIcon.children = getDecorationIcon(decoration);
  }

  useChatMessagePopoverTrigger(state);
  useChatMessageFocusableGroup(state);

  return state;
};
