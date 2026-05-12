import { Avatar } from '@fluentui/react-headless-components-preview/avatar';
import { Persona } from '@fluentui/react-headless-components-preview/persona';

import descriptionMd from './PersonaDescription.md';

export { Default } from './PersonaDefault.stories';

export default {
  title: 'Headless Components/Persona',
  component: Persona,
  subcomponent: { Avatar },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
