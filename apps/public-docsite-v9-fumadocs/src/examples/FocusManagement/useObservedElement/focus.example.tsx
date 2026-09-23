import { createGuideExample } from '../../../components/GuideExample';
import description from './useObservedElementDescription.md';
import { Default } from './Default.example';
import { MultipleNames } from './MultipleNames.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Observed element') },
  { name: 'MultipleNames', Preview: createGuideExample(MultipleNames, 'Multiple names') },
];
