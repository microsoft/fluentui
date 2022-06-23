import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider, ToolbarToggleButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const Default = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarDivider />
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarToggleButton>Click me to Toggle</ToolbarToggleButton>
    <ToolbarDivider />
  </Toolbar>
);
