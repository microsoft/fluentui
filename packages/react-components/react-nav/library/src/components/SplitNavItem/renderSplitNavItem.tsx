/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

import type { SplitNavItemState, SplitNavItemSlots } from './SplitNavItem.types';

/**
 * @internal
 *
 * Helper function to get button slots
 */
const getButtonSlot = (slot: keyof SplitNavItemSlots, state: SplitNavItemState) => {
  assertSlots<SplitNavItemSlots>(state);

  const Button = state[slot];
  const tooltipSlotName = (slot + 'Tooltip') as keyof SplitNavItemSlots;
  const Tooltip = state[tooltipSlotName];

  if (!Button) {
    return null;
  }

  if (Tooltip) {
    return (
      <Tooltip>
        <Button />
      </Tooltip>
    );
  }

  return <Button />;
};

/**
 * Render the final JSX of SplitNavItem
 */
export const renderSplitNavItem_unstable = (state: SplitNavItemState) => {
  assertSlots<SplitNavItemSlots>(state);

  return (
    <state.root>
      {state.navItem && <state.navItem />}
      {getButtonSlot('actionButton', state)}
      {getButtonSlot('menuButton', state)}
      {getButtonSlot('toggleButton', state)}
    </state.root>
  );
};
