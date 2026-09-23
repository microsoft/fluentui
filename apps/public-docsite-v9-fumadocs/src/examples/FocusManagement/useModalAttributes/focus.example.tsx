import { createGuideExample } from '../../../components/GuideExample';
import description from './useModalAttributesDescription.md';
import { Default } from './Default.example';
import { InertFocusTrap } from './InertFocusTrap.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Modal attributes') },
  { name: 'InertFocusTrap', Preview: createGuideExample(InertFocusTrap, 'Inert focus trap') },
];
