import { createComponent } from '../../../Foundation';
import { ActionableStyles as styles, ActionableTokens as tokens } from './Actionable.styles';
import { IActionableProps } from './Actionable.types';
import { useButtonState as state } from '../Button.state';
import { ActionableView } from './Actionable.view';

export const Actionable: React.StatelessComponent<IActionableProps> = createComponent(ActionableView, {
  displayName: 'Actionable',
  state,
  styles,
  tokens
});

export default Actionable;
