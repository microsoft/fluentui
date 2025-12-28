/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
import { PresenceGroup } from '@fluentui/react-motion';
import { MessageBarMotion } from './MessageBarGroup.motions';
import { MotionRefForwarder } from '../MotionRefForwarder';

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState): JSXElement => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <PresenceGroup>
        {state.children.map(child => (
          <MessageBarMotion key={child.key} animate={state.animate} unmountOnExit>
            <MotionRefForwarder>{child}</MotionRefForwarder>
          </MessageBarMotion>
        ))}
      </PresenceGroup>
    </state.root>
  );
};
