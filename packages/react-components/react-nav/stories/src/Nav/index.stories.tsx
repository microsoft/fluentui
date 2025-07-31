import { Nav } from '@fluentui/react-components';

import descriptionMd from './NavDescription.md';
import accessibilityMd from './NavAccessibility.md';

export { Basic } from './Basic.stories';
export { VariableDensityItems } from './VariableDensityItems.stories';
export { Controlled } from './Controlled.stories';
export { SplitNavItems } from './SplitNavItems.stories';
export { CustomMotion } from './CustomMotion.stories';

export default {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, accessibilityMd].join('\n'),
      },
    },
  },
};
