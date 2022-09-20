import { Persona } from '@fluentui/react-persona';

import descriptionMd from './PersonaDescription.md';

export { Default } from './PersonaDefault.stories';
export { Position } from './PersonaPosition.stories';
export { SizingScaled } from './PersonaSizingScaled.stories';
export { PresenceSize } from './PersonaPresenceSize.stories';
export { AvatarSize } from './PersonaAvatarSize.stories';

export default {
  title: 'Preview Components/Persona',
  component: Persona,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
