import * as React from 'react';

import { Checkbox } from '@fluentui/react-modern-components-preview/checkbox';

export const Circular = (): React.ReactNode => <Checkbox shape="circular" label="Circular" />;
Circular.parameters = {
  docs: {
    description: {
      story:
        'A checkbox can have a circular shape.<br />' +
        '**Usage warning**: Unless you are designing a tasks experience, we strongly discourage using this styling ' +
        'variant, as it can be confused with `RadioItem`.',
    },
  },
};
