import { CompoundButton } from '@fluentui/react-headless-components-preview/compound-button';

import './compound-button.module.css';
import descriptionMd from './CompoundButtonDescription.md';
export { Default } from './CompoundButtonDefault.stories';

export default {
  title: 'Components/CompoundButton',
  component: CompoundButton,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
