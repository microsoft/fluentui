import { PersonaPresenceBadge } from '@fluentui/react-persona';

import descriptionMd from './PersonaPresenceBadgeDescription.md';
import bestPracticesMd from './PersonaPresenceBadgeBestPractices.md';

export { Default } from './PersonaPresenceBadgeDefault.stories';

export default {
  title: 'Preview Components/PersonaPresenceBadge',
  component: PersonaPresenceBadge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
