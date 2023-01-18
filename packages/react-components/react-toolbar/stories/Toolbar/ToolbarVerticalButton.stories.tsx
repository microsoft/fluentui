import * as React from 'react';
import { FontIncreaseRegular, FontDecreaseRegular, TextFontRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const VerticalButton = (props: Partial<ToolbarProps>) => (
  <Toolbar aria-label="Vertical Button" {...props}>
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
