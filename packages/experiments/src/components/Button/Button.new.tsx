import { ButtonState as state } from './Button.state';
import { ButtonView as view } from './Button.view';
import { ButtonTokens, ButtonStyles } from './Button.styles.new';
import { createComponentNew } from '../../utilities/createComponent.new';

export const Button = createComponentNew({
  state,
  view,
  displayName: 'Button',
  tokens: ButtonTokens, // defaultProps[slots].
  styles: ButtonStyles  // defaultProps[slot].styles
});

export default Button;
