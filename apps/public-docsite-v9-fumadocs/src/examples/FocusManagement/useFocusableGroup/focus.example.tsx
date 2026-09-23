import { createGuideExample } from '../../../components/GuideExample';
import description from './useFocusableGroupDescription.md';
import { Default } from './Default.example';
import { Limited } from './Limited.example';
import { LimitedTrapFocus } from './LimitedTrapFocus.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Focusable group') },
  { name: 'Limited', Preview: createGuideExample(Limited, 'Limited navigation') },
  { name: 'LimitedTrapFocus', Preview: createGuideExample(LimitedTrapFocus, 'Limited focus trap') },
];
