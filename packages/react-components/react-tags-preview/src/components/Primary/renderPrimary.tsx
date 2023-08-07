/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { PrimaryState, PrimarySlots, PrimaryContextValues } from './Primary.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of Primary
 */
export const renderPrimary_unstable = (state: PrimaryState, contextValues: PrimaryContextValues) => {
  assertSlots<PrimarySlots>(state);

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
