import * as React from 'react';
import { FontIncreaseRegular, FontDecreaseRegular, TextFontRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const VerticalButton = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton vertical appearance="primary" icon={<FontIncreaseRegular />}>
      Increase
    </ToolbarButton>
    <ToolbarButton vertical icon={<FontDecreaseRegular />}>
      Decrease
    </ToolbarButton>
    <ToolbarButton vertical icon={<TextFontRegular />}>
      Reset
    </ToolbarButton>
  </Toolbar>
);
