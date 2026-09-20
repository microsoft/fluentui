import { InfoLabel } from '@fluentui/react-modern-components-preview/info-label';

import descriptionMd from './InfoLabelDescription.md';
import bestPracticesMd from './InfoLabelBestPractices.md';
import patternDecision from './InfoLabelPatternDecision.md';

export { Default } from './InfoLabelDefault.stories';
export { Required } from './InfoLabelRequired.stories';
export { Size } from './InfoLabelSize.stories';
export { InField } from './InfoLabelInField.stories';

export default {
  title: 'Components/InfoLabel/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, patternDecision, bestPracticesMd].join('\n'),
      },
    },
  },
};
