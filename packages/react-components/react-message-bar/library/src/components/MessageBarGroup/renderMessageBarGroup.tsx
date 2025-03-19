/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
import { PresenceGroup } from '@fluentui/react-motion';
import { MessageBarMotion } from './MessageBarGroup.motions';

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState) => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <PresenceGroup>
        {/* Skip wrapping with a motion component if .animate is not set */}
        {!state.animate
          ? state.children
          : state.children.map(child => (
              <MessageBarMotion key={child.key} animate={state.animate}>
                {child}
              </MessageBarMotion>
            ))}
      </PresenceGroup>
    </state.root>
  );
};
