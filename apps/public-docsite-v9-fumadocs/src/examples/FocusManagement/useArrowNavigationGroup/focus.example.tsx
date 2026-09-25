import { createGuideExample } from '../../../components/GuideExample';
import description from './useArrowNavigationGroupDescription.md';
import { Default } from './Default.example';
import { Axis } from './Axis.example';
import { CircularNavigation } from './CircularNavigation.example';
import { CircularNavigationWithTab } from './CircularNavigationWithTab.example';
import { Memorize } from './Memorize.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Arrow navigation') },
  { name: 'Axis', Preview: createGuideExample(Axis, 'Navigation axis') },
  { name: 'CircularNavigation', Preview: createGuideExample(CircularNavigation, 'Circular navigation') },
  {
    name: 'CircularNavigationWithTab',
    Preview: createGuideExample(CircularNavigationWithTab, 'Circular navigation with Tab'),
  },
  { name: 'Memorize', Preview: createGuideExample(Memorize, 'Remember focused element') },
];
