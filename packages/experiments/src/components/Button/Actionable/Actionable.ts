import { createComponent } from '../../../Foundation';
import { ActionableStyles as styles, ActionableTokens as tokens } from './Actionable.styles';
import { IActionableProps } from './Actionable.types';
import { useButtonState as state } from '../Button.state';
import { ButtonView } from '../Button.view';

export const Actionable: React.StatelessComponent<IActionableProps> = createComponent(ButtonView, {
  displayName: 'Actionable',
  state,
  styles,
  tokens
});

export default Actionable;
