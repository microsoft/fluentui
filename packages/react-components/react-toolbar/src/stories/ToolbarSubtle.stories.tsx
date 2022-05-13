import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { ToolbarToggleButton } from '../ToolbarToggleButton';

export const Subtle = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props}>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarButton appearance="subtle">Click me</ToolbarButton>
    <ToolbarDivider />
    <ToolbarToggleButton appearance="subtle">Click me to Toggle</ToolbarToggleButton>
  </Toolbar>
);
