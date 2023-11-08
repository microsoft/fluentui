/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagState, TagSlots, TagContextValues } from './Tag.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState, contextValues: TagContextValues) => {
  assertSlots<TagSlots>(state);

  return (
    <state.root>
      {state.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <state.media />
        </AvatarContextProvider>
      )}

      {state.icon && <state.icon />}
      {state.primaryText && <state.primaryText />}
      {state.secondaryText && <state.secondaryText />}
      {state.dismissIcon && state.dismissible && <state.dismissIcon />}
    </state.root>
  );
};
