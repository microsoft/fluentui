import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';

export const Default = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarDivider />
  </Toolbar>
);
