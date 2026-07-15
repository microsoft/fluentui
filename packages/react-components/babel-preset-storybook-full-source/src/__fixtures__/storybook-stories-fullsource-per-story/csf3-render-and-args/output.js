import * as React from 'react';
import { Button } from '@fluentui/react-button';
const meta = {
  title: 'Button',
  component: Button,
  args: {
    appearance: 'primary',
  },
};
export default meta;
export const Default = {
  render: () => /*#__PURE__*/ React.createElement(Button, null, 'Default'),
};
export const WithArgs = {
  args: {
    appearance: 'outline',
  },
  render: args => /*#__PURE__*/ React.createElement(Button, args, 'With args'),
};
export const ArgsOnly = {
  args: {
    children: 'Args only',
  },
  play: async () => {
    /* interaction test - must not leak into fullSource */
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered purely from args.',
      },
    },
  },
};
Default.parameters = {};
Default.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\nexport const Default = () => <Button>Default</Button>;\n';
WithArgs.parameters = {};
WithArgs.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\nexport const WithArgs = () => {\n  const args = {\n    appearance: "outline",\n  };\n  return <Button {...args}>With args</Button>;\n};\n';
ArgsOnly.parameters = {};
ArgsOnly.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\nexport const ArgsOnly = () => {\n  const args = {\n    appearance: "primary",\n    children: "Args only",\n  };\n  return <Button {...args} />;\n};\n';
