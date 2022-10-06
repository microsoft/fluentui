import * as React from 'react';
import { ToolbarRadio } from '../../ToolbarRadio';
import { ToolbarRadioGroup, ToolbarRadioGroupProps } from '../../ToolbarRadioGroup';

export const Radio = (props: Partial<ToolbarRadioGroupProps>) => (
  <ToolbarRadioGroup {...props}>
    <ToolbarRadio value="apple" label="Apple" />
    <ToolbarRadio value="pear" label="Pear" />
    <ToolbarRadio value="banana" label="Banana" />
    <ToolbarRadio value="orange" label="Orange" />
  </ToolbarRadioGroup>
);
