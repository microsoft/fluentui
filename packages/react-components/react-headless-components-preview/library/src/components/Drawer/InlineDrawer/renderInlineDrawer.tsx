import type { DrawerContextValue } from '@fluentui/react-drawer';
import { renderInlineDrawer_unstable } from '@fluentui/react-drawer';
import type { JSXElement } from '@fluentui/react-utilities';

import type { InlineDrawerState } from './InlineDrawer.types';

/**
 * Renders the final JSX of the InlineDrawer component, given the state.
 */
export const renderInlineDrawer = renderInlineDrawer_unstable as (
  state: InlineDrawerState,
  contextValue: DrawerContextValue,
) => JSXElement;
