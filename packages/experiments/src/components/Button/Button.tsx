import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from './Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonSlots as slots, ButtonView as view } from './Button.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const Button: React.FunctionComponent<IButtonProps> = composed({
  displayName: 'Button',
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
export default Button;
