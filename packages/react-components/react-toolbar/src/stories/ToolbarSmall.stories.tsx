import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { ToolbarToggleButton } from '../ToolbarToggleButton';
import { ToolbarRadioGroup } from '../ToolbarRadioGroup';
import { ToolbarRadio } from '../ToolbarRadio';

export const Small = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarDivider />
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarToggleButton>Click me to Toggle</ToolbarToggleButton>
    <ToolbarDivider />
    <ToolbarRadioGroup>
      <ToolbarRadio value="apple" label="Apple" />
      <ToolbarRadio value="pear" label="Pear" />
      <ToolbarRadio value="banana" label="Banana" />
      <ToolbarRadio value="orange" label="Orange" />
    </ToolbarRadioGroup>
  </Toolbar>
);
