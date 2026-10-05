import * as React from 'react';
import { Button } from '@fluentui/react-button';
const meta = {
  title: 'Button',
  component: Button,
};
export default meta;

// Genuine story — should get a sliced fullSource.
export const Default = {
  render: () => /*#__PURE__*/ React.createElement(Button, null, 'Default'),
};

// Capitalized data export (not a story) — must NOT be turned into a fake story.
export const BrandColors = {
  primary: '#0f6cbd',
  danger: '#c50f1f',
};
Default.parameters = {};
Default.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\n// Genuine story \u2014 should get a sliced fullSource.\nexport const Default = () => <Button>Default</Button>;\n';
