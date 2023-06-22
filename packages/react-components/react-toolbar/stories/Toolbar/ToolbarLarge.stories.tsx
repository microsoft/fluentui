import * as React from 'react';
import { FontIncrease24Regular, FontDecrease24Regular, TextFont24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Large = (props: Partial<ToolbarProps>) => (
  <Toolbar
    aria-label="Large Toolbar"
    {...props}
    size="large"
    style={{
      border: '2px solid black',
      borderRadius: '8px',
    }}
  >
    <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
    <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
    <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
  </Toolbar>
);

Large.parameters = {
  docs: {
    description: {
      story: [
        'The size determines the spacing around the toolbar controls.',
        'A large sized toolbar uses 4px for vertical padding and 20px for horizontal padding.',
      ].join('\n'),
    },
  },
};
