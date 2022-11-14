import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const ControlledRadio = (props: Partial<ToolbarProps>) => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    edit: ['italic', 'bold'],
  });

  const onChange: ToolbarProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar
      checkedValues={checkedValues}
      onCheckedValueChange={onChange}
      defaultCheckedValues={{
        textOptions: ['bold'],
      }}
    >
      <ToolbarRadioButton aria-label="Align left" name="textStyle" value="italic" icon={<AlignLeft24Regular />} />
      <ToolbarRadioButton
        aria-label="Align Center"
        name="textStyle"
        value="bold"
        icon={<AlignCenterHorizontal24Regular />}
      />
      <ToolbarRadioButton aria-label="Align Right" name="textStyle" value="underline" icon={<AlignRight24Regular />} />
    </Toolbar>
  );
};
