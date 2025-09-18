/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState): JSXElement => {
  assertSlots<MenuPopoverSlots>(state);

  return (
    <>
      <state.root />
      {state.safeZone}
    </>
  );
};
