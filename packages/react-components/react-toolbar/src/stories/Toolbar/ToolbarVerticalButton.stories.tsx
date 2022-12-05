import * as React from 'react';
import { FontIncreaseRegular, FontDecreaseRegular, TextFontRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const VerticalButton = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton vertical appearance="primary" icon={<FontIncreaseRegular fontSize={24} />}>
      Increase
    </ToolbarButton>
    <ToolbarButton vertical icon={<FontDecreaseRegular fontSize={24} />}>
      Decrease
    </ToolbarButton>
    <ToolbarButton vertical icon={<TextFontRegular fontSize={24} />}>
      Reset
    </ToolbarButton>
  </Toolbar>
);
