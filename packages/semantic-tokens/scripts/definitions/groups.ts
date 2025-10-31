import { fluentButtonGroup } from '../extensions/components/button';
import { focusGroup } from './application/focus';
import { buttonGroup } from './components/button';
import { Groups } from './groups.types';

export const groups: Groups = {
  // Application
  focus: focusGroup,
  // Components
  button: buttonGroup,
};

export const fluentExtensionGroups: Groups = {
  // Components
  button: fluentButtonGroup,
};
