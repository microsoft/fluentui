import * as React from 'react';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-toolbar';
import type { MenuProps } from '@fluentui/react-components';

export const ControlledToggleButton = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ edit: ['cut', 'paste'] });
  const onChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <ToolbarToggleButton name="group">Enable Group</ToolbarToggleButton>
      <ToolbarToggleButton name="group">Enable Group</ToolbarToggleButton>
    </Toolbar>
  );
};
