import { FocusTrap } from './utils.stories';

import descriptionMd from './FocusTrapDescription.md';

export { Default } from './FocusTrapDefault.stories';
export { AutoFocus } from './FocusTrapAutoFocus.stories';

export default {
  title: 'Headless Concepts/FocusTrap',
  component: FocusTrap,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
