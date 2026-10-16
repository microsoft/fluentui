import { getBrowserSupportNotice } from '../../shared/browserSupportNotice';

import descriptionMd from './TopLayerDescription.md';

export { Default } from './TopLayerDefault.stories';
export { Dialog } from './TopLayerDialog.stories';
export { Hint } from './TopLayerHint.stories';

export default {
  title: 'Concepts/Top Layer',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('TopLayer')].join('\n'),
      },
    },
  },
};
