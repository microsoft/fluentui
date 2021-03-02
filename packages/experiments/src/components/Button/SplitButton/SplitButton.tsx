import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useSplitButtonState as state } from './SplitButton.state';
import { SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonSlots as slots, SplitButtonView as view } from './SplitButton.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const SplitButton: React.FunctionComponent<ISplitButtonProps> = composed({
  displayName: 'SplitButton',
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
export default SplitButton;
