import { createGuideExample } from '../../../components/GuideExample';
import description from './useRestoreFocusSourceDescription.md';
import { Default } from './Default.example';
import { FocusRestoreHistory } from './FocusRestoreHistory.example';
import { UserRestoreFocus } from './UserRestoreFocus.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Restore focus') },
  { name: 'FocusRestoreHistory', Preview: createGuideExample(FocusRestoreHistory, 'Focus restore history') },
  { name: 'UserRestoreFocus', Preview: createGuideExample(UserRestoreFocus, 'User-triggered focus restore') },
];
