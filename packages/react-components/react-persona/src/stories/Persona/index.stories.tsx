import { Persona } from '@fluentui/react-persona';

import descriptionMd from './PersonaDescription.md';
import bestPracticesMd from './PersonaBestPractices.md';

export { Default } from './PersonaDefault.stories';

export default {
  title: 'Preview Components/Persona',
  component: Persona,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
