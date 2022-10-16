import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider, ToolbarToggleButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Subtle = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarDivider />
    <ToolbarToggleButton name="toggle" value="toggle" appearance="subtle">
      Click me to Toggle
    </ToolbarToggleButton>
  </Toolbar>
);
