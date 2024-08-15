/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
import { TransitionGroup } from 'react-transition-group';
import { MessageBarTransition } from './MessageBarTransition';

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState) => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <TransitionGroup component={null}>
        {state.children.map(child => (
          <MessageBarTransition
            animate={state.animate}
            key={child.key}
            enterClassName={state.enterStyles}
            exitClassName={state.exitStyles}
          >
            {child}
          </MessageBarTransition>
        ))}
      </TransitionGroup>
    </state.root>
  );
};
