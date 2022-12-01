import * as React from 'react';
import { FontIncrease24Regular, FontDecrease24Regular, TextFont24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const VerticalButton = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton vertical appearance="primary" icon={<FontIncrease24Regular />}>
      Increase
    </ToolbarButton>
    <ToolbarButton vertical icon={<FontDecrease24Regular />}>
      Decrease
    </ToolbarButton>
    <ToolbarButton vertical icon={<TextFont24Regular />}>
      Reset
    </ToolbarButton>
  </Toolbar>
);
