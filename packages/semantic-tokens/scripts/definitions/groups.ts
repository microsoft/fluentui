import { focusGroup } from './application/focus';
import { buttonGroup } from './components/button';
import { Groups } from './groups.types';

export const groups: Groups = {
  // Application
  focus: focusGroup,
  // Components
  button: buttonGroup,
};
