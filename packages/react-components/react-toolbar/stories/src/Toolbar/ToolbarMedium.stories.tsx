import * as React from 'react';
import { FontIncrease24Regular, FontDecrease24Regular, TextFont24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Medium = (props: Partial<ToolbarProps>) => (
  <Toolbar
    {...props}
    aria-label="Medium"
    size="medium"
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

Medium.parameters = {
  docs: {
    description: {
      story: [
        'The size determines the spacing around the toolbar controls.',
        'A medium sized toolbar uses 4px for vertical padding and 8px for horizontal padding.',
      ].join('\n'),
    },
  },
};
