import * as React from 'react';
import { Button } from '@fluentui/react-button';
const meta = {
  title: 'Button',
  component: Button,
};
export default meta;
export const Base = {
  render: () =>
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'primary',
      },
      'Base',
    ),
};
export const Derived = {
  ...Base,
  parameters: {
    docs: {
      description: {
        story: 'Spreads Base.',
      },
    },
  },
};
Base.parameters = {};
Base.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\nexport const Base = () => <Button appearance="primary">Base</Button>;\n';
Derived.parameters = {};
Derived.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\nexport const Derived = () => <Button appearance="primary">Base</Button>;\n';
