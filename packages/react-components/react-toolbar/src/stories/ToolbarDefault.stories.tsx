import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { ToolbarToggleButton } from '../ToolbarToggleButton';

export const Default = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarDivider />
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarToggleButton>Click me to Toggle</ToolbarToggleButton>
  </Toolbar>
);
