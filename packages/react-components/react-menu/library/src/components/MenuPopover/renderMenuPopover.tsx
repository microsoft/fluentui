/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { PositioningSlide } from '@fluentui/react-positioning';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState): JSXElement => {
  assertSlots<MenuPopoverSlots>(state);

  const content = (
    <PositioningSlide distance="10px">
      <state.root />
    </PositioningSlide>
  );

  if (state.inline) {
    return (
      <>
        {content}
        {state.safeZone}
      </>
    );
  }

  return (
    <Portal mountNode={state.mountNode}>
      {content}
      {state.safeZone}
    </Portal>
  );
};
