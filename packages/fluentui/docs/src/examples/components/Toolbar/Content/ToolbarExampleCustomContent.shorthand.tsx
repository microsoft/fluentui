import * as React from 'react';
import { Button, Text, Toolbar, SplitButton } from '@fluentui/react-northstar';
import { BoldIcon } from '@fluentui/react-icons-northstar';

const ToolbarSplitButton = () => (
  <>
    <SplitButton
      menu={[
        {
          key: 'group',
          content: 'New group message',
        },
        {
          key: 'channel',
          content: 'New channel message',
        },
      ]}
      button={{
        content: 'New conversation',
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message',
      }}
      toggleButton={{
        'aria-label': 'more options',
      }}
      onMainButtonClick={() => alert('button was clicked')}
    />
    <span
      aria-hidden="true"
      id="instruction-message"
      style={{
        opacity: 0,
      }}
    >
      to open menu, press Alt + Arrow Down
    </span>
  </>
);

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
        key: 'custom-focusable-text',
        content: <Text content="Focusable" />,
        focusable: true,
        kind: 'custom',
        role: 'button',
      },
      {
        key: 'custom-button',
        kind: 'custom',
        content: <Button content="Button" />,
        fitted: 'horizontally',
      },
      {
        key: 'custom-split-button',
        kind: 'custom',
        content: <ToolbarSplitButton />,
        fitted: 'horizontally',
      },
    ]}
  />
);

export default ToolbarExampleCustomContentShorthand;
