import * as React from 'react';
import { Button } from '@fluentui/react-button';

const meta = {
  title: 'Button',
  component: Button,
};

export default meta;

// Genuine story — should get a sliced fullSource.
export const Default = {
  render: () => <Button>Default</Button>,
};

// Capitalized data export (not a story) — must NOT be turned into a fake story.
export const BrandColors = {
  primary: '#0f6cbd',
  danger: '#c50f1f',
};
