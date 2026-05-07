import type { DrawerContextValue } from '@fluentui/react-drawer';
import { renderOverlayDrawer_unstable } from '@fluentui/react-drawer';
import type { OverlayDrawerState } from './OverlayDrawer.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Renders the final JSX of the OverlayDrawer component, given the state.
 */
export const renderOverlayDrawer = renderOverlayDrawer_unstable as unknown as (
  state: OverlayDrawerState,
  contextValue: DrawerContextValue,
) => JSXElement;
