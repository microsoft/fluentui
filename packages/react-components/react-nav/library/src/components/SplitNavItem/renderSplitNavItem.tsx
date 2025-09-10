/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { SplitNavItemState, SplitNavItemSlots } from './SplitNavItem.types';

/**
 * @internal
 *
 * Helper function to render button slots
 */
const renderButtonSlot = (Button?: React.ElementType, ButtonTooltip?: React.ElementType) => {
  if (!Button) {
    return null;
  }

  if (ButtonTooltip) {
    return (
      <ButtonTooltip>
        <Button />
      </ButtonTooltip>
    );
  }

  return <Button />;
};

/**
 * Render the final JSX of SplitNavItem
 */
export const renderSplitNavItem_unstable = (state: SplitNavItemState): JSXElement => {
  assertSlots<SplitNavItemSlots>(state);

  return (
    <state.root>
      {state.navItem && <state.navItem />}
      {renderButtonSlot(state.actionButton, state.actionButtonTooltip)}
      {renderButtonSlot(state.menuButton, state.menuButtonTooltip)}
      {renderButtonSlot(state.toggleButton, state.toggleButtonTooltip)}
    </state.root>
  );
};
