import { ToggleView } from './Toggle.view';
import { ToggleStyles } from './Toggle.styles';
import { ToggleState } from './Toggle.state';
import { IToggleProps, IToggleViewProps, IToggleStyles } from './Toggle.types';
import { createComponent } from '../../Foundation';

export const Toggle: React.StatelessComponent<IToggleProps> = createComponent<IToggleProps, IToggleViewProps, IToggleStyles>({
  displayName: 'Toggle',
  view: ToggleView,
  state: ToggleState,
  styles: ToggleStyles
});
