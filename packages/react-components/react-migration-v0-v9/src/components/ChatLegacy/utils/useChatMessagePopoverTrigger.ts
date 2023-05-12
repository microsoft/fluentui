import * as React from 'react';

import { usePopoverContext_unstable } from '@fluentui/react-components';
import { mergeCallbacks, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { ChatMessageLegacyState } from '../ChatMessageLegacy/ChatMessageLegacy.types';
import { ChatMyMessageLegacyState } from '../ChatMyMessageLegacy/ChatMyMessageLegacy.types';

export const useChatMessagePopoverTrigger = (
  state: Pick<ChatMessageLegacyState | ChatMyMessageLegacyState, 'body'>,
) => {
  // V9 PopoverTrigger uses useARIAButtonProps and triggers click event on space key.
  // We don't want this behavior because it means we can't type with space key in the `input` within chat message.
  // If we don't do custom trigger, we'd have to stop keydown/keyup propagation for space key within chat message children.
  // Also v9 PopoverTrigger toggles popover on click, but we want to disable this behavior. Therefore customize trigger is a good option.
  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(e, true);
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(e, false);
  };

  state.body.onMouseEnter = useEventCallback(mergeCallbacks(state.body.onMouseEnter, onMouseEnter));

  state.body.onMouseLeave = useEventCallback(mergeCallbacks(state.body.onMouseLeave, onMouseLeave));

  state.body.ref = useMergedRefs(state.body.ref, triggerRef as React.MutableRefObject<HTMLDivElement | null>);
};
