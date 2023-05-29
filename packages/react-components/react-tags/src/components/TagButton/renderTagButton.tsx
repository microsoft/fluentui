/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { TagButtonState, TagButtonSlots, TagButtonContextValues } from './TagButton.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of TagButton
 */
export const renderTagButton_unstable = (state: TagButtonState, contextValues: TagButtonContextValues) => {
  assertSlots<TagButtonSlots>(state);

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
