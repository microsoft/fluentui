import { createComponent } from '../../../Foundation';
import { ActionableClassNames, ActionableStyles as styles, ActionableTokens as tokens } from './Actionable.styles';
import { IActionableProps } from './Actionable.types';
import { useButtonState as state } from '../Button.state';
import { ActionableView } from './Actionable.view';

const classNames = Object.values(ActionableClassNames);

export const Actionable: React.StatelessComponent<IActionableProps> = createComponent(ActionableView, {
  classNames,
  displayName: 'Actionable',
  precedenceList: ['checked', 'disabled'],
  state,
  styles,
  tokens
});

export default Actionable;
