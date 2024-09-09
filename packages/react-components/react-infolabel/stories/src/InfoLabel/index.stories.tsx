import { InfoLabel } from '@fluentui/react-components';

import descriptionMd from './InfoLabelDescription.md';
import bestPracticesMd from './InfoLabelBestPractices.md';
import patternDecision from './InfoLabelPatternDecision.md';

export { Default } from './InfoLabelDefault.stories';
export { Required } from './InfoLabelRequired.stories';
export { Size } from './InfoLabelSize.stories';
export { InField } from './InfoLabelInField.stories';

export default {
  title: 'Components/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, patternDecision, bestPracticesMd].join('\n'),
      },
    },
  },
};
