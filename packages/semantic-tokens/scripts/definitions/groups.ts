import { focusGroup } from './application/focus';
import { buttonGroup } from './components/button';
import { inputGroup } from './components/input';
import { fluentButtonGroup } from './extensions/button';
import { fluentInputGroup } from './extensions/input';
import { Groups } from './groups.types';

export const groups: Groups = {
  // Application
  focus: focusGroup,
  // Components
  button: buttonGroup,
  input: inputGroup,
};

export const extensionGroups: Groups = {
  // Components
  button: fluentButtonGroup,
  input: fluentInputGroup,
};
