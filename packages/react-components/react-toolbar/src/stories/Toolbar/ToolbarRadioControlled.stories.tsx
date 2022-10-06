import * as React from 'react';
import { ToolbarRadio } from '../../ToolbarRadio';
import { ToolbarRadioGroup, ToolbarRadioGroupProps } from '../../ToolbarRadioGroup';

export const ControlledRadio = (props: Partial<ToolbarRadioGroupProps>) => {
  const [value, setValue] = React.useState('banana');

  return (
    <ToolbarRadioGroup value={value} onChange={(_, data) => setValue(data.value)} {...props}>
      <ToolbarRadio value="apple" label="Apple" />
      <ToolbarRadio value="pear" label="Pear" />
      <ToolbarRadio value="banana" label="Banana" />
      <ToolbarRadio value="orange" label="Orange" />
    </ToolbarRadioGroup>
  );
};
