// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { ActionableStyles as styles, ActionableTokens as tokens } from './Actionable.styles';
import { IActionableProps } from './Actionable.types';
import { useActionableState as state } from './Actionable.state';
import { ActionableSlots as slots, ActionableView as view } from './Actionable.view';

export const Actionable: React.StatelessComponent<IActionableProps> = composed({
  displayName: 'Actionable',
  slots,
  state,
  styles,
  tokens,
  view
});

export default Actionable;
