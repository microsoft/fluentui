import { ToggleView } from './Toggle.view';
import { ToggleStyles as styles, ToggleTokens as tokens } from './Toggle.styles';
import { useToggleState as state } from './Toggle.state';
import { IToggleProps } from './Toggle.types';
import { createComponent } from '../../Foundation';

export const Toggle: React.StatelessComponent<IToggleProps> = createComponent(ToggleView, {
  displayName: 'Toggle',
  state,
  styles,
  tokens
});
