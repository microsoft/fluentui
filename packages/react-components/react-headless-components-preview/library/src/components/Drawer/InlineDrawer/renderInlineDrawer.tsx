import type { JSXElement } from '@fluentui/react-utilities';
import type { InlineDrawerState as InlineDrawerBaseState } from '@fluentui/react-drawer';
import { renderInlineDrawer_unstable } from '@fluentui/react-drawer';
import type { DrawerContextValue } from '@fluentui/react-drawer';

import type { InlineDrawerState } from './InlineDrawer.types';

/**
 * Renders the final JSX of the InlineDrawer component, given the state.
 */
export const renderInlineDrawer = (state: InlineDrawerState, contextValue: DrawerContextValue): JSXElement | null => {
  if (state.unmountOnClose && !state.open) {
    return null;
  }

  // Reuse the render function from react-drawer since the structure is the same,
  // just with fewer slots - the surfaceMotion slot is not present in the headless version.
  return renderInlineDrawer_unstable(state as InlineDrawerBaseState, contextValue);
};
