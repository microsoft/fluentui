import * as React from 'react';
import { Switch } from '../index';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Disabled = () => (
  <div style={wrapperStyle}>
    <Switch disabled label="Unchecked and disabled" />
    <Switch checked disabled label="Checked and disabled" />
  </div>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'A Switch can be disabled.',
    },
  },
};
