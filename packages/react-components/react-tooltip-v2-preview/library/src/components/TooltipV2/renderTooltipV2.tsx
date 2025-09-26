/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TooltipV2State, TooltipV2Slots } from './TooltipV2.types';

/**
 * Render the final JSX of TooltipV2
 */
export const renderTooltipV2_unstable = (state: TooltipV2State): JSXElement => {
  assertSlots<TooltipV2Slots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
