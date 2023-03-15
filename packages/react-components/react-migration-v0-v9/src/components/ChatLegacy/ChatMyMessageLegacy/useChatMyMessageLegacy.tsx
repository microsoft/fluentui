import * as React from 'react';

import type { ChatMyMessageLegacyProps, ChatMyMessageLegacyState } from './ChatMyMessageLegacy.types';

import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-components';
import {
  CheckmarkCircle16Regular,
  Circle16Regular,
  Clock16Regular,
  Eye16Filled,
  Flag16Filled,
  Warning16Filled,
} from '@fluentui/react-icons';

import { getDecorationIcon } from '../utils/getDecorationIcon';
import { useChatMessageFocusableGroup } from '../utils/useChatMessageFocusableGroup';
import { useChatMessagePopoverTrigger } from '../utils/useChatMessagePopoverTrigger';

export const useChatMyMessageLegacy_unstable = (
  props: ChatMyMessageLegacyProps,
  ref: React.Ref<HTMLDivElement>,
): ChatMyMessageLegacyState => {
  const {
    actions,
    attached,
    author,
    body,
    decoration,
    decorationIcon,
    decorationLabel,
    details,
    reactions,
    root,
    showAnimation,
    status,
    statusIcon,
    statusMessage,
    timestamp,
  } = props;

  /**
   * Splits the native props into ones that go to the `root` slot, and ones that go to the primary slot.
   * The primary slot is the `body` slot in this case.
   */
  const nativeProps = getPartitionedNativeProps<
    ChatMyMessageLegacyProps & Pick<React.HTMLAttributes<HTMLElement>, 'style' | 'className' | 'tabIndex'>,
    'tabIndex'
  >({
    primarySlotTagName: 'div',
    props,
    excludedPropNames: ['tabIndex'], // tabIndex from props will not be applied to the primary slot, as it should always be 0 for tabster navigation
  });

  const state: ChatMyMessageLegacyState = {
    attached,
    decoration,
    showAnimation,
    status,

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

    actions: resolveShorthand(actions),
    author: resolveShorthand(author),
    decorationIcon: resolveShorthand(decorationIcon, {
      required: !!decoration,
    }),
    decorationLabel: resolveShorthand(decorationLabel),
    details: resolveShorthand(details),
    reactions: resolveShorthand(reactions),
    statusIcon: resolveShorthand(statusIcon, { required: !!status }),
    statusMessage: resolveShorthand(statusMessage),
    timestamp: resolveShorthand(timestamp),

    components: {
      actions: 'div',
      author: 'div',
      body: 'div',
      decorationIcon: 'div',
      decorationLabel: 'div',
      details: 'div',
      reactions: 'div',
      root: 'div',
      statusIcon: 'div',
      statusMessage: 'div',
      timestamp: 'span',
    },
  };

  updateStatusWithIcon(state);

  if (state.decorationIcon && !state.decorationIcon.children) {
    state.decorationIcon.children = getDecorationIcon(decoration);
  }

  useChatMessagePopoverTrigger(state);
  useChatMessageFocusableGroup(state);

  return state;
};

const updateStatusWithIcon = (state: ChatMyMessageLegacyState) => {
  if (state.statusIcon && !state.statusIcon.children) {
    switch (state.status) {
      case 'sending':
        state.statusIcon.children = <Circle16Regular />;
        break;
      case 'received':
        state.statusIcon.children = <CheckmarkCircle16Regular />;
        break;
      case 'read':
        state.statusIcon.children = <Eye16Filled />;
        break;
      case 'failed':
        state.statusIcon.children = <Warning16Filled />;
        break;
      case 'blocked':
        state.statusIcon.children = <Flag16Filled />;
        break;
      case 'scheduled':
        state.statusIcon.children = <Clock16Regular />;
        break;
    }
  }
};
