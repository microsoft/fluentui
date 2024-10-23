import * as React from 'react';

import { Badge } from '@fluentui/react-components';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

export const Icon = () => {
  return <Badge size="medium" icon={<PasteIcon />} />;
};

Icon.parameters = {
  docs: {
    description: {
      story:
        "A badge can display an icon. If the icon is meaningful, then either the icon must have a label or the parent control's label must include the information conveyed by the icon.",
    },
  },
};
