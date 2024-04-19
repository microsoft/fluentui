/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState) => {
  assertSlots<MenuPopoverSlots>(state);

  if (state.inline) {
    return <state.root />;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <state.root />
    </Portal>
  );
};
