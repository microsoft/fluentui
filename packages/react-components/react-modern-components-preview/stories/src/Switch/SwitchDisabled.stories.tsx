import * as React from 'react';

import { Switch } from '@fluentui/react-modern-components-preview/switch';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Disabled = (): React.ReactNode => (
  <div style={wrapperStyle}>
    <Switch disabled label="Unchecked and disabled" />
    <Switch checked disabled label="Checked and disabled" />
    <Switch disabledFocusable label="Unchecked and disabled focusable" />
    <Switch checked disabledFocusable label="Checked and disabled focusable" />
  </div>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'A Switch can be disabled.',
    },
  },
};
