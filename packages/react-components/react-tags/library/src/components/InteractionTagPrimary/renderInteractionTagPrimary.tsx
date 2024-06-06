/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  InteractionTagPrimaryState,
  InteractionTagPrimarySlots,
  InteractionTagPrimaryContextValues,
} from './InteractionTagPrimary.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of InteractionTagPrimary
 */
export const renderInteractionTagPrimary_unstable = (
  state: InteractionTagPrimaryState,
  contextValues: InteractionTagPrimaryContextValues,
) => {
  assertSlots<InteractionTagPrimarySlots>(state);

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
    </state.root>
  );
};
