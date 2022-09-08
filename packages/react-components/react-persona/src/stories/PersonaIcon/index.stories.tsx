import { PersonaIcon } from '@fluentui/react-persona';

import descriptionMd from './PersonaIconDescription.md';
import bestPracticesMd from './PersonaIconBestPractices.md';

export { Default } from './PersonaIconDefault.stories';

export default {
  title: 'Preview Components/PersonaIcon',
  component: PersonaIcon,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
