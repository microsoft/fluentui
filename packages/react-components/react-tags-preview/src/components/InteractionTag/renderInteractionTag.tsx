/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { InteractionTagState, InteractionTagSlots, InteractionTagContextValues } from './InteractionTag.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of InteractionTag
 */
export const renderInteractionTag_unstable = (
  state: InteractionTagState,
  contextValues: InteractionTagContextValues,
) => {
  assertSlots<InteractionTagSlots>(state);

  return (
    <state.root>
      {state.content && (
        <state.content>
          {state.media && (
            <AvatarContextProvider value={contextValues.avatar}>
              <state.media />
            </AvatarContextProvider>
          )}

          {state.icon && <state.icon />}
          {state.primaryText && <state.primaryText>{state.root.children}</state.primaryText>}

          {state.secondaryText && <state.secondaryText />}
        </state.content>
      )}

      {state.dismissButton && state.dismissible && <state.dismissButton />}
    </state.root>
  );
};
