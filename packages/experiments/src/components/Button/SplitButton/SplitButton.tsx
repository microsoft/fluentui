import * as React from 'react';
// Temporary import file to experiment with memoization approach.
import { compose } from '@uifabric/foundation/lib/next/compose';
import { useSplitButtonState as state } from './SplitButton.state';
import { SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonView as view } from './SplitButton.view';

export const SplitButton: React.StatelessComponent<ISplitButtonProps> = compose({
  displayName: 'SplitButton',
  state,
  styles,
  tokens,
  view
});

export default SplitButton;
