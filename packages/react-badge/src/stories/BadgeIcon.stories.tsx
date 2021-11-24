import * as React from 'react';

import { Badge } from '../index';
import { ClipboardPaste20Regular as PasteIcon } from '@fluentui/react-icons';

export const Icon = () => {
  return <Badge size="medium" icon={<PasteIcon />} />;
};

Icon.parameters = {
  docs: {
    description: {
      story: 'A badge can display an icon.',
    },
  },
};
