import { InfoLabel } from '@fluentui/react-headless-components-preview/info-label';

import descriptionMd from './InfoLabelDescription.md';

import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

export { Default } from './InfoLabelDefault.stories';
export { Required } from './InfoLabelRequired.stories';
export { InField } from './InfoLabelInField.stories';

export default {
  title: 'Components/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('InfoLabel')].join('\n'),
      },
    },
  },
};
