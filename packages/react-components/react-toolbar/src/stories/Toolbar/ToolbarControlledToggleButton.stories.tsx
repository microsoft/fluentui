import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular } from '@fluentui/react-icons';
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
      <ToolbarToggleButton icon={<TextBold24Regular />} name="edit" value="cut" />
      <ToolbarToggleButton icon={<TextItalic24Regular />} name="edit" value="paste" />
    </Toolbar>
  );
};
