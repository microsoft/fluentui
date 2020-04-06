import * as React from 'react';
import { Button, Text, Toolbar } from '@fluentui/react-northstar';
import { BoldIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleCustomContentShorthand = () => (
  <Toolbar
    aria-label="Toolbar can contain custom content"
    items={[
      {
        icon: <BoldIcon />,
        key: 'bold',
        title: 'Bold',
      },
      {
        key: 'custom-text',
        content: <Text content="Text" />,
        kind: 'custom',
      },
      {
        key: 'custom-focusable-text',
        content: <Text content="Focusable" />,
        focusable: true,
        kind: 'custom',
      },
      {
        key: 'custom-button',
        kind: 'custom',
        content: <Button content="Button" />,
        fitted: 'horizontally',
      },
    ]}
  />
);

export default ToolbarExampleCustomContentShorthand;
