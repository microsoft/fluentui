'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMessageBar,
  useMessageBar,
  useMessageBarContextValues,
} from '@fluentui/react-headless-components-preview/message-bar';

import { getIntentIcon } from '../../utils/getIntentIcon';
import type { MessageBarProps, MessageBarState } from './MessageBar.types';
import { useMessageBarStyles } from './useMessageBarStyles';

/**
 * A MessageBar communicates a state that affects the whole surface. Windmod MessageBar: the
 * headless message bar decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MessageBar: ForwardRefComponent<MessageBarProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-message-bar's styled useMessageBar.
  ({ shape = 'rounded', ...rest }, ref) => {
    const base = useMessageBar(rest, ref);

    // The headless icon slot ships no glyph of its own, so an unrestored slot is an empty column
    // the grid still reserves. The glyph depends on the resolved intent, which only exists after
    // the hook runs. Consumer children always win; `icon={null}` still removes the slot.
    const icon: MessageBarState['icon'] = base.icon && {
      ...base.icon,
      children: base.icon.children ?? getIntentIcon(base.intent),
    };

    const styled = useMessageBarStyles({ ...base, icon, shape });

    // renderMessageBar reads the context off its second argument and throws without one.
    return renderMessageBar(styled, useMessageBarContextValues(styled));
  },
);

MessageBar.displayName = 'MessageBar';
