import * as React from 'react';
// Temporary import file to experiment with memoization approach.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useSplitButtonState as state } from './SplitButton.state';
import { SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonView as view } from './SplitButton.view';

export const SplitButton: React.StatelessComponent<ISplitButtonProps> = composed({
  displayName: 'SplitButton',
  state,
  styles,
  tokens,
  view
});

export default SplitButton;
