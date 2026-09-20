import * as React from 'react';

import { Badge } from '@fluentui/react-modern-components-preview/badge';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

export const Icon = (): React.ReactNode => {
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
