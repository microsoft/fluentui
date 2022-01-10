import * as React from 'react';

import { Badge } from '../index';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

export const Icon = () => {
  return <Badge size="medium" icon={<PasteIcon fontSize={20} />} />;
};

Icon.parameters = {
  docs: {
    description: {
      story: 'A badge can display an icon.',
    },
  },
};
