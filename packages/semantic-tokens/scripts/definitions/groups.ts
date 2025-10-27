import { focusGroup } from './application/focus';
import { buttonGroup } from './components/button';
import { linkGroup } from './components/link';
import { Groups } from './groups.types';

export const groups: Groups = {
  // Application
  focus: focusGroup,
  // Components
  button: buttonGroup,
  link: linkGroup,
};
