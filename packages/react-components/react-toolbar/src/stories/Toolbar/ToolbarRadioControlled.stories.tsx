import * as React from 'react';
import { AlignCenterHorizontal24Regular, AlignLeft24Regular, AlignRight24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

export const ControlledRadio = (props: Partial<ToolbarProps>) => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    edit: ['italic', 'center'],
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
        textOptions: ['center'],
      }}
    >
      <ToolbarRadioButton aria-label="Align left" name="textStyle" value="left" icon={<AlignLeft24Regular />} />
      <ToolbarRadioButton
        aria-label="Align Center"
        name="textStyle"
        value="center"
        icon={<AlignCenterHorizontal24Regular />}
      />
      <ToolbarRadioButton aria-label="Align Right" name="textStyle" value="right" icon={<AlignRight24Regular />} />
    </Toolbar>
  );
};
