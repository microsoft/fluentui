import * as React from 'react';

import { Switch } from '@fluentui/react-modern-components-preview/switch';
import type { SwitchProps } from '@fluentui/react-modern-components-preview/switch';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Size = (props: SwitchProps): React.ReactNode => {
  return (
    <div style={wrapperStyle}>
      <Switch label="Small" size="small" {...props} />
      <Switch label="Medium" size="medium" {...props} />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A Switch can have different sizes.',
    },
  },
};
