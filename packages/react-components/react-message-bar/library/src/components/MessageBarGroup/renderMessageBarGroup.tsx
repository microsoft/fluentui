/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
import { PresenceGroup } from '@fluentui/react-motion';
import { SlideInFadeOut, FadeOut } from './MessageBarGroup.motions';

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState) => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <PresenceGroup>
        {state.children.map(child =>
          state.animate === 'both' ? (
            // enter with slide and fade; exit with fade
            <SlideInFadeOut key={child.key}>{child}</SlideInFadeOut>
          ) : (
            // no enter motion; exit with fade
            <FadeOut key={child.key}>{child}</FadeOut>
          ),
        )}
      </PresenceGroup>
    </state.root>
  );
};
