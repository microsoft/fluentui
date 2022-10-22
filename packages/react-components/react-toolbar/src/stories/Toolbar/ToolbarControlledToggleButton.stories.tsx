import * as React from 'react';
import { Toolbar, ToolbarToggleButton, ToolbarProps } from '@fluentui/react-toolbar';

export const ControlledToggleButton = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ edit: ['cut', 'paste'] });
  const onChange: ToolbarProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <ToolbarToggleButton name="edit" value="cut">
        Enable Group
      </ToolbarToggleButton>
      <ToolbarToggleButton name="edit" value="paste">
        Enable Group
      </ToolbarToggleButton>
    </Toolbar>
  );
};
