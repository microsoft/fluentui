/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

import type { SplitNavItemState, SplitNavItemSlots } from './SplitNavItem.types';

/**
 * @internal
 *
 * Helper function to get button slots
 */
const renderButtonSlot = (Slot?: React.ElementType, SlotTooltip?: React.ElementType) => {
  if (!Slot) {
    return null;
  }

  if (SlotTooltip) {
    return (
      <SlotTooltip>
        <Slot />
      </SlotTooltip>
    );
  }

  return <Slot />;
};

/**
 * Render the final JSX of SplitNavItem
 */
export const renderSplitNavItem_unstable = (state: SplitNavItemState) => {
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
