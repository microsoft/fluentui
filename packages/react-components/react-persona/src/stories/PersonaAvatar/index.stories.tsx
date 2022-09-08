import { PersonaAvatar } from '@fluentui/react-persona';

import descriptionMd from './PersonaAvatarDescription.md';
import bestPracticesMd from './PersonaAvatarBestPractices.md';

export { Default } from './PersonaAvatarDefault.stories';

export default {
  title: 'Preview Components/PersonaAvatar',
  component: PersonaAvatar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
