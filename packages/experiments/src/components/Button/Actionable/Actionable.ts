import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { ActionableStyles as styles, ActionableTokens as tokens } from './Actionable.styles';
import { IActionableProps } from './Actionable.types';
import { useActionableState as state } from './Actionable.state';
import { ActionableSlots as slots, ActionableView as view } from './Actionable.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const Actionable: React.FunctionComponent<IActionableProps> = composed({
  displayName: 'Actionable',
  slots,
  state,
  styles,
  tokens,
  view,
});

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export default Actionable;
