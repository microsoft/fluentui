import { Persona } from '@fluentui/react-modern-components-preview/persona';

import descriptionMd from './PersonaDescription.md';

export { Default } from './PersonaDefault.stories';
export { TextAlignment } from './PersonaTextAlignment.stories';
export { TextPosition } from './PersonaTextPosition.stories';
export { PresencePreviousBehavior } from './PersonaPresencePreviousBehavior.stories';
export { PresenceSize } from './PersonaPresenceSize.stories';
export { AvatarSize } from './PersonaAvatarSize.stories';

export default {
  title: 'Components/Persona/Persona',
  component: Persona,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
